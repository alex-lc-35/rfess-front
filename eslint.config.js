import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

const { configs: vueConfigs } = vuePlugin;

export default [
    {
        ignores: ["node_modules/**", "dist/**"], // Fichiers/dossiers à ignorer
    },
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser, // Utiliser vue-eslint-parser pour analyser les fichiers .vue
            ecmaVersion: 2020,
            sourceType: "module",
        },
        plugins: {
            vue: vuePlugin,
        },
        rules: {
            ...vueConfigs["vue3-recommended"].rules,
            "vue/multi-word-component-names": "off", // Désactiver la contrainte sur les noms multi-mots
        },
    },
];
