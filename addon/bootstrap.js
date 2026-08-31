/**
 * Most of this code is from Zotero team's official Make It Red example[1]
 * or the Zotero 7 documentation[2].
 * [1] https://github.com/zotero/make-it-red
 * [2] https://www.zotero.org/support/dev/zotero_7_for_developers
 */

var chromeHandle;

function install(data, reason) {}

async function startup({ id, version, resourceURI, rootURI }, reason) {
  // Zotero 10 (Fx128+): ChromeUtils.import() was removed but still exists as
  // a stub that throws. Monkey-patch it to redirect to importESModule so that
  // zotero-plugin-toolkit (and any other legacy code) works correctly.
  if (
    typeof ChromeUtils !== "undefined" &&
    typeof ChromeUtils.import === "function" &&
    typeof ChromeUtils.importESModule === "function"
  ) {
    const _origImport = ChromeUtils.import;
    ChromeUtils.import = function (path, ...args) {
      try {
        return _origImport.call(ChromeUtils, path, ...args);
      } catch {
        return ChromeUtils.importESModule(path, ...args);
      }
    };
  }

  await Zotero.initializationPromise;

  var aomStartup = Components.classes[
    "@mozilla.org/addons/addon-manager-startup;1"
  ].getService(Components.interfaces.amIAddonManagerStartup);
  var manifestURI = Services.io.newURI(rootURI + "manifest.json");
  chromeHandle = aomStartup.registerChrome(manifestURI, [
    [
      "content",
      "__addonRef__",
      rootURI + "chrome/content/",
      "contentaccessible=yes",
    ],
  ]);

  /**
   * Global variables for plugin code.
   * The `_globalThis` is the global root variable of the plugin sandbox environment
   * and all child variables assigned to it is globally accessible.
   * See `src/index.ts` for details.
   */
  const ctx = {
    rootURI,
    // Define main window's document to create a fake browser environment
    document: Zotero.getMainWindow().document,
  };
  ctx._globalThis = ctx;

  Services.scriptloader.loadSubScript(
    `${rootURI}/chrome/content/scripts/__addonRef__.js`,
    ctx,
  );
  await Zotero.__addonInstance__.hooks.onStartup();
}

function onMainWindowLoad({ window: win }) {
  Zotero.__addonInstance__.hooks.onMainWindowLoad(win);
}

function onMainWindowUnload({ window: win }) {
  Zotero.__addonInstance__.hooks.onMainWindowUnload(win);
}

function shutdown({ id, version, resourceURI, rootURI }, reason) {
  if (reason === APP_SHUTDOWN) {
    return;
  }

  Zotero.__addonInstance__.hooks.onShutdown();

  if (chromeHandle) {
    chromeHandle.destruct();
    chromeHandle = null;
  }
}

function uninstall(data, reason) {}
