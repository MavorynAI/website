import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The production site is served from the root of www.mavorynai.com.
  base: '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
