import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // comment out the following line if you want to run tauri. this is here for GitHub Pages
  base: "/graphstuff/",
})
