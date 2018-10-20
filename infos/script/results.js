var map = {
  'u10': [20234, kidsResultFinal, 'Endergebnis U10 mixed'],

  'u11w': [20148, kidsResultFinal, 'Endergebnis U11 weiblich'],
  'u11m': [20151, kidsResultFinal, 'Endergebnis U11 männlich'],

  'u12w': [19790, kidsResultFinal, 'Endergebnis U12 weiblich'],
  'u12m': [19792, kidsResultFinal, 'Endergebnis U12 männlich'],

  'u13w': [19907, kidsResultFinal, 'Endergebnis U13 weiblich'],
  'u13m': [19910, kidsResultFinal, 'Endergebnis U13 männlich'],

  'u15w': [19899, kidsResultFinal, 'Endergebnis U15 weiblich'],
  'u15m': [19902, kidsResultFinal, 'Endergebnis U15 männlich'],


  'br4_1': [19501, leagueResult, 'Endstand Unterliga Frühjahrsrunde'],
  'br4_2': [20173, leagueResult, 'Endergebnis Unterliga'],

  'br3_1': [18839, leagueResult, 'Endstand Unterliga Grunddurchgang'],
  'br3_2': [19500, leagueResult, 'Endstand Landesliga Aufstiegsrunde'],
  'br3_3': [20172, leagueResult, 'Endergebnis Landesliga'],

  'br2_1': [18830, leagueResult, 'Endstand Landesliga Grunddurchgang'],
  'br2_2': [20172, leagueResult, 'Endergebnis Landesliga']
};

function _getTitle(date) {

  var key = _getKey();

  if (map && map[key] && map[key][2]) {

    var tit = '<b>' + map[key][2];

    if (date && date instanceof Date) {
      var m = date.getMinutes();
      tit += ' (' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' '
          + date.getHours() + ':' + (m < 10 ? '0' + m : m) + ')';
    }

    tit += '</b>\n';

    return tit;
  }

  return '';
}

function _fill(txt, len) {
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

function _find(list, name) {
  if (list && list.length) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i].nodeName === name) {
        return list[i].textContent;
      }
    }
  }
  return '';
}

/**
 * Creates the results for a junior chamionship.
 * @param {string} reponse The response from the web service.
 * @return {void}
 */
function kidsResult(response) {
  _kidsResult(response, true);
}
/**
 * Creates the final results for a junior chamionship.
 * @param {string} reponse The response from the web service.
 * @return {void}
 */
function kidsResultFinal(response) {
  _kidsResult(response, false);
}

/**
 * Creates the results for a junior chamionship.
 * @param {string} reponse The response from the web service.
 * @param {boolean} withPoints True to show the current points for results of
 * qualification, false to show the final results.
 * @return {void}
 */
function _kidsResult(response, withPoints) {

  // create xml data
  var xml = _getXml(response);
  if (xml) {

    // get list of results
    var list = xml.getElementsByTagName('tabelle');
    if (list && list.length) {

      // create text
      var msg = _fill('', 47) + (withPoints ? 'P  T\n' : '\n');
      for (var i = 0; i < list.length; ++i) {
        msg += _fill('' + (i + 1), -2) + '. '
            + _fill(_find(list[i].childNodes, 'tea_name'), 40)
            + (withPoints
              ? _fill(_find(list[i].childNodes, 'punkte'), -4)
                + _fill(_find(list[i].childNodes, 'gespielt'), -3)
              : '')
            + "\n";
      }

      // save data for offline mode
      _save(_getTitle(new Date()) + msg);

      // add created text to page
      _inject(_getTitle() + msg);
    }
  }
}

/**
 * Creates the results for a league.
 * @param {string} reponse The response from the web service.
 * @return {void}
 */
function leagueResult(response) {

  // create xml data
  var xml = _getXml(response);
  if (xml) {

    // get list of results
    var list = xml.getElementsByTagName('tabelle');
    if (list && list.length) {

      // create text
      var msg = _fill('', 51) + 'S/N  Sätze   Punkte\n'
          + _fill('', 45) + 'Sp.  +  -   +  -    +   -  P\n';
      for (var i = 0; i < list.length; ++i) {
        msg += _fill('' + (i + 1), -2) + '. '
            + _fill(_find(list[i].childNodes, 'tea_name'), 40)
            + _fill(_find(list[i].childNodes, 'gespielt'), -3)
            + _fill(_find(list[i].childNodes, 'gewonnen'), -4)
            + _fill(_find(list[i].childNodes, 'verloren'), -3)
            + _fill(_find(list[i].childNodes, 'satzgewonnen'), -4)
            + _fill(_find(list[i].childNodes, 'satzverloren'), -3)
            + _fill(_find(list[i].childNodes, 'punktgewonnen'), -5)
            + _fill(_find(list[i].childNodes, 'punktverloren'), -4)
            + _fill(_find(list[i].childNodes, 'punkte'), -3) + "\n";
      }

      // save data for offline mode
      _save(_getTitle(new Date()) + msg);
      // add created text to page
      _inject(_getTitle() + msg);
    }
  }
}

/**
 * Creates a xml document from the response text.
 * @param {string} reponse The response from the web service.
 * @return {DOMDocument} The xml document.
 */
function _getXml(response) {

  try {
    // check
    if (window.DOMParser)
    {
      // create the parser, if ok, parse xml document from text and return it
      parser = new DOMParser();
      if (parser) {
        return parser.parseFromString(response, "text/xml");
      }
    }
  } catch (err) {}

  // simple error handling
  bhv.log("Cannot parse results!");
  return null;
}

/**
 * Add the results to the page.
 * @param {string} txt The text to add.
 * @return {void}
 */
function _inject(txt) {
  var div = document.getElementById('content');
  div.innerHTML = txt;
}

function _save(txt) {
  // store data for offline reading
  bhv.db.set('result:' + _getKey(), txt);
}

/**
 * Starts the loading of the results.
 * @return {void}
 */
function getResults() {
  var ok = false;

  var key = _getKey();

  if (map && map[key]) {
    var id = map[key][0];
    if (!id || !Number.isFinite(id)) {
      bhv.log('Invalid id ' + id + '!');
    } else {

      var url = 'http://kvv.volleynet.at/volleynet/service/xml2.php?action=tabelle&bew_id=' + id;
      bhv.request.query(url, map[key][1], getResultsOffline);
      ok = true;
    }
  }

  if (!ok) {
    _inject('Ungültige Tabelle!');
  }
}

function _getKey() {
  var key = '?';

  var parts = location.search.substring(1).split('&');
  if (parts.length == 1) {
    parts = parts[0].split('=');
    if (parts.length == 2) {
      key = parts[1];
    }
  }

  return key;
}

function getResultsOffline() {
  var key = _getKey();
  if (key !== '?') {
    var txt = bhv.db.get('result:' + key);
    if (txt) {
      _inject(txt);
    }
  }
}
