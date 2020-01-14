module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    "quotes": [2, "single"],
    "semi": [2, "never"],
    "node/exports-style": ["error", "module.exports"],
    "node/no-missing-require": "error",
    "node/file-extension-in-import": [
      "error",
      "never",
      {
        "tryExtensions": [".js", ".json", ".node"],
      }
    ]
  },
  plugins: ['standard', 'node']
};
