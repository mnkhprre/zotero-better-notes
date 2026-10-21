# Changelog

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

*Fork maintained by [mnkhprre](https://github.com/mnkhprre)*
