# Apps Directory

This folder contains generated app detail pages and one optional manual template.

## Maintenance Flow

1. Add or edit app records in [`../data/apps.json`](/Users/zeny/Projects/zeny2026/NewAppsBrief/NewAppsBrief/data/apps.json).
2. Run `node scripts/generate-content.mjs` from the repository root.
3. Commit the updated files in this folder.

## Files

- `_template.md`: optional manual writing reference
- `{slug}.md`: generated app detail page for each app record
