# Better Notes for Zotero

[![zotero target version](https://img.shields.io/badge/Zotero-8%20%7C%209%20%7C%2010-green?style=flat-square&logo=zotero&logoColor=CC2936)](https://www.zotero.org)
[![based on upstream](https://img.shields.io/badge/based%20on-upstream%20v3.3.3-blue?style=flat-square&logo=github)](https://github.com/windingwind/zotero-better-notes)
[![latest release](https://img.shields.io/github/v/release/mnkhprre/zotero-better-notes?style=flat-square)](https://github.com/mnkhprre/zotero-better-notes/releases/latest)
[![license](https://img.shields.io/badge/license-AGPL--3.0-lightgrey?style=flat-square)](LICENSE)

<div align=center><img src="./docs/res/teaser.png" width="800px"></img></div>

Everything about note management. All in Zotero.

> [!NOTE]
> **This is a fork.** It is the original [Better Notes](https://github.com/windingwind/zotero-better-notes) by [@windingwind](https://github.com/windingwind), rebased on upstream **v3.3.3**, with the workflow features of the old **0.8.8** release brought back: the _Main Note_ system, choosing where new links and annotations go, and cleaner notes made from annotations (Turkish placeholders included).
>
> 👉 Jump to [what's different in this fork](#-fork-features-mnkhprre-edition). For upstream bugs, questions and community templates, use the [upstream repository](https://github.com/windingwind/zotero-better-notes).

## 🧩 Outline

[✨ Fork features](#-fork-features-mnkhprre-edition)

[🧐 What is this?](#-what-is-this)

[🤔 What can it do?](#-what-can-it-do)

[👋 Install](#-install)

[😎 Quick start](#-quick-start)

<details style="text-indent: 2em">
<summary>More</summary>

[Getting Started by Opening a Note Tab](#getting-started-by-opening-a-note-tab)

[Note Editor](#note-editor)

[Note Link](#note-link)

[Note Template](#note-template)

[Syncing: Note 🔄️ Markdown](#syncing-note-%EF%B8%8F-markdown)

[Note Export](#note-export)

[LLM Integration](#llm-integration)

[Action Workflow](#action-workflow)

[Other Features](#other-features)

</details>

[🧲 API](#-api)

[🔧 Development](#-development)

[🔔 Disclaimer](#-disclaimer)

[🙏 Credits](#-credits)

## ✨ Fork features (mnkhprre edition)

Everything upstream v3.3.3 offers (Markdown editor mode, the library-wide note relation graph, sync, export, templates…) is kept. On top of it, this fork adds:

### 📌 Main Note system

Pick one note as the hub of your current project and reach it from anywhere.

<div align=center><img src="./docs/res/fork/main-note-workspace.png" width="800px" alt="A Main Note open in a note tab: outline on the left, the home button at the top right of the tab bar, and inbound/outbound links with the relation graph on the right"></div>

| Where                                           | What it does                                                                                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home button** at the right of the tab bar     | Opens your Main Note in a tab in one click.                                                                                                                   |
| Library right-click → **Set as Main Note**      | Makes the selected note your Main Note.                                                                                                                       |
| New note menu → **Create Main Note**            | Creates a new note, sets it as the Main Note and opens it.                                                                                                    |
| Note editor toolbar → **Recent Main Notes**     | Hover the house icon to switch between your last 10 Main Notes.                                                                                               |
| Note editor toolbar → **Add link to Main Note** | Hover the link icon to add a link to the current note at the start or end of the Main Note, or inside one of its sections (with a _"Referred in"_ back-link). |
| Library right-click → **Open in Workspace Tab** | Opens the note in a BN workspace tab.                                                                                                                         |

<table>
  <tr>
    <td width="42%"><img src="./docs/res/fork/recent-main-notes.png" alt="Recent Main Notes menu listing three notes"></td>
    <td width="58%"><img src="./docs/res/fork/add-link-to-main-note.png" alt="Add link menu with the Main Note's sections and a Start / End selector"></td>
  </tr>
  <tr>
    <td align="center"><em>Recent Main Notes</em></td>
    <td align="center"><em>Add link to Main Note: pick a section, start or end</em></td>
  </tr>
</table>

### 📍 Choose where things are inserted

- **Add link to Main Note**: choose _Start_ or _End_ at the bottom of the menu (see above).
- **Notes from annotations**: Settings → Better Notes → _Insert new annotations into_ the start or the end of the note.

<div align=center><img src="./docs/res/fork/annotation-insert-setting.png" width="560px" alt="Better Notes settings: Insert new annotations into Start of note"></div>

### 🧹 Cleaner notes from annotations

- The default `[QuickNoteV5]` template strips Turkish placeholders (`Seçilen Konum`, `Konum aranıyor...`), old `zotero://select` note links, text/background colours and extra blank lines from annotation comments.
- As in 0.8.8, the annotation's comment gets a `note link: "zotero://note/..."` pointing to the note made from it, so the annotation and its note stay connected.

### 🔍 Link preview

- Hover previews show the **whole** linked note, not only the part around the link.
- Clicking a preview opens the note in its own BN window.

<div align=center><img src="./docs/res/fork/link-preview.png" width="560px" alt="Hovering a note link shows the whole linked reading note"></div>

### 🪟 Compatibility

- Runs on **Zotero 8, 9 and 10** (`strict_max_version` 10.99.99). Screenshots above are from Zotero 10.
- Works with tiling window managers: workspace windows no longer force their own position or minimum sizes.
- Full English and **Turkish (tr-TR)** translations for the added features.

See [CHANGELOG.md](CHANGELOG.md) for details per release.

<details>
<summary>🇹🇷 Türkçe özet</summary>

Bu sürüm, [windingwind/zotero-better-notes](https://github.com/windingwind/zotero-better-notes) eklentisinin güncel **v3.3.3** sürümü üzerine kurulmuş bir çatallamadır (fork). Eski **0.8.8** sürümündeki şu özellikler geri getirilmiştir:

- **Ana Not (Main Note) sistemi**: sekmelerin yanındaki ev simgesiyle ana nota tek tıkla gitme, sağ tık → _Ana Not Olarak Ayarla_, _Ana Not Oluştur_, son 10 ana not arasında geçiş ve ana notun istenen bölümüne bağlantı ekleme.
- **Ekleme konumu seçimi**: bağlantıların bölümün başına/sonuna, açıklamalardan (annotation) oluşturulan notların notun başına/sonuna eklenmesi.
- **Temiz notlar**: açıklama yorumlarındaki `Seçilen Konum`, `Konum aranıyor...` gibi yer tutucular, renkler ve fazla boş satırlar otomatik temizlenir.
- **Zotero 8 / 9 / 10** desteği ve tam Türkçe arayüz.

Kurulum için aşağıdaki [Install](#-install) bölümüne bakın.

</details>

## 🧐 What is this?

Better Notes (BN) is a plugin for [Zotero](https://zotero.org).

BN streamlines your workflows of:

- paper reading
- annotating
- note taking
- metadata analyzing
- knowledge exporting
- AI writing assistant

and:

- works out of the box
- highly customizable
- all in Zotero

## 🤔 What can it do?

<details open>
<summary><b>📚 Knowledge Management & Linking</b></summary>

- 🖇️ **Connect knowledge fragments** with _note link_. With one click. [Learn more →](#note-link)
- 📌 **Main Note System** _(fork)_: Set any note as your "Main Note" and access it instantly via a dedicated toolbar button. [Learn more →](#-main-note-system)
- 🖥️ **Multi-Window Support**: Open as many note tabs or windows as you like!
- 🗂️ **Note Templates**: Simplify and automate knowledge analysis with extensive note templates. [Learn more →](#note-template)

</details>

<details>
<summary><b>🔄 Syncing & Exporting</b></summary>

- 🔄️ **Markdown Sync**: Keep in sync with your Markdown files (like Obsidian). Two-way, automatically. [Learn more →](#syncing-note-%EF%B8%8F-markdown)
- 🖨️ **Universal Export**: Export notes to Markdown, Docx, PDF, and mind maps. [Learn more →](#note-export)

</details>

<details>
<summary><b>🧹 Editor Enhancements & Smart Cleaning</b></summary>

- 📝 **Advanced Editor**: Enhancements for Zotero's note editor with outline, link relation, and image viewing.
- 🧹 **Smart Turkish Cleaning** _(fork)_: Automatically cleans up Turkish placeholders (`Seçilen Konum`, `Konum aranıyor...`) and redundant links. [Learn more →](#-cleaner-notes-from-annotations)
- 🪄 **Magic Key**: Command palette for quick actions in the editor.
- 🖼️ **Image Handling**: Resize images with right-click; preview with double-click.

</details>

<details>
<summary><b>🤖 AI & Workflow Automation</b></summary>

- 🤖 **LLM Integration**: Integrated chatting pane for AI-assisted writing (requires Zotero-GPT).
- ⚡ **Action Workflow**: Automate note generation/syncing with powerful action scripts.

</details>

## 👋 Install

- Download the plugin (.xpi file) from below. Works with Zotero 8, 9 and 10.
  - [Latest Release](https://github.com/mnkhprre/zotero-better-notes/releases/latest)
  - [All Releases](https://github.com/mnkhprre/zotero-better-notes/releases)

  _Note_: If you're using Firefox as your browser, right-click the `.xpi` and select "Save As.."

  > ⚠️ This fork uses the same add-on ID as the original Better Notes, so it **replaces** it. Uninstall the original first, or simply install this `.xpi` over it — your notes and settings are kept.

- In Zotero click `Tools` in the top menu bar and then click `Plugins`
- Go to the Extensions page and then click the gear icon in the top right.
- Select `Install Add-on from file`.
- Browse to where you downloaded the `.xpi` file and select it.
- Finish!

## 😎 Quick start

BN offers a range of features that can be combined like Lego blocks to build your own note-taking workflow.

Start taking notes in Zotero with BN in **5 minutes**!

### Getting Started by Opening a Note Tab

> 💡 In the latest version, the workspace is no longer a thing. You can open an unlimited number of note tabs/windows, which is what we called `workspace` in the past.

To open a note in a tab, double-click/press `Enter` on the item in the library, as you would do to open an attachment. Holding `shift` opens the note in a new window.

<div align=center><img src="https://github.com/user-attachments/assets/0824293b-765d-47af-8815-66f009adab0e" width="800px"></img></div>

> **Explore the Note Tab!**  
> 💡 The layout from left to right is:
>
> - Outline
> - Note editor
> - Context pane (tags, related, relation graph, in/outbound links)

### Note Editor

> 💡 Where can I find the note editor?
>
> - In the note tab/window
> - In the library: click to open a note editor in the item pane
> - In the PDF reader: right-side context pane
>
> 💡 How to create a new note?  
> Click the note icon in the library tools bar (the row under the tabs bar), or from the menu - File

<div align=center><img src="https://github.com/user-attachments/assets/ec2ba415-8ec9-450d-9d73-d24d177ccd13" width="400px"></img></div>

#### Magic Key

BN enhances the note editor with a _Magic Key_ command palette, which can be opened by typing `/` in the editor or pressing `Ctrl/Cmd` + `/`. You can type or use the arrow keys to navigate the commands, and press `Enter` to execute.

<div align=center><img src="https://github.com/user-attachments/assets/bdbe244e-c120-4d9b-aa28-5285a25a723a" width="800px"></img></div>

#### Note Link Preview

BN enhances the note editor with link preview. Hover+Ctrl/Cmd or click the link to preview the linked note without leaving the current note.

<div align=center><img width="400px" alt="image" src="https://github.com/user-attachments/assets/b29769a1-3436-42bd-8481-eee1c0b4896a"></div>

#### Direct Markdown Paste

BN supports direct markdown paste. You can paste markdown content into the note editor, and it will be converted to the rich text format automatically.

### Note Link

To create a _note link_ between the note you are editing and another note, click the <img src="addon/chrome/content/icons/favicon.png" width="20px"></img> button in the title bar of the note editor.

<div align=center><img src="https://github.com/user-attachments/assets/e37a694b-613e-4242-9c14-d83708a3d1e7" width="800px"></img></div>

> 💡 What's the difference between `Mention in` and `Link to`?
>
> `Mention in` will insert a link of the current note (from which you open the link creator) to another note (which you pick in the link creator), i.e. inbound link.
> `Link to` will insert links of picked notes to the current note, i.e. outbound link.

You can also manually copy the note link from the note editor menu.

### Note Template

Are you spending a lot of time writing summaries and copy-pasting while taking notes? Say hello to _Note Template_!

_Note Template_ is designed for tasks like:

- Summarize metadata and annotations from multiple papers, with customized filters
- Compare papers across sections
- Generate content programmatically

> 💡 Need help or looking for community templates? [See here →](https://github.com/windingwind/zotero-better-notes/discussions/categories/note-templates)
>
> 💡 Want to write/share your templates?
>
> [How to write →](docs/about-note-template.md#write-note-template)
>
> [How to share →](docs/about-note-template.md#share-your-template)

<div align=center><img src="https://github.com/user-attachments/assets/62e1438f-7910-4f57-ad88-c6a41dd9addf" width="800px"></img></div>

### Syncing: Note 🔄️ Markdown

With BN, you can integrate your note-taking into your existing workflow seamlessly. If you use markdown editors like Obsidian, you can keep your notes in sync with external Markdown files easily.

To set up auto-sync, click `Set Auto-Sync` the first time you export your note. There is no need for any third-party tools or complicated setups!

<div align=center><img src="https://user-images.githubusercontent.com/33902321/236622955-9ca54590-d6f8-433a-8622-33b35fc7b79d.png" width="800px"></img></div>

Any changes made to your note or its corresponding Markdown file will be automatically synced. This feature makes it easy to keep all of your notes up to date and in one place.

> 💡 Note: Synchronisation takes place once the editor is closed and after the period of time you set in the `Auto-sync period` preference.

> 💡 Using extended Markdown (Obsidian wiki links `[[...]]`, callouts, embeds, …)? See [Markdown Flavor Compatibility](docs/markdown-flavor-compatibility.md) to learn which syntaxes survive sync and how to keep the rest.

### Note Export

BN offers various options to export your notes, giving you the flexibility to choose the format that suits your needs.

You can export your note to the following formats:

- A new note in Zotero
- Markdown file (embedded or linked, with images)
- MS Word document (.docx)
- PDF document (.pdf)
- FreeMind file (.mm)

Simply click on the corresponding export button in the toolbar and follow the prompts.

### LLM Integration

The [Zotero-GPT](https://github.com/MuiseDestiny/zotero-gpt) plugin provides GPT Integration. If you also have Better Notes installed, you can wake up its chatting pane in the note editor and insert/modify content in the note.

### Action Workflow

The [Actions & Tags](https://github.com/windingwind/zotero-actions-tags) plugin provides a powerful workflow engine for Zotero. If you also have Better Notes installed, you can use the following actions to automate note generation/editing/syncing/etc.:

- [Auto-generate note from template when opening an item](https://github.com/windingwind/zotero-actions-tags/discussions/108)
- [Auto-sync note when opening/creating an item](https://github.com/windingwind/zotero-actions-tags/discussions/140)
- [More...](https://github.com/windingwind/zotero-actions-tags/discussions/categories/action-scripts)

### Other Features

- Quick Note: convert annotation to note with one click.
- Resize images with a right-click menu.
- Preview images with double-click/ctrl-click.

## 🧲 API

BN provides APIs for other plugin developers in `Zotero.BetterNotes.api.${API_MODULE}`. See [`api.ts`](src/api.ts).

- `workspace`: Workspace APIs
- `sync`: Syncing APIs
- `convert`: Lossless conversion between note, HTML, Markdown, note link, and annotation
- `template`: Manipulate note templates
- `$export`: Export note
- `$import`: Import note
- `editor`: Note editor APIs. Give your script full control of contents in the note editor.
- `note`: Note APIs. Parse and manipulate note content.
- `relation`: Note relation APIs. Get and set note relations.
- `utils`: Utility functions.

### Concepts about Note-Related APIs

In Zotero, the content of a note is stored as rich text, while when a note is opened in the note editor, it is rendered by ProseMirror as HTML.

Most of the time, it is recommended to use the `editor` API to interact with the content of the note, as it supports undo/redo and other features provided by editor. The `editor` API provides a set of powerful functions to analyze and manipulate the content in the note editor. Most of them needs an `editor` instance as the input, you can get the instance by calling `Zotero.BetterNotes.api.editor.getEditorInstance(noteId)`.

However, if note is not opened in the editor, you cannot get the `editor` instance. In this case, you can use the `note` API to interact with the content of the note.

## 🔧 Development

This plugin is built based on the [Zotero Plugin Template](https://github.com/windingwind/zotero-plugin-template). See the setup and debug details there.

To start, run

```bash
git clone https://github.com/mnkhprre/zotero-better-notes.git
cd zotero-better-notes
npm install
npm run build
```

The plugin is built to `./builds/*.xpi`.

To debug, run

```bash
npm run start
```

This will open a new Zotero instance with the plugin installed.

To test the plugin, run

```bash
npm run test
```

This will run the tests in the `./test` directory.

## 🔔 Disclaimer

Use this code under AGPL. No warranties are provided. Keep the laws of your locality in mind!

## 🙏 Credits

This fork would not exist without **[Better Notes](https://github.com/windingwind/zotero-better-notes)** by [@windingwind](https://github.com/windingwind) and its contributors. All the core features come from upstream; please support the original project:

- ⭐ Star and report upstream bugs at [windingwind/zotero-better-notes](https://github.com/windingwind/zotero-better-notes)
- 💬 Join the upstream community on Telegram: [@bnzotero](https://t.me/boost/bnzotero)
- 🧩 Other plugins by the same author: [Translate for Zotero](https://github.com/windingwind/zotero-pdf-translate), [Actions & Tags for Zotero](https://github.com/windingwind/zotero-actions-tags), [Bionic for Zotero](https://github.com/windingwind/bionic-for-zotero)

<a href="https://github.com/windingwind/zotero-better-notes/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=windingwind/zotero-better-notes" />
</a>

Fork maintained by [@mnkhprre](https://github.com/mnkhprre).
