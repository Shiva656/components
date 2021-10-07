
module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "https://qa.appup.com",
        secure: false,
        headers:
        {
           "Appup-Auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRyYWluaW5naGVscGVyc0B5b3BtYWlsLmNvbSIsInVzZXJfaWQiOiIwIiwiZXhwaXJ5X3RpbWUiOiJUaHUsIDAyIEp1bCAyMDIwIDE1OjUwOjEyIEdNVCJ9.z-R_Fvg4FpjlYh9_aGi2yW8rUqpZ1kBSncDnILtTMeQ"
        },
        ws: false
      }
    }
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },  
  runtimeCompiler: true,
  baseUrl: "/",
  productionSourceMap: false
};