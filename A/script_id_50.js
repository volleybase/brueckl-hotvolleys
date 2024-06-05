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
 * @param {Function} handler The ebvent handler.
 * @returns {void}
 */
function $event(elem, event, handler) {
  elem.addEventListener(event, handler);
}
/**
 * The effects data and handler.
 */
var effects = {
  
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
    return this;
  },
  
  /**
   * The effect infos.
   */
  'infos': {
  "path_1": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_2": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_3": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "arrow_4": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_5": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_6": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_7": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_8": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_9": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_10": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_11": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "arrow_12": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_13": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_14": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_15": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_16": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_17": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_18": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_19": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "arrow_20": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_21": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_22": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_23": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_24": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "text_25": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_26": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_27": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_28": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_29": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_30": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_31": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_32": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_33": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_34": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_35": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_36": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_37": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_38": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_39": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_40": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_41": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_42": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_43": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_44": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_45": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_46": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "arrow_47": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_48": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_49": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_50": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_51": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "text_52": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_53": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "arrow_54": {
    "stroke": {
      "common": "#b2222201",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "path_55": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "arrow_56": {
    "stroke": {
      "common": "#000000ff",
      "hover": "#d3d3d37f",
      "active": "#d3d3d37f",
      "activehover": "#d3d3d37f"
    }
  },
  "rectangle_57": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_58": {
    "fill": {
      "common": "#444444ff",
      "hover": "#b22222ff",
      "active": "#b22222ff",
      "activehover": "#b22222ff"
    }
  },
  "rectangle_59": {
    "fill": {
      "common": "#808080ff",
      "hover": "#ffff00ff",
      "active": "#ffff00ff",
      "activehover": "#ffff00ff"
    },
    "stroke": {
      "common": "#696969ff",
      "hover": "#ffa500ff",
      "active": "#ffa500ff",
      "activehover": "#ffa500ff"
    }
  },
  "text_60": {
    "fill": {
      "common": "#00000000",
      "hover": "#b22222ff",
      "activehover": "#b22222ff"
    }
  }
},
  /**
   * The grouping infos.
   */
  'groups': {
  "byId": {
    "path_17": "grp_5v",
    "arrow_18": "grp_5v",
    "path_19": "grp_5v",
    "arrow_20": "grp_5v",
    "rectangle_21": "grp_5v",
    "text_22": "grp_5v",
    "rectangle_23": "grp_5v",
    "image_61": "grp_5v",
    "text_24": "grp_5v",
    "text_25": "grp_5v",
    "arrow_32": "grp_1",
    "arrow_33": "grp_1",
    "rectangle_34": "grp_1",
    "text_35": "grp_1",
    "rectangle_36": "grp_1",
    "image_62": "grp_1",
    "text_37": "grp_1",
    "path_53": "grp_2",
    "arrow_54": "grp_2",
    "path_55": "grp_2",
    "arrow_56": "grp_2",
    "rectangle_57": "grp_2",
    "text_58": "grp_2",
    "rectangle_59": "grp_2",
    "image_63": "grp_2",
    "text_60": "grp_2",
    "arrow_38": "grp_3",
    "arrow_39": "grp_3",
    "rectangle_40": "grp_3",
    "text_41": "grp_3",
    "rectangle_42": "grp_3",
    "image_64": "grp_3",
    "text_43": "grp_3",
    "arrow_26": "grp_4",
    "arrow_27": "grp_4",
    "rectangle_28": "grp_4",
    "text_29": "grp_4",
    "rectangle_30": "grp_4",
    "image_65": "grp_4",
    "text_31": "grp_4",
    "path_44": "grp_E",
    "arrow_45": "grp_E",
    "path_46": "grp_E",
    "arrow_47": "grp_E",
    "rectangle_48": "grp_E",
    "text_49": "grp_E",
    "rectangle_50": "grp_E",
    "image_66": "grp_E",
    "text_51": "grp_E",
    "text_52": "grp_E",
    "path_1": "grp_6",
    "arrow_2": "grp_6",
    "path_3": "grp_6",
    "arrow_4": "grp_6",
    "rectangle_5": "grp_6",
    "text_6": "grp_6",
    "rectangle_7": "grp_6",
    "image_67": "grp_6",
    "text_8": "grp_6",
    "path_9": "grp_8",
    "arrow_10": "grp_8",
    "path_11": "grp_8",
    "arrow_12": "grp_8",
    "rectangle_13": "grp_8",
    "text_14": "grp_8",
    "rectangle_15": "grp_8",
    "image_68": "grp_8",
    "text_16": "grp_8"
  },
  "byName": {
    "grp_5v": [
      "path_17",
      "arrow_18",
      "path_19",
      "arrow_20",
      "rectangle_21",
      "text_22",
      "rectangle_23",
      "image_61",
      "text_24",
      "text_25"
    ],
    "grp_1": [
      "arrow_32",
      "arrow_33",
      "rectangle_34",
      "text_35",
      "rectangle_36",
      "image_62",
      "text_37"
    ],
    "grp_2": [
      "path_53",
      "arrow_54",
      "path_55",
      "arrow_56",
      "rectangle_57",
      "text_58",
      "rectangle_59",
      "image_63",
      "text_60"
    ],
    "grp_3": [
      "arrow_38",
      "arrow_39",
      "rectangle_40",
      "text_41",
      "rectangle_42",
      "image_64",
      "text_43"
    ],
    "grp_4": [
      "arrow_26",
      "arrow_27",
      "rectangle_28",
      "text_29",
      "rectangle_30",
      "image_65",
      "text_31"
    ],
    "grp_E": [
      "path_44",
      "arrow_45",
      "path_46",
      "arrow_47",
      "rectangle_48",
      "text_49",
      "rectangle_50",
      "image_66",
      "text_51",
      "text_52"
    ],
    "grp_6": [
      "path_1",
      "arrow_2",
      "path_3",
      "arrow_4",
      "rectangle_5",
      "text_6",
      "rectangle_7",
      "image_67",
      "text_8"
    ],
    "grp_8": [
      "path_9",
      "arrow_10",
      "path_11",
      "arrow_12",
      "rectangle_13",
      "text_14",
      "rectangle_15",
      "image_68",
      "text_16"
    ]
  }
},
  
  'ids': null,
  'clicked': null,
  'hover': [],
  
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
        this.setStyle(id2, this.clicked === id2 ? "active" : "common");
      }
    }
  },
  
  'setStyle': function(id2, style) {
    var type = id2.charAt(0),
        id = id2.substr(1);
    
    if (type === 'g') {
      var items = this.groups.byName[id];
      if (items) {
        items.forEach((item) => this.setStyle('i' + item, style)); 
      }
    } else if (type === 'i') {
      this.setStyle2($('#' + id), id, style);
     }
  },
  
  'setStyle2': function(elem, id, key) {
    var info = this.infos[id];
    
    if (!elem || !elem.tagName || !info) {
      return;
    }
    
    // handle groups
    if (elem.tagName === 'g') {
      var children = elem.children;
      for (var i = 0; i < children.length; ++i) {
        this.setStyle2(children[i], id, key);
      }
      
    } else {
      // set style of item
      Object.keys(info).forEach((name) =>  {
        elem.style[name] = info[name][key];
      });
    }
  }
}.init();
/**
 * Handles the context menu trigger to block it.
 * @param {Event} event The event data.
 * @returns {Boolean} true
 */
function onContextMenu(event) {
  event.preventDefault();
  return true;
}

// set a context menu handler
document.addEventListener('contextmenu', onContextMenu);