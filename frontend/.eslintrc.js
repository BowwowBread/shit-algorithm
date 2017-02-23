module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6 : true
  },

  extends: [
    'airbnb-base'
  ],
  plugins: [
    'html','import'
  ],
  'rules': {
    'no-alert' : 0, // no-alert error disable
    'no-console' : 0, // no-console error disable
    'no-undef' : 0, // no-undef warning disable
    
  },
  "settings": {
    "ecmascript": 6,
    "import/parser": "webpack",
    "import/parser": "babel-eslint",
    "import/resolver": {"node": {"extensions": [".js", ".vue"]}},
  },
}
