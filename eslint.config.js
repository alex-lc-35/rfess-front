import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    {
        ignores: ["node_modules/**", "dist/**"], // Fichiers/dossiers à ignorer
    },
    {
        files: ["**/*.vue", "**/*.ts", "**/*.js"],
        languageOptions: {
            parser: vueParser, // Utilise vue-eslint-parser pour analyser les fichiers .vue
            parserOptions: {
                parser: tsParser, // Utilise TypeScript pour les blocs <script lang="ts">
                ecmaVersion: 2020,
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            vue: vuePlugin,
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...vuePlugin.configs["vue3-recommended"].rules, // Règles recommandées pour Vue 3
            ...tsPlugin.configs["recommended"].rules, // Règles recommandées pour TypeScript
            "vue/script-setup-uses-vars": "error", // Évite les erreurs de variables non utilisées dans <script setup>
            "@typescript-eslint/no-unused-vars": "error", // Avertit en cas de variables inutilisées
            "vue/multi-word-component-names": "off", // Désactive la contrainte des noms multi-mots
        },
    },
];
