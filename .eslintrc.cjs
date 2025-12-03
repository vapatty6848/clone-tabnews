module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["eslint:recommended"],
  rules: {},
  overrides: [
    {
      files: ["**/*.test.js", "test/**"],
      env: { jest: true },
    },
  ],
};
