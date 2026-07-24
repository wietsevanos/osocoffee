import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

// Bundle every referenced `*.asset.json` asset into `dist/__l5e/assets-v1/...`
// so the site works on any static host (DirectAdmin, Netlify, GitHub Pages...).
// Lovable's preview serves these paths automatically, external hosts do not.
function bundleLovableAssets() {
  const CDN_HOSTS = [
    "https://osono-minimal-premium.lovable.app",
    "https://id-preview--5b317fba-6fdf-4ea1-84c7-341eeb891028.lovable.app",
  ];

  function walk(dir: string, out: string[] = []) {
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const s = statSync(p);
      if (s.isDirectory()) walk(p, out);
      else if (name.endsWith(".asset.json")) out.push(p);
    }
    return out;
  }

  return {
    name: "bundle-lovable-assets",
    apply: "build" as const,
    async closeBundle() {
      const outDir = "dist";
      const pointers = [...walk("src"), ...walk("public")];
      let ok = 0;
      let failed: string[] = [];
      for (const file of pointers) {
        try {
          const meta = JSON.parse(readFileSync(file, "utf8"));
          if (!meta.url || !meta.asset_id || !meta.original_filename) continue;
          const dest = join(outDir, meta.url);
          if (existsSync(dest)) {
            ok++;
            continue;
          }
          let buf: ArrayBuffer | null = null;
          for (const host of CDN_HOSTS) {
            try {
              const res = await fetch(host + meta.url);
              if (res.ok) {
                buf = await res.arrayBuffer();
                break;
              }
            } catch {}
          }
          if (!buf) {
            failed.push(meta.url);
            continue;
          }
          mkdirSync(dirname(dest), { recursive: true });
          writeFileSync(dest, Buffer.from(buf));
          ok++;
        } catch (e) {
          failed.push(file);
        }
      }
      console.log(`[bundle-lovable-assets] bundled ${ok} asset(s)` + (failed.length ? `, ${failed.length} failed: ${failed.join(", ")}` : ""));
    },
  };
}

// Plain Vite SPA build. `bun run build` produces static assets in `dist/`
// that can be served by any static host (DirectAdmin, Netlify, GitHub Pages, ...).
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    bundleLovableAssets(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
