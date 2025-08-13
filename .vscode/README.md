# Paste images into Starlight docs in VS Code

This workspace is configured so that when you paste an image into an MDX editor under `src/content/docs/`, the Paste Image extension saves the file to `src/assets/docs/${currentFileNameWithoutExt}/` and inserts an alias-based link.

## What is enabled
- **Clipboard paste (recommended)**: Paste screenshots or copied images directly in `.mdx` under `src/content/docs/...`.
- **Automatic destination**: Images are stored per-page in `src/assets/docs/${currentFileNameWithoutExt}/`.
- **Alias links**: Inserted links use `@/assets/...` so you do not worry about relative depth.
- **Name prompt**: You are prompted to choose a readable filename on paste.

These are powered by the following workspace settings in `.vscode/settings.json`:

```json
{
  "pasteImage.path": "${projectRoot}/src/assets/docs/${currentFileNameWithoutExt}",
  "pasteImage.basePath": "${projectRoot}",
  "pasteImage.forceUnixStyleSeparator": true,
  "pasteImage.showFilePathConfirmInputBox": true,
  "pasteImage.insertPattern": "![](@/assets/docs/${currentFileNameWithoutExt}/${imageFileName})"
}
```

## How it works
1. In any doc page like `src/content/docs/guides/example.mdx`, press Cmd+V to paste a screenshot or image.
2. The file is saved to `src/assets/docs/example/`.
3. A Markdown link using the alias path is inserted, e.g.:
   ```md
   ![](@/assets/docs/example/roles-dashboard.png)
   ```

## Clipboard vs file drop
- **Clipboard paste**: Works with images copied from other apps or screenshots. The file will be created in the destination folder and linked.
- **File drag & drop**: Optional. If you prefer drag & drop for files, enable the Markdown copy-into-workspace settings below. Note: they may not trigger in MDX editors.

## Notes and tips
- If you prefer to overwrite existing files instead of renaming, change `markdown.copyFiles.overwriteBehavior` to `overwrite` (not recommended unless you know the link target is unchanged elsewhere).
- Keep alt text descriptive for accessibility.
- Store large or shared assets in an appropriate subfolder of `src/assets/docs/` and link them explicitly if they are reused across multiple pages.

## Use the @ alias for images
This project supports the `@` alias for `src`. The paste workflow inserts an alias-based Markdown link:

```md
![](@/assets/docs/${currentFileNameWithoutExt}/${imageFileName})
```

This renders reliably in Starlight and keeps paths consistent regardless of page nesting depth.

### Optional: enable file drag & drop for Markdown files
If you also want Shift+drag of existing files to copy and link, add these settings. They work best in `.md` and may not trigger in `.mdx`:

```json
{
  "markdown.editor.filePaste.enabled": true,
  "markdown.editor.filePaste.copyIntoWorkspace": "mediaFiles",
  "markdown.editor.drop.enabled": true,
  "markdown.editor.drop.copyIntoWorkspace": "mediaFiles",
  "markdown.copyFiles.destination": {
    "/src/content/docs/**/*": "/src/assets/docs/${documentBaseName}/"
  },
  "markdown.copyFiles.overwriteBehavior": "rename"
}
```

## Name images clearly on paste
When pasting, the editor will prompt you for a filename (enabled via `pasteImage.showFilePathConfirmInputBox: true`). Use concise, descriptive names like `roles-dashboard.png` or `roles-permissions.png` to avoid unreadable timestamps.

## Reference
Based on the guide “Paste images to Starlight pages with Visual Studio Code”.
```text
https://hideoo.dev/notes/starlight-paste-images-with-visual-studio-code/
```
