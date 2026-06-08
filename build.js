const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    outfile: "dist/index.js",
    bundle: true,
    minify: false,
    sourcemap: false,
    format: "esm",  // یا "cjs" برای CommonJS
    target: ["esnext"],
    // REMOVE this line
    external: ["react", "react-dom"],  // این خط را حذف کن
  })
  .catch(() => process.exit(1));
