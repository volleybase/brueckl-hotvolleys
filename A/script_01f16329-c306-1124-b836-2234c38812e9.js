(function(){
/**
 * Selects the first matching dom element.
 * @param {string} selector The selector of the element.
 * @param {DOMElement} parent The optional root of the search (default: document).
 * @returns DOMElement The first matching DOM element.
 */
function $(selector, parent) {
  return (parent ? parent : document).querySelector(selector);
}

/**
 * Selects DOMElements.
 * @param {string} selector The selector of the DOMElements.
 * @param {DOMElement} parent The optional root of the search (default: document).
 * @returns {NodeList} The list of matching DOMElements.
 */
function $$(selector, parent) {
  return (parent ? parent : document).querySelectorAll(selector);
}

/**
 * Connects an event handler to a given DOMElement.
 * @param {DOMElement} elem The DOMElement to handle.
 * @param {string} event The name of the event to handle.
 * @param {Function} handler The event handler.
 * @returns {void}
 */
function $event(elem, event, handler) {
  elem.addEventListener(event, handler);
}
//-- create menu script -------------------------------------- (vvv) --
// --- ios helper --------------------------------- vv ---
var timer = null,
    cmPosX = -1000,
    cmPosY = -1000;

function touchstart(e) {
  cmPosX = e.touches[0].clientX;
  cmPosY = e.touches[0].clientY;
  touchend();
  if (e.touches.length === 1) {
    timer = setTimeout(function() { onlongtouch(cmPosX, cmPosY); }, 800);
  }
}

function touchmove(e) {
  if (timer) {
    if (Math.abs(cmPosX - e.touches[0].clientX) > 5 ||
        Math.abs(cmPosY - e.touches[0].clientY) > 5) {
      touchend();
    }
  }
}

function touchend() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function onlongtouch(x,y){
  timer = null;
  showContextMenu(x, y);
}

$event(document, 'touchstart', touchstart);
$event(document, 'touchend', touchend);
$event(document, 'touchmove', touchmove);
// --- ios helper --------------------------------- ^^ ---/* global $$ */
var cm, bg,
    cmInitialized = false,
    contextmenu = false;

function onContextMenu(event) {
  event.preventDefault();

  // ignore clicks outside of svg area
  var svg = _getSvgImg();
  if (!svg || !svg.contains(event.target)) {
    return;
  }

  // InternalError is unique for firefox - old firefox needs different handling of position when scrolled
  var isFirefox = !!window.InternalError,
      x = isFirefox ? event.pageX : event.clientX,
      y = isFirefox ? event.pageY : event.clientY;
  showContextMenu(x, y);
}

function _getSvgImg() {
  var svg = $('div.img > svg');
  if (!svg) {
    svg = $('svg');
  }
  return svg;
}

function showContextMenu(x, y) {
  // show context menu if not visible
  if (!contextmenu) {
    contextmenu = true;

    /**
     * Switch an option state.
     * @param {NodeList} elems A list of html elements.
     * @returns {void}
     */
    var setOpts = function(elems) {
      if (elems) {
        for (var i = 0, i2 = elems.length; i < i2; ++i) {
          var elem = elems[i],
              elemP = elem.parentNode;

          if (elemP.dataset && elemP.dataset.item) {
            var key = elemP.dataset.item;
            if (option.data[key] === true || option.data[key] === false) {
              elem.style.display = option.data[key] ? 'block' : 'none';
     	    }
          }
        }
      }
    };

    // handle all options: radios and checkboxes
    var rbs = document.getElementsByClassName('rb2'),
        cbs = document.getElementsByClassName('cb2');
    setOpts(rbs);
    setOpts(cbs);

    // show background + context menu
    cm.style.display = 'block';
    bg.style.display = 'block';

    if (!cmInitialized) {
      cmInitialized = true;
      var box = cm.getBBox(),
          w = Math.floor(box.width) + 10;
      if (w > 200) {
        var rcMenuBg = cm.querySelector('rect'),
            rcsMi = cm.querySelectorAll('g.menuitem > rect.bg'),
            smis = cm.querySelectorAll('g.submenuitem');
        if (rcMenuBg) {
          rcMenuBg.style.width = (w + 4) + 'px';
        }
        if (rcsMi) {
          rcsMi.forEach((rcMi) => rcMi.style.width = w + 'px');
        }
        if (smis) {
          smis.forEach((smi) => {
            smi.querySelector('rect.bg').style.width = w + 'px';
            smi.querySelector('g.submenu').setAttribute('transform', 'translate(' + (w + 4) + ' 0)');
            smi.querySelector('path.marker_submenu').setAttribute('transform', 'translate(' + (w - 204) + ' 0)');

            // TODO separators
            // TODO extra handling for submenus
          });
        }
      }
    }

    var svg = _getSvgImg(), pt, svgP;
    try {
      // transform point to SVG coordinates
      pt = new DOMPoint(x,y);
      svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    } catch {
      // old browsers: create SVG point, set pos, transform to SVG coordinates
      pt = svg.createSVGPoint();
      pt.x = x;
      pt.y = y;
      svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    cm.setAttribute('transform', 'translate(' + svgP.x + ' ' + svgP.y + ') scale(1.95)');
  }
}

function onClick(event) {
  if (contextmenu) {
    contextmenu = false;
    cm.style.display = 'none';
    bg.style.display = 'none';

    var node = event.target;
    while (node) {
      if (node.dataset && node.dataset.item) {
        if (node.parentNode
            && node.parentNode.parentNode
            && node.parentNode.parentNode.dataset
            && node.parentNode.parentNode.dataset.group) {
          option.reset(node.parentNode.parentNode.dataset.group);
        }

        option.set(node.dataset.item);
        node = null;
      } else {
        node = node.parentNode;
      }
    }
  }
}

var option = {
  data: {
    'ID_window_editor_control_graphics_actor_actor_Actor_option_anlauf': true,
    'ID_window_editor_control_graphics_actor_actor_Actor_option_info': true
  },

  // the current state info
  _current: {
  },

  // TODO animation, effects
  // the connected animation info
  'animator': undefined,
  'animation0': undefined,
  // the connected effects handler
  effects: null,

  reset: function(keys) {
    if (typeof keys === 'string') {
      var keys2 = keys.split(',');
      if (Array.isArray(keys2)) {
        for (var i = 0, i2 = keys2.length; i < i2; ++i) {
          this.data[keys2[i]] = false;
          this._updateElems(keys2[i], false);
        }
      }
    }
  },

  set: function(key) {
    this.data[key] = !this.data[key];
    this._updateElems(key);
  },

  init: function() {
    for (var key in this.data) {
      
      this._updateElems(key);
    }
  },

  getCurrent: function(id) {
    if (this._current[id] !== undefined) {
      return this._current[id];
    }
    return true;
  },

  _updateElems: function(key, state) {
    var state0 = state === undefined ? this.data[key] : state;

    // items that reflect the state
    var elems = $$('[data-option="' + key + '"]');
    if (elems) {
      for (var i = 0, i2 = elems.length; i < i2; ++i) {
        var elem = elems[i],
            st = state0;
        if (elem.id && this.animation0 && this.animation0[elem.id]
            && this.animation0[elem.id]['visible-common'] !== undefined) {
          st = !!this.animation0[elem.id]['visible-common'];
        }
        elem.style.display = st ? "block" : "none";
        if (elem.id) {
          this._current[elem.id] = st;
        }
      }
    }

    // items that reflect the inverted state
    elems = $$('[data-option="' + key + '_not"]');
    if (elems) {
      for (var i = 0, i2 = elems.length; i < i2; ++i) {
        var elem = elems[i],
            st = state0;
        if (elem.id && this.animation0 && this.animation0[elem.id]
            && this.animation0[elem.id]['visible-common'] !== undefined) {
          st = !!this.animation0[elem.id]['visible-common'];
        }
        elem.style.display = st ? "none" : "block";
        if (elem.id) {
          this._current[elem.id] = !st;
        }
      }
    }
  }
};

option.init();

cm = $('#contextmenu');
bg = $('#contextmenu_bg');
$event(document, 'contextmenu', onContextMenu);
$event(bg, 'click', onClick);
$event(cm, 'click', onClick);

// init size of context submenu items (because of text size)
$$('g.submenuitem').forEach((sub) => {
  $event(sub, 'mouseenter', () => {
    var txts = $$('g.submenu > g.menuitem > text');
    // 200 size of menu item + 2px width border, 30 is left of text field
    var len = 170;
    txts.forEach((txt) => len = Math.max(len, Math.ceil(txt.getBBox().width + 5)));
    if (len > 170) {
      var first = true;
      txts.forEach((txt) => {
        if (first) {
          var rc = $('rect', txt.parentNode.parentNode);
          rc.style.width = (len + 34) + 'px';
          first = false;
        }
        var rc = $('rect', txt.parentNode);
        rc.style.width = (len + 30) + 'px';
      });
    }
  });
});

//-- create menu script -------------------------------------- (^^^) --
/* global animator, animation0 */

/**
 * The effects data and handler.
 */
var effects = {
  /**
   * The effect infos.
   */
  'infos': {
  "ball_130": {
    "topMost": {
      "common": true,
      "hover": true,
      "active": true,
      "activehover": true
    }
  },
  "path_131": {
    "stroke": {
      "common": "#b22222",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "stroke-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_132": {
    "stroke": {
      "common": "#b22222",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "stroke-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "path_133": {
    "stroke": {
      "common": "#000000",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "0.5",
      "active": "0.5",
      "activehover": "0.5"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_134": {
    "stroke": {
      "common": "#000000",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "0.5",
      "active": "0.5",
      "activehover": "0.5"
    },
    "toFront": {
      "hover": true
    }
  },
  "rectangle_135": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "text_136": {
    "fill": {
      "common": "#444444",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_137": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_140": {
    "fill": {
      "common": "#d3d3d3",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "text_141": {
    "fill": {
      "common": "#000000",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_142": {
    "stroke": {
      "common": "#b22222",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "stroke-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_143": {
    "stroke": {
      "common": "#000000",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "0.5",
      "active": "0.5",
      "activehover": "0.5"
    },
    "toFront": {
      "hover": true
    }
  },
  "rectangle_144": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "text_145": {
    "fill": {
      "common": "#444444",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_146": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_149": {
    "fill": {
      "common": "#d3d3d3",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "text_150": {
    "fill": {
      "common": "#000000",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_151": {
    "stroke": {
      "common": "#b22222",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "stroke-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_152": {
    "stroke": {
      "common": "#000000",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "0.5",
      "active": "0.5",
      "activehover": "0.5"
    },
    "toFront": {
      "hover": true
    }
  },
  "rectangle_153": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "text_154": {
    "fill": {
      "common": "#444444",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_155": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_158": {
    "fill": {
      "common": "#d3d3d3",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "text_159": {
    "fill": {
      "common": "#000000",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_160": {
    "stroke": {
      "common": "#b22222",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "stroke-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "arrow_161": {
    "stroke": {
      "common": "#000000",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "0.5",
      "active": "0.5",
      "activehover": "0.5"
    },
    "toFront": {
      "hover": true
    }
  },
  "rectangle_162": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "text_163": {
    "fill": {
      "common": "#444444",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_164": {
    "fill": {
      "common": "#808080",
      "hover": "#ffff00",
      "active": "#ffff00",
      "activehover": "#ffff00"
    },
    "fill-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "stroke": {
      "common": "#696969",
      "hover": "#ffa500",
      "active": "#ffa500",
      "activehover": "#ffa500"
    },
    "stroke-opacity": {
      "common": "1",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    }
  },
  "rectangle_167": {
    "fill": {
      "common": "#d3d3d3",
      "hover": "#d3d3d3",
      "active": "#d3d3d3",
      "activehover": "#d3d3d3"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  },
  "text_168": {
    "fill": {
      "common": "#000000",
      "hover": "#b22222",
      "active": "#b22222",
      "activehover": "#b22222"
    },
    "fill-opacity": {
      "common": "0",
      "hover": "1",
      "active": "1",
      "activehover": "1"
    },
    "toFront": {
      "hover": true
    }
  }
},
  /**
   * The grouping infos.
   */
  'groups': {
  "byId": {
    "arrow_160": "grp_3",
    "arrow_161": "grp_3",
    "rectangle_162": "grp_3",
    "text_163": "grp_3",
    "rectangle_164": "grp_3",
    "image_165": "grp_3",
    "image_166": "grp_3",
    "rectangle_167": "grp_3",
    "text_168": "grp_3",
    "arrow_142": "grp_4",
    "arrow_143": "grp_4",
    "rectangle_144": "grp_4",
    "text_145": "grp_4",
    "rectangle_146": "grp_4",
    "image_147": "grp_4",
    "image_148": "grp_4",
    "rectangle_149": "grp_4",
    "text_150": "grp_4",
    "path_131": "grp_6",
    "arrow_132": "grp_6",
    "path_133": "grp_6",
    "arrow_134": "grp_6",
    "rectangle_135": "grp_6",
    "text_136": "grp_6",
    "rectangle_137": "grp_6",
    "image_138": "grp_6",
    "image_139": "grp_6",
    "rectangle_140": "grp_6",
    "text_141": "grp_6",
    "arrow_151": "grp_1",
    "arrow_152": "grp_1",
    "rectangle_153": "grp_1",
    "text_154": "grp_1",
    "rectangle_155": "grp_1",
    "image_156": "grp_1",
    "image_157": "grp_1",
    "rectangle_158": "grp_1",
    "text_159": "grp_1"
  },
  "byName": {
    "grp_3": [
      "arrow_160",
      "arrow_161",
      "rectangle_162",
      "text_163",
      "rectangle_164",
      "image_165",
      "image_166",
      "rectangle_167",
      "text_168"
    ],
    "grp_4": [
      "arrow_142",
      "arrow_143",
      "rectangle_144",
      "text_145",
      "rectangle_146",
      "image_147",
      "image_148",
      "rectangle_149",
      "text_150"
    ],
    "grp_6": [
      "path_131",
      "arrow_132",
      "path_133",
      "arrow_134",
      "rectangle_135",
      "text_136",
      "rectangle_137",
      "image_138",
      "image_139",
      "rectangle_140",
      "text_141"
    ],
    "grp_1": [
      "arrow_151",
      "arrow_152",
      "rectangle_153",
      "text_154",
      "rectangle_155",
      "image_156",
      "image_157",
      "rectangle_158",
      "text_159"
    ]
  }
},

  'ids': null,
  'clicked': null,
  'hover': [],

  // the current style group for the controls - necessary for e.g. visibility in animations
  'current': {},
  'animator': undefined,
  'animation0': undefined,
  // TODO: the connected options handler
  option: null,


  'topMostList': {
    'common': [],
    'active': [],
    'hover': [],
    'activehover': []
  },

  /**
   * Initializes the effects info.
   */
  'init': function() {
    // the ids of all controls with effects
    this.ids = Object.keys(this.infos);
    // connect event handling
    $event($('svg'), 'click', this.onClick.bind(this));
    $event($('svg'), 'mouseover', this.onMouseOver.bind(this));
    $event($('svg'), 'mouseout', this.onMouseOut.bind(this));

    // prepare topmost handling
    this.ids.forEach((id) => {
      var info = this.infos[id];
      if (info && info['topMost']) {
        var tm = info['topMost'];
        if (tm['common']) this.topMostList.common.push(id);
        if (tm['active']) this.topMostList.active.push(id);
        if (tm['hover']) this.topMostList.hover.push(id);
        if (tm['activehover']) this.topMostList.activehover.push(id);
        delete info['topMost'];
      }
    });

    const keys = this.infos ? Object.keys(this.infos) : [];
    if (this.animation0) {
      const keys2 = Object.keys(this.animation0);
      keys2.forEach((key2) => {
        if (keys.indexOf(key2) === -1) {
          keys.push(key2);
        }
      });
    }
    keys.forEach((key) => {
      this.setStyle2($('#' + key), key, "common");
    });

    return this;
  },

  /**
   * Handles a click event to set the active style effects.
   *
   * @param {Event} event The event info.
   * @returns void
   */
  'onClick': function(event) {
    var id = event.target.id,
        id2 = null,
        oldClicked = this.clicked;
    if ((!id || this.ids.indexOf(id) < 0) && event.target.parentNode) {
      id = event.target.parentNode.id;
    }

    if (id && this.ids.indexOf(id) >= 0) {
      id2 = this.groups.byId[id] ? "g" + this.groups.byId[id] : "i" + id;
    }

    // reset if any old
    if (oldClicked) {
      this.setStyle(oldClicked, this.hover.indexOf(oldClicked) >= 0 ? "hover" : "common");
      this.clicked = null;
    }

    // set new clicked item
    if (id2 && id2 !== oldClicked) {
      this.clicked = id2;
      this.setStyle(id2, this.hover.indexOf(id2) >= 0 ? "activehover" : "active");
    }
  },

  /**
   * Handles a mouse over event to set the hover style effects.
   *
   * @param {Event} event The event info.
   * @returns void
   */
  'onMouseOver': function(event) {
    var id = event.target.id, id2;
    if ((!id || this.ids.indexOf(id) < 0) && event.target.parentNode) {
      id = event.target.parentNode.id;
    }

    if (id && this.ids.indexOf(id) >= 0) {
      id2 = this.groups.byId[id] ? "g" + this.groups.byId[id] : "i" + id;

      if (this.hover.indexOf(id2) < 0) {
        this.hover.push(id2);
        this.setStyle(id2, this.clicked === id2 ? "activehover" : "hover");
      }
    }
  },

  /**
   * Handles a mouse leave event to set the hover style effects.
   *
   * @param {Event} event The event info.
   * @returns void
   */
  'onMouseOut': function(event) {
    var id = event.target.id, id2;
    if ((!id || this.ids.indexOf(id) < 0) && event.target.parentNode) {
      id = event.target.parentNode.id;
    }

    if (id && this.ids.indexOf(id) >= 0) {
      id2 = this.groups.byId[id] ? "g" + this.groups.byId[id] : "i" + id;

      var pos = this.hover.indexOf(id2);
      if (pos >= 0) {
        this.hover.splice(pos, 1);
        this.current[id2] = this.clicked === id2 ? "active" : "common";
        this.setStyle(id2, this.clicked === id2 ? "active" : "common");
      }
    }
  },

  /**
   * Sets the styles to set the effects.
   * @param {string} id2 The id of the elem to style.
   * @param {string} key The key of the style to use.
   * @returns void
   */
  'setStyle': function(id2, key) {
    var type = id2.charAt(0),
        id = id2.substr(1);

    if (type === 'g') {
      var items = this.groups.byName[id];
      if (items) {
        items.forEach((item) => this.setStyle('i' + item, key));
      }
    } else if (type === 'i') {
      this.current[id] = key;
      this.setStyle2($('#' + id), id, key);
     }

     // handle topmost list
     if (this.topMostList[key]) {
       this.topMostList[key].forEach((id) => this._toFront($('#' + id)));
     }
  },

  /**
   * Sets the styles to set the effects.
   * @param {Element} elem Th eelem to style.
   * @param {string} id The name of the styles to get.
   * @param {string} key The key of the style to use.
   * @returns void
   */
  'setStyle2': function(elem, id, key) {
    if (!elem || !elem.tagName) {
      return;
    }

    // handle groups
    if (elem.tagName === 'g') {
      // to front
      var info = this.infos[id];
      if (info && Object.keys(info).indexOf('toFront') >= 0) {
        elem = this._toFront(elem);
      }
      var children = elem.children;
      for (var i = 0; i < children.length; ++i) {
        this.setStyle2(children[i], id, key);
      }
    } else {
      // set style of item
      var info = this.infos[id];
      if (info) {
        Object.keys(info).forEach((name) =>  {
          if ("toFront" !== name) {
            elem.style[name] = info[name][key];
          } else if (elem.id === id) {
            this._toFront(elem);
          }
        });
      }

      // if not done with animation (handle: visibility)
      if (!this.animator || !this.animator.isActive()) {
        if (this.animation0 && this.animation0[id]
            && this.animation0[id]['visible-' + key] !== undefined) {
          elem.style.display = this.animation0[id]['visible-' + key] ? 'block' : 'none';
        }
      }
    }
  },

  '_toFront': function(elem) {
    if (elem) {
      // https://stackoverflow.com/questions/6566406/svg-re-ordering-z-index-raphael-optional
      // https://developer.mozilla.org/de/docs/Web/API/Node/insertBefore
      return elem.parentNode.appendChild(elem);
    }
    return elem;
  }
};

if (typeof animator !== 'undefined') {
  animator.effects = effects;
  effects.animator = animator;
}
if (typeof animation0 !== 'undefined') {
  effects.animation0 = animation0;
}

effects.init();
/* global option, animation0 */

if (typeof option !== 'undefined' && typeof animation0 !== 'undefined') {
  option.animation0 = animation0;
}
}());