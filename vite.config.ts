import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

import tsconfig from "./tsconfig.app.json"

const SRC_PATH = path.resolve(__dirname, "src")

const parseTsConfigPaths = (
  paths: Record<string, string[]>
): Record<string, string> => {
  const aliases: Record<string, string> = {}

  Object.entries(paths).forEach(([key, value]) => {
    const cleanKey = key.replace("/*", "")
    const cleanValue = value[0].replace("/*", "")
    aliases[cleanKey] = path.join(SRC_PATH, cleanValue)
  })

  return aliases
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
})
