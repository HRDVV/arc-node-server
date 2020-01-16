module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended", 
    "plugin:node/recommended", 
    "plugin:jest/recommended"
  ],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    "quotes": [2, "single"],
    "semi": [2, "never"],
    "object-curly-spacing": [2, "always"],
    "no-await-in-loop": 2,
    "no-template-curly-in-string": 2,
    "require-await": 2,
    "wrap-iife": [2, "outside"],
    "no-shadow": 2,
    "no-use-before-define": 2,
    "array-bracket-spacing": [2, "never"],
    "block-spacing": [2, "always"],
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "func-call-spacing": [2, "never"],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "key-spacing": 2,
    "space-before-blocks": 2,
    "generator-star-spacing": [2, { "before": false, "after": true }],
    "no-duplicate-imports": 2,
    "template-curly-spacing": [2, "always"],
    "space-infix-ops": 2,
    "space-unary-ops": 2,
    "arrow-spacing": 2,
    "comma-spacing": 2,
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "node/no-unsupported-features/es-syntax": "off"
  }
}
