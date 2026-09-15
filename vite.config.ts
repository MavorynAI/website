import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves project sites from /<repository>/.
  // The deployment workflow supplies the exact path, including an empty path
  // when a custom domain is configured.
  base: process.env.PAGES_BASE_PATH
    ? `${process.env.PAGES_BASE_PATH}/`
    : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
