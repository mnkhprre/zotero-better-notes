import { initEditorImagePreviewer } from "./image";
import { injectEditorCSS, injectEditorScripts } from "./inject";
import { initEditorPlugins } from "./plugins";
import { initEditorMenu } from "./menu";
import { initEditorPopup } from "./popup";
import { initEditorToolbar } from "./toolbar";
import { initEditorSections } from "./section";
import { initEditorMagicKeyCommands } from "./magicKey";

let prefsObserver = Symbol();
let originalRegisterEditorInstance: typeof Zotero.Notes.registerEditorInstance;

export function registerEditorInstanceHook() {
  // PatchHelper from zotero-plugin-toolkit uses ChromeUtils.import() which is
  // removed in Zotero 10 (Fx128+). Use direct function replacement instead.
  originalRegisterEditorInstance = Zotero.Notes.registerEditorInstance;
  Zotero.Notes.registerEditorInstance = function (
    this: typeof Zotero.Notes,
    instance: Zotero.EditorInstance,
  ) {
    originalRegisterEditorInstance.apply(this, [instance]);
    onEditorInstanceCreated(instance);
  };
  Zotero.Notes._editorInstances.forEach(onEditorInstanceCreated);

  // For unknown reasons, the css becomes undefined after font size change
  prefsObserver = Zotero.Prefs.registerObserver("note.fontSize", () => {
    Zotero.Notes._editorInstances.forEach((editor) => {
      injectEditorCSS(editor._iframeWindow);
    });
  });
}

export function unregisterEditorInstanceHook() {
  if (originalRegisterEditorInstance) {
    Zotero.Notes.registerEditorInstance = originalRegisterEditorInstance;
  }
  Zotero.Prefs.unregisterObserver(prefsObserver);
}

async function onEditorInstanceCreated(editor: Zotero.EditorInstance) {
  // `registerEditorInstance` (which triggers this hook) fires at the very start
  // of `EditorInstance.init()` — before init() assigns the fresh `_initPromise`
  // and, on a `reinit()`, before the new EditorCore is built. Yield once so the
  // fresh promise is in place, then await it, so we always attach our plugins to
  // the current core instead of a stale one. Re-application is safe because
  // `initPlugins` is idempotent (see extras/editor/plugins.ts).
  await Promise.resolve();
  await editor._initPromise;
  if (!addon.data.alive) {
    return;
  }

  // item.getNote may not be initialized yet
  if (Zotero.ItemTypes.getID("note") !== editor._item.itemTypeID) {
    return;
  }
  // The editor instance may be destroyed before the promise resolves
  try {
    await injectEditorScripts(editor._iframeWindow);
    injectEditorCSS(editor._iframeWindow);
    initEditorImagePreviewer(editor);
    await initEditorToolbar(editor);
    initEditorPopup(editor);
    initEditorMenu(editor);
    initEditorPlugins(editor);
    await initEditorMagicKeyCommands(editor);
    await initEditorSections(editor);
  } catch (e) {
    const isDead =
      !Zotero.Notes._editorInstances.includes(editor) ||
      Components.utils.isDeadWrapper(editor._iframeWindow);
    if (!isDead) {
      throw e;
    }
  }
}
