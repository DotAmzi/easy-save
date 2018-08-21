module.exports = {
	"extends": [
		"standard"
	],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": false
    }
  },
  "plugins": [
    "standard",
		"node"
  ],
  "env": {
    "browser": false,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "globals": {
    "spyOn": false,
    "inject": false,
    "expect": false,
    "beforeEach": false,
    "jasmine": false,
    "PouchDB": false,
    "cordova": true
  },
  "rules": {
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
      ],
			"node/no-extraneous-require": ["error", {
          "allowModules": []
      }],
			"node/no-missing-require": ["error", {
          "allowModules": [],
          "tryExtensions": [".js", ".json", ".node"]
      }],
			"camelcase": ["error", {"properties": "always"}],
			"no-console": "warn"
  }
};