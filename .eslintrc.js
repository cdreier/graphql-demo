
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    },
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "plugins": [
    "classes",
    "flowtype"
  ],
  "rules": {
    "classes/space": 2,
    "classes/name": [2, "class", "method"],
    "classes/style": 2,
    "strict": 0,
    "prefer-const": "error",
    "brace-style": "error",
    "new-cap": ["error",
      { "newIsCap": true }
    ],
    "block-spacing": "error",
    "keyword-spacing":"error",
    "no-irregular-whitespace": "error",
    "space-in-parens": ["error", "never"],
    "space-unary-ops": "error",
    "space-before-function-paren": ["error", "never"],
    "no-multi-spaces": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "computed-property-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "no-lonely-if": "error",
    "no-mixed-spaces-and-tabs": "error",
    "space-infix-ops": "error",
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "arrow-spacing": [
      "error"
    ],
  }
};

