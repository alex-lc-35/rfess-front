import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'], // Ajouter ou personnaliser des thèmes ici
  },
}
