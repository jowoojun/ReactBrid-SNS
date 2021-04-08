module.exports = {
  "paserOption":{
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures":{
      "jsx": true
    },
    "env":{
      "browser": true,
      "node": true,
      "es6": true
    },
    "extends": [
      "eslint: recommended",
      "plugin: react/recommended"
    ],
    "plugins":[
      "import",
      "react-hooks"
    ],
    "rules": {
      "indent": [
          "error",
          4
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
          "always"
      ]
    }
  }
}