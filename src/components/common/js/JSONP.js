/*
* Lightweight JSONP fetcher
* Copyright 2010-2012 Erik Karlsson. All rights reserved.
* BSD licensed
*/
/*
* Usage:
*
* JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
*   //do something with data, which is the JSON object you should retrieve from someUrl.php
* });
*/
let JSONP = function () {
  let counter = 0
  let head
  let window = this
  let config = {}
  function load (url, pfnError) {
    let script = document.createElement('script')
    let done = false
    script.src = url
    script.async = true
    let errorHandler = pfnError || config.error
    if (typeof errorHandler === 'function') {
      script.onerror = function (ex) {
        errorHandler({ url: url, event: ex })
      }
    }
    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true
        script.onload = script.onreadystatechange = null
        if (script && script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
    if (!head) {
      head = document.getElementsByTagName('head')[0]
    }
    head.appendChild(script)
  }
  function encode (str) {
    return encodeURIComponent(str)
  }
  function jsonp (url, params, callback, callbackName) {
    let query = (url || '').indexOf('?') === -1 ? '?' : '&'
    let key
    callbackName = (callbackName || config['callbackName'] || 'callback')
    let uniqueName = callbackName + '_json' + (++counter)
    params = params || {}
    for (key in params) {
      if (params.hasOwnProperty(key)) {
        query += encode(key) + '=' + encode(params[key]) + '&'
      }
    }
    window[uniqueName] = function (data) {
      callback(data)
      try {
        delete window[uniqueName]
      } catch (e) { }
      window[uniqueName] = null
    }
    load(url + query + callbackName + '=' + uniqueName)
    return uniqueName
  }
  function setDefaults (obj) {
    config = obj
  }
  return {
    get: jsonp,
    init: setDefaults
  }
}
export default {
  JSONP
}
