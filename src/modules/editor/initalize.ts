import { PatchHelper } from "zotero-plugin-toolkit";
import { initEditorImagePreviewer } from "./image";
import { injectEditorCSS, injectEditorScripts } from "./inject";
import { initEditorPlugins } from "./plugins";
import { initEditorMenu } from "./menu";
import { initEditorPopup } from "./popup";
import { initEditorToolbar } from "./toolbar";
import { initEditorSections } from "./section";
import { initEditorMagicKeyCommands } from "./magicKey";
import { config } from "../../../package.json";

let prefsObserver = Symbol();

export function registerEditorInstanceHook() {
  try {
    ztoolkit.log(`[BN] Zotero.Notes: ${typeof Zotero.Notes}`);
    ztoolkit.log(`[BN] registerEditorInstance: ${typeof Zotero.Notes?.registerEditorInstance}`);
    ztoolkit.log(`[BN] _editorInstances: ${typeof Zotero.Notes?._editorInstances} len=${Zotero.Notes?._editorInstances?.length}`);
  } catch (e) {
    ztoolkit.log(`[BN] pre-check error`, e);
  }

  try {
    new PatchHelper().setData({
      target: Zotero.Notes,
      funcSign: "registerEditorInstance",
      patcher: (origin) =>
        function (this: typeof Zotero.Notes, instance: Zotero.EditorInstance) {
          origin.apply(this, [instance]);
          onEditorInstanceCreated(instance).catch((e) =>
            ztoolkit.log("[BN editor init] error", e),
          );
        },
      enabled: true,
      pluginID: config.addonID,
    });
    ztoolkit.log("[BN] PatchHelper applied successfully");
  } catch (e) {
    ztoolkit.log("[BN] PatchHelper error", e);
  }

  try {
    if (Zotero.Notes?._editorInstances) {
      ztoolkit.log(`[BN] Patching ${Zotero.Notes._editorInstances.length} existing editors`);
      Zotero.Notes._editorInstances.forEach((instance) => {
        onEditorInstanceCreated(instance).catch((e) =>
          ztoolkit.log("[BN editor init] error", e),
        );
      });
    }
  } catch (e) {
    ztoolkit.log("[BN] _editorInstances iteration error", e);
  }

  prefsObserver = Zotero.Prefs.registerObserver("note.fontSize", () => {
    Zotero.Notes._editorInstances.forEach((editor) => {
      injectEditorCSS(editor._iframeWindow);
    });
  });
}

export function unregisterEditorInstanceHook() {
  Zotero.Prefs.unregisterObserver(prefsObserver);
}

async function onEditorInstanceCreated(editor: Zotero.EditorInstance) {
  await Promise.resolve();
  await editor._initPromise;
  if (!addon.data.alive) {
    return;
  }

  if (Zotero.ItemTypes.getID("note") !== editor._item.itemTypeID) {
    return;
  }
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
