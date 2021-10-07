/**
 * @Ajax plugin - Wrapper for Ajax Library - Axios
 * Also used for intercepting Ajax get calls and cache data in browser.
 * Send etag header in the request to check if the content is modified.
 */
import Vue from 'vue'
import axios from 'axios'
import localforage from 'localforage'
import qs from 'qs'

let httpLib = {}
httpLib.install = (Vue, options) => {
  const ajaxlib = axios.create(options)
  var ajaxstore = localforage.createInstance({
      name: "ajaxcache"
  })

  Vue.prototype.$ajaxlib = {
    ...ajaxlib,
    getCached: (url, data, getoptions) => {
      //var baseURL = ajaxlib.baseURL
      //baseURL = baseURL ? baseURL : ""
      var itemKey = url + qs.stringify(ajaxlib.params, {arrayFormat: 'repeat'})
      return ajaxstore.getItem(itemKey).then(itemValue => {
          if (itemValue) {
              console.log("Cache data: " + itemKey + " - " + JSON.stringify(itemValue))
              ajaxlib.headers = ajaxlib.headers ? ajaxlib.headers : {}
              ajaxlib.headers["If-None-Match"] = itemValue.etag
          } else {
              console.log("Missing data in cache")
          }
          let ajaxOptions = Object.assign({}, getoptions, {method: 'get', url: url, params: data})      
          return ajaxlib(ajaxOptions).catch((err) => {
                  console.log('Error in Ajax call: ' + JSON.stringify(err))
                  //Network Failure. For offline access, create response object served from cache data.
                  if (itemValue) {
                      let response = {}
                      response.data = itemValue.data
                      return Promise.resolve(response)      
                  } else {
                      //Throw error, if cache data too is missing
                      return Promise.reject(err) 
                  }   
          })
      }).catch((err) => {
          console.log('Error in getCached: ' + JSON.stringify(err))
          return Promise.reject(err)      
      })
    }
  }

  ajaxlib.interceptors.response.use(function (response) {
    console.log('Response String: ' + JSON.stringify(response));
    var responseData = response.data
    var newEtag = response.headers["etag"]
    var itemKey = response.config.url
    ajaxstore.getItem(itemKey).then(itemValue => {
        console.log("Existing cache data for: " + response.config.url + " - " + JSON.stringify(itemValue))
        if (itemValue && (newEtag == itemValue.etag)) {
            console.log("ETAGs matches, returning from cache.")
            if (response.status >= 300 && response.status < 400) {
                response.data = itemValue.data
                return response
            } 
        } else {
            console.log("ETAGs do not match, returning from network.")
        }
    }).catch((err) => {
        console.log('Error in response interceptor: ' + JSON.stringify(err))
        return Promise.reject(err)
    })
    if (response.status == 200) {
        console.log("Sending response back")
        ajaxstore.setItem(response.config.url, {etag: newEtag, data: responseData}) 
        return response; 
    }  
  })
}
Vue.use(httpLib)
export default httpLib