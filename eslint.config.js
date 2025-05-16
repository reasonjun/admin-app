import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // JavaScript 규칙
  js.configs.recommended,

  // TypeScript 규칙
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // TypeScript 파서 옵션
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    files: ["**/*.ts", "**/*.tsx"],
  },

  // React 훅 규칙
  ...compat.config({
    extends: ["plugin:react-hooks/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
  }),

  // Next.js + TypeScript 설정 (이 설정이 @next/eslint-plugin-next를 간접적으로 사용함)
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),

  // Prettier 설정
  prettierConfig,

  // 커스텀 규칙 및 전역 설정
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",

      // import 정렬 (선택사항)
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },

  // 특정 파일/폴더 무시
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "public/**",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
    ],
  },
];
