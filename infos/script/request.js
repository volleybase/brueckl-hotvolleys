function log(txt) {
  if (console && console.log) {
    console.log(txt);
  }
}

function getResults(id, handler) {
  if (id && Number.isFinite(id)) {
    var url = 'http://kvv.volleynet.at/volleynet/service/xml2.php?action=tabelle&bew_id=' + id;
    _doRequest(url, handler);
  }
}

function _doRequest(url, handler) {

  if (!XMLHttpRequest) {
    log('XMLHttpRequest is not available!');
    return false;
  }

  var request = new XMLHttpRequest();
  if (!request || ! ("withCredentials" in request)) {
    log('XMLHttpRequest is not available!');
    return false;
  }

  //#region -- some utilities -------------------------------------------------
  function fill(txt, len) {
    if (txt === undefined || txt === null || typeof txt !== 'string') {
      txt = '';
    }
    if (len < 0) {
      len *= -1;
      while (txt.length < len) {
        txt = ' ' + txt;
      }
    } else {
      while (txt.length < len) {
        txt += ' ';
      }
    }

    return txt.substr(0, len);
  }

  function find(list, name) {
    if (list && list.length) {
      for (var i = 0; i < list.length; ++i) {
        if (list[i].nodeName === name) {
          return list[i].textContent;
        }
      }
    }
    return '';
  }
  //#endregion -- some utilities ----------------------------------------------


  function reqHandler(evtXHR) {
    if (request.readyState === 4 && request.status == 200) {
      handler(request.responseText);
    }
  }

  function reqError(event) {
    log('Error handler called!');
  }

  // start request
  // oReq.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
  request.open('GET', url + '&dummy=' + (new Date()).getTime(), true);
  request.onerror = reqError;
  request.onreadystatechange = reqHandler;
  request.send();

  return true;
}
