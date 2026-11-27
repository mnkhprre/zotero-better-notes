# Changelog

## v3.3.3.1

Fork release on top of upstream **v3.3.3**.

### 🚀 Features

- Rebased on upstream v3.3.3: Markdown editor mode, library-wide note relation graph, Zotero 10 support
- 0.8.8 Main Note system: home button next to the tabs, _Set as Main Note_, _Create Main Note_, _Recent Main Notes_, _Add link to Main Note_ (start, end or a chosen section), _Open in Workspace Tab_
- Insertion position for the link creator (start / end of section) and for notes from annotations (start / end of note)
- Annotation comments get a `note link` back to the note made from them
- Hover previews show the full linked note

### 🩹 Fixes

- Repair the broken `master` merge (duplicated code that stopped the plugin from compiling, lost Markdown-mode imports, double Main Note button click handler, broken colour-stripping regexes in `[QuickNoteV5]`)
- Keep the tiling window manager layout fixes from v3.2.2
- `waitUtilAsync` rejects with an `Error` instead of `undefined`
- Release workflow now commits `update.json` to `master`, so installed copies can auto-update

## v3.2.2

### 🚀 Features

- **Hover preview link opening**: Clicking a link in the hover preview now opens the note in a separate BN window instead of the main page (`linkPreview.ts`, `editor.ts`)

### 🩹 Fixes

- **Tiling window manager compatibility**: Workspace windows now properly adapt to tiling WM layout constraints
  - Removed `screenX screenY` from window position persistence — WM handles placement
  - Removed absolute width persistence from workspace panes — CSS flex handles proportional distribution
  - Reduced `min-width` constraints for better small-window support (context: 360px→250px, editor: 370px→280px, window: 800px→400px)
  - Removed `min-width: fit-content` from center container to allow flex shrinking
  - Added `overflow: hidden` to top container to prevent content overflow

### 🏡 Chore

- Merge upstream v3.2.0 into master with customizations preserved
- Remove duplicate click listener in `initGlobalMainNoteButton`
- Bump version to 3.2.2

## v3.2.1

- Hover preview link click opens note in separate window
- Upstream v3.2.0 merge with fork customizations preserved

## v3.2.0 (upstream)

### 🚀 Enhancements

- Add preference for disabling pane note sections (#1586)
- Add magic key command registration

---

_Fork maintained by [mnkhprre](https://github.com/mnkhprre)_
