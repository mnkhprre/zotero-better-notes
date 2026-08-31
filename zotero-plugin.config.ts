import pkg from "./package.json";
import { defineConfig } from "zotero-plugin-scaffold";
import { replaceInFile } from "replace-in-file";
import { bundleTypes } from "./scripts/types/bundleTypes.mjs";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const TEST_PREFS: Record<string, string | number | boolean> = {};
// Disable user guide, keep in sync with src/modules/userGuide.ts
TEST_PREFS[`${pkg.config.prefsPrefix}.latestTourVersion`] = 1;

export default defineConfig({
  source: ["src", "addon"],
  dist: "build",
  name: pkg.config.addonName,
  id: pkg.config.addonID,
  namespace: pkg.config.addonRef,
  updateURL: `https://raw.githubusercontent.com/mnkhprre/zotero-better-notes/master/update.json`,
  xpiDownloadLink:
    "https://github.com/mnkhprre/zotero-better-notes/releases/download/v{{version}}/{{xpiName}}.xpi",

  server: {
    asProxy: false,
  },

  build: {
    assets: ["addon/**/*.*", "scripts/types/**/*.*"],
    define: {
      ...pkg.config,
      author: pkg.author,
      description: pkg.description,
      homepage: pkg.homepage,
      buildVersion: pkg.version,
      buildTime: "{{buildTime}}",
    },
    esbuildOptions: [
      {
        entryPoints: ["src/index.ts"],
        define: {
          __env__: `"${process.env.NODE_ENV}"`,
        },
        bundle: true,
        target: "firefox115",
        outfile: `build/addon/chrome/content/scripts/${pkg.config.addonRef}.js`,
      },
      {
        entryPoints: ["src/extras/*.*"],
        define: {
          __env__: `"${process.env.NODE_ENV}"`,
        },
        outdir: "build/addon/chrome/content/scripts",
        bundle: true,
        target: ["firefox115"],
      },
    ],
    prefs: {
      prefix: pkg.config.prefsPrefix,
    },
    hooks: {
      "build:bundle": async (ctx) => {
        // Patch toolkit's _importESModule to always use importESModule (Zotero 10 compat)
        // ChromeUtils.import() was removed in Zotero 10 (Fx128+) but the function
        // still exists as a stub that throws. Replace the entire function body.
        const scriptsDir = "build/addon/chrome/content/scripts";
        const files = readdirSync(scriptsDir)
          .filter((f) => f.endsWith(".js"))
          .map((f) => join(scriptsDir, f));
        let patched = false;
        for (const filePath of files) {
          const content = readFileSync(filePath, "utf8");
          // Match the entire _importESModule function body
          const replaced = content.replace(
            /function _importESModule\((\w+)\)\s*\{[\s\S]*?return ChromeUtils\.import\(\1\);[\s\S]*?\}/,
            `function _importESModule($1){return ChromeUtils.importESModule($1,{global:"contextual"})}`,
          );
          if (replaced !== content) {
            writeFileSync(filePath, replaced);
            patched = true;
            console.log(`Patched _importESModule in ${filePath}`);
          }
        }
        if (!patched) {
          console.log("WARNING: No _importESModule function found to patch");
        }
        await Promise.all([
          replaceInFile({
            files: ["README.md"],
            from: /^ {2}- \[Latest Version.*/gm,
            to: `  - [Latest Version: ${ctx.version}](${ctx.xpiDownloadLink})`,
          }) as Promise<any>,
          bundleTypes(),
        ]);
        return;
      },
    },
  },
  release: {
    bumpp: {
      execute: "npm run build",
      all: true,
    },
  },
  test: {
    entries: ["test/"],
    prefs: TEST_PREFS,
    abortOnFail: true,
    hooks: {},
    waitForPlugin: `() => Zotero.${pkg.config.addonRef}.data.initialized`,
  },

  // If you need to see a more detailed build log, uncomment the following line:
  // logLevel: "trace",
});
