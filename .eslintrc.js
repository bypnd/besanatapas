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
    "react/display-name": 1,
    "react/forbid-prop-types": 1,
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "react/jsx-curly-spacing": 1,
    "react/jsx-equals-spacing": 1,
    //"react/jsx-handler-names": 0,
    "react/jsx-indent-props": [1, 2],
    "react/jsx-indent": [1, 2],
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": [1, { "maximum": 3 }],
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 1,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "jsx-quotes": 1,
    "react/jsx-sort-prop-types": 1,
    "react/jsx-sort-props": 1,
    //"react/jsx-space-before-closing": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    //"react/no-danger": 0,
    "react/no-deprecated": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-is-mounted": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 1,
    "react/no-string-refs": 1,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/wrap-multilines": 1
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "eslint:recommended",
  "plugins": [
    "react"
  ]
}
