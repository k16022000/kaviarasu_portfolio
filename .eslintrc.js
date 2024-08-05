module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // indent: ["error", 2, { SwitchCase: 1 }],
    "react/prop-types": "off",
    "react/jsx-max-props-per-line": [1, { maximum: 4 }],
    'react/no-unknown-property': 'off',
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
