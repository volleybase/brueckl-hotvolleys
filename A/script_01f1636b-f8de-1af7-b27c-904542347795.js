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
/* global animator, animation0 */

/**
 * The effects data and handler.
 */
var effects = {
  /**
   * The effect infos.
   */
  'infos': {
  "ball_148": {
    "topMost": {
      "common": true,
      "hover": true,
      "active": true,
      "activehover": true
    }
  },
  "path_149": {
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
  "arrow_150": {
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
  "path_151": {
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
  "path_160": {
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
  "path_162": {
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
  "arrow_163": {
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
  "text_165": {
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
  "rectangle_166": {
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
  "rectangle_169": {
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
  "text_170": {
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
  "arrow_171": {
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
  "arrow_172": {
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
  "rectangle_173": {
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
  "text_174": {
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
  "rectangle_175": {
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
  "rectangle_178": {
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
  "text_179": {
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
  "path_180": {
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
  "arrow_181": {
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
  "path_182": {
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
  "arrow_183": {
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
  "rectangle_184": {
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
  "text_185": {
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
  "rectangle_186": {
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
  "rectangle_189": {
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
  "text_190": {
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
  "text_191": {
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
  "arrow_192": {
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
  "arrow_193": {
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
  "rectangle_194": {
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
  "text_195": {
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
  "rectangle_196": {
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
  "rectangle_199": {
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
  "text_200": {
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
  "arrow_201": {
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
  "arrow_202": {
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
  "rectangle_203": {
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
  "text_204": {
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
  "rectangle_205": {
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
  "rectangle_208": {
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
  "text_209": {
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
  "path_210": {
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
  "arrow_211": {
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
  "path_212": {
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
  "arrow_213": {
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
  "rectangle_214": {
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
  "text_215": {
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
  "rectangle_216": {
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
  "rectangle_219": {
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
  "text_220": {
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
  "text_221": {
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
  "path_222": {
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
  "arrow_223": {
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
  "path_224": {
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
  "arrow_225": {
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
  "rectangle_226": {
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
  "text_227": {
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
  "rectangle_228": {
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
  "rectangle_231": {
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
  "text_232": {
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
  "text_233": {
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
  "path_234": {
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
  "arrow_235": {
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
  "path_236": {
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
  "arrow_237": {
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
  "rectangle_238": {
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
  "text_239": {
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
  "rectangle_240": {
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
  "rectangle_243": {
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
  "text_244": {
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
    "path_222": "grp_5h",
    "arrow_223": "grp_5h",
    "path_224": "grp_5h",
    "arrow_225": "grp_5h",
    "rectangle_226": "grp_5h",
    "text_227": "grp_5h",
    "rectangle_228": "grp_5h",
    "image_229": "grp_5h",
    "image_230": "grp_5h",
    "rectangle_231": "grp_5h",
    "text_232": "grp_5h",
    "text_233": "grp_5h",
    "path_180": "grp_5v",
    "arrow_181": "grp_5v",
    "path_182": "grp_5v",
    "arrow_183": "grp_5v",
    "rectangle_184": "grp_5v",
    "text_185": "grp_5v",
    "rectangle_186": "grp_5v",
    "image_187": "grp_5v",
    "image_188": "grp_5v",
    "rectangle_189": "grp_5v",
    "text_190": "grp_5v",
    "text_191": "grp_5v",
    "arrow_192": "grp_1",
    "arrow_193": "grp_1",
    "rectangle_194": "grp_1",
    "text_195": "grp_1",
    "rectangle_196": "grp_1",
    "image_197": "grp_1",
    "image_198": "grp_1",
    "rectangle_199": "grp_1",
    "text_200": "grp_1",
    "path_210": "grp_EE",
    "arrow_211": "grp_EE",
    "path_212": "grp_EE",
    "arrow_213": "grp_EE",
    "rectangle_214": "grp_EE",
    "text_215": "grp_EE",
    "rectangle_216": "grp_EE",
    "image_217": "grp_EE",
    "image_218": "grp_EE",
    "rectangle_219": "grp_EE",
    "text_220": "grp_EE",
    "text_221": "grp_EE",
    "path_234": "grp_2",
    "arrow_235": "grp_2",
    "path_236": "grp_2",
    "arrow_237": "grp_2",
    "rectangle_238": "grp_2",
    "text_239": "grp_2",
    "rectangle_240": "grp_2",
    "image_241": "grp_2",
    "image_242": "grp_2",
    "rectangle_243": "grp_2",
    "text_244": "grp_2",
    "arrow_201": "grp_3",
    "arrow_202": "grp_3",
    "rectangle_203": "grp_3",
    "text_204": "grp_3",
    "rectangle_205": "grp_3",
    "image_206": "grp_3",
    "image_207": "grp_3",
    "rectangle_208": "grp_3",
    "text_209": "grp_3",
    "arrow_171": "grp_4",
    "arrow_172": "grp_4",
    "rectangle_173": "grp_4",
    "text_174": "grp_4",
    "rectangle_175": "grp_4",
    "image_176": "grp_4",
    "image_177": "grp_4",
    "rectangle_178": "grp_4",
    "text_179": "grp_4",
    "path_149": "grp_6",
    "arrow_150": "grp_6",
    "path_151": "grp_6",
    "arrow_152": "grp_6",
    "rectangle_153": "grp_6",
    "text_154": "grp_6",
    "rectangle_155": "grp_6",
    "image_156": "grp_6",
    "image_157": "grp_6",
    "rectangle_158": "grp_6",
    "text_159": "grp_6",
    "path_160": "grp_8",
    "arrow_161": "grp_8",
    "path_162": "grp_8",
    "arrow_163": "grp_8",
    "rectangle_164": "grp_8",
    "text_165": "grp_8",
    "rectangle_166": "grp_8",
    "image_167": "grp_8",
    "image_168": "grp_8",
    "rectangle_169": "grp_8",
    "text_170": "grp_8"
  },
  "byName": {
    "grp_5h": [
      "path_222",
      "arrow_223",
      "path_224",
      "arrow_225",
      "rectangle_226",
      "text_227",
      "rectangle_228",
      "image_229",
      "image_230",
      "rectangle_231",
      "text_232",
      "text_233"
    ],
    "grp_5v": [
      "path_180",
      "arrow_181",
      "path_182",
      "arrow_183",
      "rectangle_184",
      "text_185",
      "rectangle_186",
      "image_187",
      "image_188",
      "rectangle_189",
      "text_190",
      "text_191"
    ],
    "grp_1": [
      "arrow_192",
      "arrow_193",
      "rectangle_194",
      "text_195",
      "rectangle_196",
      "image_197",
      "image_198",
      "rectangle_199",
      "text_200"
    ],
    "grp_EE": [
      "path_210",
      "arrow_211",
      "path_212",
      "arrow_213",
      "rectangle_214",
      "text_215",
      "rectangle_216",
      "image_217",
      "image_218",
      "rectangle_219",
      "text_220",
      "text_221"
    ],
    "grp_2": [
      "path_234",
      "arrow_235",
      "path_236",
      "arrow_237",
      "rectangle_238",
      "text_239",
      "rectangle_240",
      "image_241",
      "image_242",
      "rectangle_243",
      "text_244"
    ],
    "grp_3": [
      "arrow_201",
      "arrow_202",
      "rectangle_203",
      "text_204",
      "rectangle_205",
      "image_206",
      "image_207",
      "rectangle_208",
      "text_209"
    ],
    "grp_4": [
      "arrow_171",
      "arrow_172",
      "rectangle_173",
      "text_174",
      "rectangle_175",
      "image_176",
      "image_177",
      "rectangle_178",
      "text_179"
    ],
    "grp_6": [
      "path_149",
      "arrow_150",
      "path_151",
      "arrow_152",
      "rectangle_153",
      "text_154",
      "rectangle_155",
      "image_156",
      "image_157",
      "rectangle_158",
      "text_159"
    ],
    "grp_8": [
      "path_160",
      "arrow_161",
      "path_162",
      "arrow_163",
      "rectangle_164",
      "text_165",
      "rectangle_166",
      "image_167",
      "image_168",
      "rectangle_169",
      "text_170"
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
}());