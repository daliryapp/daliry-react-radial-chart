const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    outfile: "dist/index.js",
    bundle: true,
    minify: false,
    sourcemap: false,
    format: "esm",
    target: ["esnext"],
    // REMOVE this line
    external: ["react", "react-dom"],
  })
  .catch(() => process.exit(1));
