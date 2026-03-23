# New Apps Brief

This file is generated from [`data/apps.json`](./data/apps.json) by [`scripts/generate-content.mjs`](./scripts/generate-content.mjs).

Run `node scripts/generate-content.mjs` after updating the app data.

New Apps Brief is a curated app directory for SEO indexing. It collects new app links, short introductions, categories, and target keywords in one repository so the homepage and each app page can be indexed clearly.

## How To Maintain

1. Edit [`data/apps.json`](./data/apps.json).
2. Run `node scripts/generate-content.mjs`.
3. Commit the updated `README.md` and generated files in [`apps/`](./apps).

## App Directory

| App Name | Category | Website | Short Description | SEO Keywords | Detail Page |
| --- | --- | --- | --- | --- | --- |
| Sailor Piece Wiki & Guide Hub | Game Wiki | https://sailorpiece.pro | A Sailor Piece wiki and guide hub for players looking for game information, tips, and progression help. | sailor piece wiki, sailor piece guide, sailor piece tips, game wiki, guide hub | [sailor-piece-wiki-guide-hub](./apps/sailor-piece-wiki-guide-hub.md) |
| Blinkly AI | AI Image and Video Creation | https://blinklyai.com/ | Fast AI image editing and cinematic AI video generation for turning ideas into films and animating static photos. | blinkly ai, ai image editing, ai video generator, cinematic ai video, photo to video ai | [blinkly-ai](./apps/blinkly-ai.md) |
| HumanDesignChart.org | Human Design Chart Tool | https://humandesignchart.org | Generate a free Human Design Chart instantly and explore your Type, Strategy, Authority, Profile, and Bodygraph analysis. | free human design chart, human design chart, human design calculator, bodygraph analysis, human design reading | [human-design-chart](./apps/human-design-chart.md) |
| Box-Breathing.org | Breathing App | https://box-breathing.org | A professional box breathing app for mastering the box breathing technique and guided breathing exercise for anxiety relief. | box breathing, box breathing exercise, box breathing app, breathing exercise for anxiety, guided breathwork | [box-breathing](./apps/box-breathing.md) |
| SnapWind | Window Manager App | https://snapwind.app/ | A lightweight window manager that instantly tidies up messy windows and helps keep your desktop organized. | snapwind, window manager app, desktop productivity app, window snapping tool, desktop organization | [snapwind](./apps/snapwind.md) |

## App Detail Pages

- [Sailor Piece Wiki & Guide Hub](./apps/sailor-piece-wiki-guide-hub.md): A Sailor Piece wiki and guide hub for players looking for game information, tips, and progression help. - sailor piece wiki, sailor piece guide, sailor piece tips, game wiki, guide hub
- [Blinkly AI](./apps/blinkly-ai.md): Fast AI image editing and cinematic AI video generation for turning ideas into films and animating static photos. - blinkly ai, ai image editing, ai video generator, cinematic ai video, photo to video ai
- [HumanDesignChart.org](./apps/human-design-chart.md): Generate a free Human Design Chart instantly and explore your Type, Strategy, Authority, Profile, and Bodygraph analysis. - free human design chart, human design chart, human design calculator, bodygraph analysis, human design reading
- [Box-Breathing.org](./apps/box-breathing.md): A professional box breathing app for mastering the box breathing technique and guided breathing exercise for anxiety relief. - box breathing, box breathing exercise, box breathing app, breathing exercise for anxiety, guided breathwork
- [SnapWind](./apps/snapwind.md): A lightweight window manager that instantly tidies up messy windows and helps keep your desktop organized. - snapwind, window manager app, desktop productivity app, window snapping tool, desktop organization
- Directory guide: [`apps/README.md`](./apps/README.md)
- Optional writing template: [`apps/_template.md`](./apps/_template.md)

## SEO Writing Notes

- Put the exact app name in the title and first sentence.
- Link the official website directly.
- Use a clear one-line summary for the homepage table.
- Add category phrases and long-tail keywords naturally.
- Keep one source of truth in `data/apps.json` to avoid outdated descriptions.

## Example Record

```json
{
  "slug": "your-app-slug",
  "name": "Your App Name",
  "category": "AI Tool",
  "url": "https://example.com",
  "shortDescription": "One sentence summary for homepage indexing.",
  "overview": "A fuller paragraph explaining what the app does, who it is for, and which search terms it matches.",
  "keywords": ["ai tool", "your app name", "long tail keyword"],
  "features": ["Feature 1", "Feature 2"],
  "bestFor": ["Marketers", "Founders"],
  "alternatives": ["Alternative A", "Alternative B"],
  "notes": ["Pricing note", "Launch note"]
}
```

