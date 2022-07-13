const { getIterator } = require("core-js");

module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        // rootValue: (module) => ( /vant/getIterator.test(module.file)) ? 37.5 : 75,
        propList: ['*']
      }
    }
  }
  