module.exports = {
  env: {
    node: true,
    es2022: true
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    noInlineConfig: true,
    node: {
      tryExtensions: [".js", ".ts", ".d.ts"],
      moduleDirectory: ["node_modules", "src/"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".d.ts"],
        moduleDirectory: ["node_modules", "src/"],
        typescript: {},
      },
      typescript: {
        alwaysTryTypes: true,
        project: ".",
      },
    },
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      { ignoreParameters: true },
    ],
    "@typescript-eslint/no-non-null-assertion": 1,
    "@typescript-eslint/no-unused-vars": 1,
    eqeqeq: "error",
    "no-return-await": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
