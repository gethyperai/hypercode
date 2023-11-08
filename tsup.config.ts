import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  target: "esnext",
  format: ["cjs", "esm"],
  platform: "node",
  dts: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
