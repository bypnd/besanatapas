module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
  },
  "rules": {
    "indent": [2, 2, { "SwitchCase": 1 }],
    "quotes": [2, "single"],
    "linebreak-style": [2, "unix"],
    "semi": [2, "never"],
    "jsx-quotes": 1,
    // extra react rules not enabled by default
    "react/forbid-prop-types": 1,
    "react/jsx-closing-bracket-location": [1, "after-props"],
    //"react/jsx-handler-names": 0,
    "react/jsx-indent-props": [1, 2],
    "react/jsx-indent": [1, 2],
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": [1, { "maximum": 3 }],
    "react/jsx-no-bind": 1,
    "react/jsx-pascal-case": 1,
    "react/sort-prop-types": 1,
    //"react/jsx-sort-props": 1,
    "react/jsx-space-before-closing": [1, "always"],
    "react/no-multi-comp": 1,
    "react/no-set-state": 1,
    "react/no-string-refs": 1,
    "react/prefer-es6-class": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/wrap-multilines": 1
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ]
}
