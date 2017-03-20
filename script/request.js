if (window.bhv === undefined) {
  window.bhv = {};
}

if (window.bhv.log === undefined) {
  window.bhv.log = function(txt) {
    if (console && console.log) {
      console.log(txt);
    }
  }
}

if (window.bhv.request === undefined) {
  window.bhv.request = {

    query: function(url, onsuccess, onerror) {

      if (!XMLHttpRequest) {
        bhv.log('XMLHttpRequest is not available!');
        return false;
      }

      var request = new XMLHttpRequest();
      if (!request || ! ("withCredentials" in request)) {
        bhv.log('XMLHttpRequest is not available!');
        return false;
      }

      function reqHandler(evtXHR) {
        if (request.readyState === 4 && request.status == 200) {
          onsuccess(request.responseText);
        }
      }

      function reqError(event) {
        bhv.log('Error handler called!');
        onerror();
      }

      // start request (add new timestamp to avoid any caching, sometimes there can be problems with appcache)
      var u = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'dummy=' + (new Date()).getTime();
      request.open('GET', u, true);
      request.onerror = reqError;
      request.onreadystatechange = reqHandler;
      request.send();

      return true;
    }
  }
}
