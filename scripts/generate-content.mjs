import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataPath = path.join(rootDir, "data", "apps.json");
const readmePath = path.join(rootDir, "README.md");
const appsDir = path.join(rootDir, "apps");
const generatedMarker = "<!-- generated:app-page -->";

const repositoryTitle = "New Apps Brief";
const repositoryIntro =
  "New Apps Brief is a curated app directory for SEO indexing. It collects new app links, short introductions, categories, and target keywords in one repository so the homepage and each app page can be indexed clearly.";

function withIndefiniteArticle(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) {
    return trimmed;
  }

  const article = /^[aeiou]/i.test(trimmed) ? "an" : "a";
  return `${article} ${trimmed}`;
}

function categoryPhrase(category) {
  const trimmed = String(category ?? "").trim();
  if (!trimmed) {
    return "an app";
  }

  if (/\b(app|tool|site|platform|hub|wiki)\b/i.test(trimmed)) {
    return withIndefiniteArticle(trimmed);
  }

  return withIndefiniteArticle(`${trimmed} app`);
}

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").trim();
}

function normalizeList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function requiredString(app, key) {
  const value = String(app[key] ?? "").trim();
  if (!value) {
    throw new Error(`App "${app.name ?? "unknown"}" is missing required field "${key}".`);
  }
  return value;
}

function renderDetailPage(app) {
  const overview = requiredString(app, "overview");
  const keywords = normalizeList(app.keywords);
  const features = normalizeList(app.features);
  const bestFor = normalizeList(app.bestFor);
  const alternatives = normalizeList(app.alternatives);
  const notes = normalizeList(app.notes);

  const lines = [
    generatedMarker,
    `# ${app.name}`,
    "",
    `${app.name} is ${categoryPhrase(app.category)}. The official website is [${app.url}](${app.url}).`,
    "",
    "## Website",
    "",
    `- Official site: ${app.url}`,
    "",
    "## Short Description",
    "",
    app.shortDescription,
    "",
    "## Overview",
    "",
    overview,
    "",
    "## Main Features",
    "",
    ...(features.length > 0 ? features.map((item) => `- ${item}`) : ["- Not specified"]),
    "",
    "## Best For",
    "",
    ...(bestFor.length > 0 ? bestFor.map((item) => `- ${item}`) : ["- Not specified"]),
    "",
    "## Keywords",
    "",
    ...(keywords.length > 0 ? keywords.map((item) => `- ${item}`) : ["- Not specified"]),
    "",
    "## Alternatives",
    "",
    ...(alternatives.length > 0 ? alternatives.map((item) => `- ${item}`) : ["- Not specified"]),
    "",
    "## Notes",
    "",
    ...(notes.length > 0 ? notes.map((item) => `- ${item}`) : ["- Not specified"]),
    ""
  ];

  return `${lines.join("\n")}\n`;
}

function renderReadme(apps) {
  const lines = [
    `# ${repositoryTitle}`,
    "",
    `This file is generated from [\`data/apps.json\`](./data/apps.json) by [\`scripts/generate-content.mjs\`](./scripts/generate-content.mjs).`,
    "",
    "Run `node scripts/generate-content.mjs` after updating the app data.",
    "",
    repositoryIntro,
    "",
    "## How To Maintain",
    "",
    "1. Edit [`data/apps.json`](./data/apps.json).",
    "2. Run `node scripts/generate-content.mjs`.",
    "3. Commit the updated `README.md` and generated files in [`apps/`](./apps).",
    "",
    "## App Directory",
    ""
  ];

  if (apps.length === 0) {
    lines.push("No apps added yet.", "");
    lines.push("Add your first record to [`data/apps.json`](./data/apps.json) and regenerate the content.", "");
  } else {
    lines.push("| App Name | Category | Website | Short Description | SEO Keywords | Detail Page |");
    lines.push("| --- | --- | --- | --- | --- | --- |");
    for (const app of apps) {
      const keywordText = escapeCell(normalizeList(app.keywords).join(", "));
      lines.push(
        `| ${escapeCell(app.name)} | ${escapeCell(app.category)} | ${escapeCell(app.url)} | ${escapeCell(app.shortDescription)} | ${keywordText} | [${escapeCell(app.slug)}](./apps/${app.slug}.md) |`
      );
    }
    lines.push("");
  }

  lines.push("## App Detail Pages", "");

  if (apps.length === 0) {
    lines.push("- Directory guide: [`apps/README.md`](./apps/README.md)");
    lines.push("- Optional writing template: [`apps/_template.md`](./apps/_template.md)");
  } else {
    for (const app of apps) {
      const keywords = normalizeList(app.keywords);
      const keywordSuffix = keywords.length > 0 ? ` - ${keywords.join(", ")}` : "";
      lines.push(`- [${app.name}](./apps/${app.slug}.md): ${app.shortDescription}${keywordSuffix}`);
    }
    lines.push("- Directory guide: [`apps/README.md`](./apps/README.md)");
    lines.push("- Optional writing template: [`apps/_template.md`](./apps/_template.md)");
  }

  lines.push("", "## SEO Writing Notes", "");
  lines.push("- Put the exact app name in the title and first sentence.");
  lines.push("- Link the official website directly.");
  lines.push("- Use a clear one-line summary for the homepage table.");
  lines.push("- Add category phrases and long-tail keywords naturally.");
  lines.push("- Keep one source of truth in `data/apps.json` to avoid outdated descriptions.", "");
  lines.push("## Example Record", "");
  lines.push("```json");
  lines.push('{');
  lines.push('  "slug": "your-app-slug",');
  lines.push('  "name": "Your App Name",');
  lines.push('  "category": "AI Tool",');
  lines.push('  "url": "https://example.com",');
  lines.push('  "shortDescription": "One sentence summary for homepage indexing.",');
  lines.push('  "overview": "A fuller paragraph explaining what the app does, who it is for, and which search terms it matches.",');
  lines.push('  "keywords": ["ai tool", "your app name", "long tail keyword"],');
  lines.push('  "features": ["Feature 1", "Feature 2"],');
  lines.push('  "bestFor": ["Marketers", "Founders"],');
  lines.push('  "alternatives": ["Alternative A", "Alternative B"],');
  lines.push('  "notes": ["Pricing note", "Launch note"]');
  lines.push('}');
  lines.push("```", "");

  return `${lines.join("\n")}\n`;
}

async function loadApps() {
  const raw = await fs.readFile(dataPath, "utf8");
  const parsed = JSON.parse(raw);
  const apps = Array.isArray(parsed.apps) ? parsed.apps : [];

  return apps.map((app, index) => {
    const normalized = {
      slug: requiredString(app, "slug"),
      name: requiredString(app, "name"),
      category: requiredString(app, "category"),
      url: requiredString(app, "url"),
      shortDescription: requiredString(app, "shortDescription"),
      overview: requiredString(app, "overview"),
      keywords: normalizeList(app.keywords),
      features: normalizeList(app.features),
      bestFor: normalizeList(app.bestFor),
      alternatives: normalizeList(app.alternatives),
      notes: normalizeList(app.notes)
    };

    if (!/^[a-z0-9-]+$/.test(normalized.slug)) {
      throw new Error(`App "${normalized.name}" has invalid slug "${normalized.slug}". Use lowercase letters, numbers, and hyphens only.`);
    }

    return { ...normalized, order: index };
  });
}

async function removeOldGeneratedPages(validSlugs) {
  const entries = await fs.readdir(appsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    if (entry.name === "README.md" || entry.name === "_template.md") {
      continue;
    }

    const filePath = path.join(appsDir, entry.name);
    const content = await fs.readFile(filePath, "utf8");
    if (!content.startsWith(generatedMarker)) {
      continue;
    }

    const slug = entry.name.slice(0, -3);
    if (!validSlugs.has(slug)) {
      await fs.unlink(filePath);
    }
  }
}

async function main() {
  const apps = await loadApps();
  await fs.mkdir(appsDir, { recursive: true });
  await removeOldGeneratedPages(new Set(apps.map((app) => app.slug)));

  for (const app of apps) {
    const targetPath = path.join(appsDir, `${app.slug}.md`);
    await fs.writeFile(targetPath, renderDetailPage(app), "utf8");
  }

  await fs.writeFile(readmePath, renderReadme(apps), "utf8");

  const summary = apps.length === 0 ? "Generated README with no apps yet." : `Generated README and ${apps.length} app page(s).`;
  console.log(summary);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
