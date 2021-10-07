// var DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "https://qa.appup.com",
        secure: false,
        headers:
        {
          "Appup-Auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRyYWluaW5naGVscGVyc0B5b3BtYWlsLmNvbSIsInVzZXJfaWQiOiIwIiwiZXhwaXJ5X3RpbWUiOiJNb24sIDAyIERlYyAyMDE5IDE3OjA1OjU0IEdNVCJ9.lKHFMvkpE_TsbbbGWn-Mv6C00vslU1tx12RWcbtuTM8",
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRyYWluaW5naGVscGVyc0B5b3BtYWlsLmNvbSIsInVzZXJfaWQiOiIwIiwiZXhwaXJ5X3RpbWUiOiJNb24sIDAyIERlYyAyMDE5IDE3OjA1OjU0IEdNVCJ9.lKHFMvkpE_TsbbbGWn-Mv6C00vslU1tx12RWcbtuTM8",
          "cookieDomainRewrite": ".appup.com"
        },
        ws: false
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 1000,
        maxSize: 250000
      }
    }
  },
  productionSourceMap: false,
  baseUrl: '/',
  runtimeCompiler: true
};
//baseUrl:'https://s3.ap-south-1.amazonaws.com/cdn-mumbai.appup.com/prod/v0-55a/',