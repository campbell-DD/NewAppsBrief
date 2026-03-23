import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataPath = path.join(rootDir, "data", "apps.json");

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function splitList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ensureUniqueSlug(baseSlug, apps) {
  if (!apps.some((app) => app.slug === baseSlug)) {
    return baseSlug;
  }

  let index = 2;
  while (apps.some((app) => app.slug === `${baseSlug}-${index}`)) {
    index += 1;
  }

  return `${baseSlug}-${index}`;
}

function withIndefiniteArticle(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) {
    return trimmed;
  }

  const article = /^[aeiou]/i.test(trimmed) ? "an" : "a";
  return `${article} ${trimmed}`;
}

function buildOverview(name, category, shortDescription, keywords) {
  const intent = keywords.length > 0 ? keywords.join(", ") : `${name}, ${category}`;
  return `${name} is ${withIndefiniteArticle(category.toLowerCase())} focused on ${shortDescription.replace(/\.$/, "").toLowerCase()}. It is relevant for searches such as ${intent}.`;
}

async function promptRequired(rl, label) {
  while (true) {
    const value = (await rl.question(`${label}: `)).trim();
    if (value) {
      return value;
    }
  }
}

async function main() {
  const raw = await fs.readFile(dataPath, "utf8");
  const parsed = JSON.parse(raw);
  const apps = Array.isArray(parsed.apps) ? parsed.apps : [];

  const rl = readline.createInterface({ input, output });

  try {
    const name = await promptRequired(rl, "App name");
    const url = await promptRequired(rl, "Official URL");
    const category = await promptRequired(rl, "Category");
    const shortDescription = await promptRequired(rl, "Short description");
    const keywordInput = await rl.question("Keywords (comma separated): ");
    const overviewInput = await rl.question("Overview paragraph (optional): ");
    const featureInput = await rl.question("Features (comma separated, optional): ");
    const bestForInput = await rl.question("Best for (comma separated, optional): ");
    const alternativesInput = await rl.question("Alternatives (comma separated, optional): ");
    const notesInput = await rl.question("Notes (comma separated, optional): ");

    const baseSlug = slugify(name);
    if (!baseSlug) {
      throw new Error("Could not generate a valid slug from the app name.");
    }

    const keywords = splitList(keywordInput);
    const app = {
      slug: ensureUniqueSlug(baseSlug, apps),
      name,
      category,
      url,
      shortDescription,
      overview: overviewInput.trim() || buildOverview(name, category, shortDescription, keywords),
      keywords,
      features: splitList(featureInput),
      bestFor: splitList(bestForInput),
      alternatives: splitList(alternativesInput),
      notes: splitList(notesInput)
    };

    apps.push(app);
    await fs.writeFile(dataPath, `${JSON.stringify({ apps }, null, 2)}\n`, "utf8");

    console.log(`Added ${app.name} with slug "${app.slug}".`);
    console.log("Next step: node scripts/generate-content.mjs");
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
