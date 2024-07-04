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
 * @param {Function} handler The ebvent handler.
 * @returns {void}
 */
function $event(elem, event, handler) {
  elem.addEventListener(event, handler);
}
//-- create menu script -----------------------------------------------
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
    contextmenu = false;

function onContextMenu(event) {
  event.preventDefault();

  // ignore clicks outside of svg area
  var svg = _getSvgImg();
  if (!svg || !svg.contains(event.target)) {
    return;
  }
  
  // InternalError is unique for firefox
  //var isFirefox = !!window.InternalError,
  //    x = isFirefox ? event.clientX : event.pageX, 
  //    y = isFirefox ? event.clientY : event.pageY;  
  showContextMenu(event.clientX, event.clientY);
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
    
    //var svg = document.getElementsByTagName('svg')[0], pt, svgP;
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

  },

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
  
  _updateElems: function(key, state) {
    var st = state === undefined ? this.data[key] : state;

    // items that reflect the state
    var elems = $$('[data-option="' + key + '"]');
    if (elems) {
      for (var i = 0, i2 = elems.length; i < i2; ++i) {
        elems[i].style.display = st ? "block" : "none";
      }
    }
    
    // items that reflect the inverted state
    elems = $$('[data-option="' + key + '_not"]');
    if (elems) {
      for (var i = 0, i2 = elems.length; i < i2; ++i) {
        elems[i].style.display = st ? "none" : "block";
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
  $event(sub, 'mouseenter', (event) => {
    //var g = event.target;
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
//-- create menu script -----------------------------------------------
var animation0 = {
  "player_1": {
    "x": 300.0,
    "y": 1250.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_2": {
    "x": 650.0,
    "y": 1250.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_3": {
    "x": 1000.0,
    "y": 1250.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_4": {
    "x": 825.0,
    "y": 1700.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_5": {
    "x": 475.0,
    "y": 1700.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_6": {
    "x": 300.0,
    "y": 950.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_7": {
    "x": 650.0,
    "y": 950.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_8": {
    "x": 1000.0,
    "y": 950.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_9": {
    "x": 825.0,
    "y": 500.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "player_10": {
    "x": 475.0,
    "y": 500.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "ball_11": {
    "x": 300.0,
    "y": 975.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "ball_14": {
    "x": 650.0,
    "y": 975.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "ball_17": {
    "x": 1000.0,
    "y": 975.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "ball_20": {
    "x": 825.0,
    "y": 525.0,
    "angle": 0.0,
    "scale": 1.0
  },
  "ball_23": {
    "x": 475.0,
    "y": 525.0,
    "angle": 0.0,
    "scale": 1.0
  }
};
var animation = {
  "player_1": [
    {
      "type": "mov",
      "x": 175.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.4
    },
    {
      "type": "mov",
      "x": 175.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.6,
      "end": 1.0
    }
  ],
  "player_2": [
    {
      "type": "mov",
      "x": 175.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.4
    },
    {
      "type": "mov",
      "x": 175.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.6,
      "end": 1.0
    }
  ],
  "player_3": [
    {
      "type": "mov",
      "x": -175.0,
      "y": 450.0,
      "mode": "linear",
      "start": 0.6,
      "end": 1.0
    }
  ],
  "player_4": [
    {
      "type": "mov",
      "x": -350.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "player_5": [
    {
      "type": "mov",
      "x": -100.0,
      "y": -250.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.4
    },
    {
      "type": "mov",
      "x": -75.0,
      "y": -200.0,
      "mode": "linear",
      "start": 0.7,
      "end": 1.0
    }
  ],
  "player_6": [
    {
      "type": "mov",
      "x": 350.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "player_7": [
    {
      "type": "mov",
      "x": 350.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "player_8": [
    {
      "type": "mov",
      "x": -175.0,
      "y": -450.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "player_9": [
    {
      "type": "mov",
      "x": -350.0,
      "y": 0.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "player_10": [
    {
      "type": "mov",
      "x": -175.0,
      "y": 450.0,
      "mode": "linear",
      "start": 0.2,
      "end": 0.8
    }
  ],
  "ball_11": [
    {
      "type": "mov",
      "x": 175.0,
      "y": 250.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.5
    },
    {
      "type": "mov",
      "x": 175.0,
      "y": -250.0,
      "mode": "linear",
      "start": 0.5,
      "end": 1.0
    }
  ],
  "ball_14": [
    {
      "type": "mov",
      "x": 175.0,
      "y": 250.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.5
    },
    {
      "type": "mov",
      "x": 175.0,
      "y": -250.0,
      "mode": "linear",
      "start": 0.5,
      "end": 1.0
    }
  ],
  "ball_17": [
    {
      "type": "mov",
      "x": 0.0,
      "y": 250.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.5
    },
    {
      "type": "mov",
      "x": -175.0,
      "y": -700.0,
      "mode": "linear",
      "start": 0.5,
      "end": 1.0
    }
  ],
  "ball_20": [
    {
      "type": "mov",
      "x": -175.0,
      "y": 1150.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.5
    },
    {
      "type": "mov",
      "x": -175.0,
      "y": -1150.0,
      "mode": "linear",
      "start": 0.5,
      "end": 1.0
    }
  ],
  "ball_23": [
    {
      "type": "mov",
      "x": -110.0,
      "y": 870.0,
      "mode": "linear",
      "start": 0.0,
      "end": 0.5
    },
    {
      "type": "mov",
      "x": -55.0,
      "y": -420.0,
      "mode": "linear",
      "start": 0.5,
      "end": 1.0
    },
    {
      "type": "mov",
      "x": 175.0,
      "y": -450.0,
      "mode": "linear",
      "start": 10.0,
      "end": 10.1
    },
    {
      "type": "mov",
      "x": -175.0,
      "y": 700.0,
      "mode": "linear",
      "start": 11.0,
      "end": 11.5
    },
    {
      "type": "mov",
      "x": 0.0,
      "y": -250.0,
      "mode": "linear",
      "start": 12.0,
      "end": 12.5
    }
  ]
};
/* global $$, animation, animation0 */

window.animator = {
  // to reset all animations
  animation0: null,
  // the steps of the animations
  animation: null,
  
  // the duration of the animation
  duration: 0,
  // when to restart looping
  restart: 0,
  
  // the animation timer id
  ID: undefined,
  // the current timestamp of the animation
  ts: 0,
  // the last system timestamp to calculate the next step
  lastTs: 0,

  /**
   * Initializes the animations - sets the data.
   * @param {array} animation0 How to reset all animations to restart.
   * @param {array} animation The animations steps.
   * @returns {void}
   */
  init: function(animation0, animation) {
    this.animation0 = animation0;
    this.animation = animation;
  },
  
  /**
   * Initializes the animations - sets the times.
   * @param {number} duration The duration of the animation.
   * @param {number} restart When to restart looping.
   * @returns {void}
   */
  initAnimation: function(duration, restart) {
    this.duration = duration;
    this.restart = restart;
  },

  start: function() {
    if (!this.ID) {
      this.ID = setInterval(this.handler.bind(this), 33);
    }
    this.lastTs = Date.now();
  },
  pause: function() {
    if (this.ID) {
      clearInterval(this.ID);
      this.ID = 0;
    }
  },
  stop: function() {
    if (this.ID) {
      clearInterval(this.ID);
      this.ID = 0;
    }
    this.ts = 0;
    this.reset(true);
  },

  handler: function() {
    // old this.ts += 0.033;
    // calculate next step
    var cur = Date.now();
    this.ts += (cur - this.lastTs) / 1000;
    this.lastTs = cur;

    // handle looping
    while (this.ts > this.duration) {
      this.ts -= this.duration - this.restart;
    }
    
    // calculate animation and update
    this.reset(false);
    this.update(this.ts);
  },

  reset: function(full) {
    var keys = Object.keys(this.animation0);    
    for (var i = 0; i < keys.length; ++i) {
      var id = keys[i],
          anim0 = this.animation0[id];
  
      this.setActor($('#' + id), anim0);
      if (full && anim0.draw !== undefined) {
        console.log("reset draw " + keys[i]);
        this._setDraw(keys[i], anim0.draw);
      }
    }
  },
  
  update: function(time) {
    // handle each actor
    var keys = Object.keys(this.animation0);
    for (var i = 0; i < keys.length; ++i) {
      var anim0 = this.animation0[keys[i]],
          anims = this.animation[keys[i]],
          cur = {},
          keys2 = Object.keys(anim0);
      
      // clone anim0 (=initial pos/angle/...)
      for (var j = 0; j < keys2.length; ++j) {
        cur[keys2[j]] = anim0[keys2[j]];
      }
      
      // handle each animation of this actor
      for (var a = 0; a < anims.length; ++a) {
        var anim = anims[a];
        
        switch (anim.type) {
          case 'mov':
            if (time >= anim.end) {
              cur.x += anim.x;
              cur.y += anim.y;
            
            } else if (time > anim.start) {
              var dur = anim.end - anim.start,
                  t = time - anim.start;
              
              switch (anim.mode) {
                case "linear":
                  cur.x += anim.x / dur * t;
                  cur.y += anim.y / dur * t;
                  break;
                
                case "parable":
                  cur.x += this._getX(anim.angle, anim.speed, t / anim.slowmo);
                  cur.y += this._getY(anim.angle, anim.speed, t / anim.slowmo);
                  break;
                  
                default:
                  log('Invalid move mode: ' + anim.mode + '!');
              }
            }
            break;
            
          case 'rot':
            if (time >= anim.end) {
              cur.angle += anim.angle;
              
            } else if (time > anim.start) {
              var dur = anim.end - anim.start,
                  t = time - anim.start;
              cur.angle += anim.angle / dur * t;
            }
            break;
            
          case 'scale':
            if (time >= anim.end) {
              cur.scale += anim.scale;
            } else if (time > anim.start) {
              var dur = anim.end - anim.start,
                  t = time - anim.start;
              cur.scale += anim.scale / dur * t;
            }
            break;
            
          case 'vis':
            if (time >= anim.at) {
              cur.visible = anim.visible;
            }
            break;
            
          case 'pla-typ':
            if (time >= anim.at) {
              cur.playertype = anim.playertype;
            }
            break;
            
          case 'pla-txt':
            if (time >= anim.at) {
              cur.playertext = anim.playertext;
            }
            break;            
          
          case 'draw':
            // nothing to change for main item -> cur
            // subitems are updated in setDraw(...)
            console.log("update draw");
            this._setDraw(keys[i], anim0.draw, anim.items, time);
            break;
            
          default:
            console.log('Unsupported animation type: ' + anim.type + '!');
            break;
        }
      }

      this.setActor($('#' + keys[i]), cur);
    }
  },
  
  _getX: function(angle, speed, time) {
    return speed * Math.cos(angle) * time * 1000;
  },

  _getY: function(angle, speed, time) {
    var G2 = 9.81 / 2.0;
    return -(speed * Math.sin(angle) * time - G2 * time * time) * 1000;
  },

  setActor: function(actor, anim) {
    if (!actor) return;
    
    var keys = Object.keys(anim),
        trans = '';
    for (var i = 0; i < keys.length; ++i) {
      switch (keys[i]) {
        case 'x':
          trans += this.setPos(anim.x, anim.y);
          break;
        case 'y':
          // nothing to do
          break;
        
        case 'angle':
          trans += this.setRot(anim.angle, anim.rotx, anim.roty);
          break;
        case 'rotx':
        case 'roty':
          // nothing to do
          break;
        
        case 'scale':
          trans += this.setScale(anim.scale, anim.rotx, anim.roty);
          break;
          
        case 'visible':
          this.setVisibility(actor, anim.visible);
          break;
        
        case 'playertype':
          this.setPlayerType(actor, anim.playertype);
          break;

        case 'playertext':
          this.setPlayerText(actor, anim.playertext);
          break;
              
        case 'draw':
          // nothing to do
          break;
        
        default:
          console.log('Unsupported animation property: ' + keys[i] + '-' + anim[keys[i]] + '!');
      }
    }
    if (trans !== '') {
      actor.setAttribute('transform', trans.trim());
    }
  },
  
  _setDraw: function(id, pos0, anims, time) {
    // initialize positions and check
    var pos1 = JSON.parse(JSON.stringify(pos0));
    if (!Array.isArray(pos1)) {
      log("Invalid animation data for " + id + "!");
      return;
    }

    // handle each position (if in animation)
    if (anims && time) {
      // check
      if (!Array.isArray(anims) || pos1.length !== anims.length) {
        log("Invalid animation data for " + id + "!");
        return;
      }
    
      // handle each position
      for (var p = 0, p2 = pos1.length; p < p2; ++p) {
        var pos = pos1[p],
            angle = pos1[p].angle,
            length = pos1[p].length;
        
        // handle each animation of position
        for (var a = 0, a2 = anims[p].length; a < a2; ++a) {
          var ai = anims[p][a];
          
          if (ai.end <= time) {
            switch (ai.type) {
              case 'show':
                pos.visible = ai.visible;
                break;
                
              case 'xy':
                pos.dx += ai.dx;
                pos.dy += ai.dy;
                break;
                
              case 'rel':
                angle += ai.angle;
                length += ai.length;
                var aa = angle * Math.PI / 180;
                pos.dx = Math.cos(aa) * length,
                pos.dy = Math.sin(aa) * length;
                break;
            }
          } else if (ai.start < time) {
            var dur = time - ai.start,
                duration = ai.end - ai.start;
            switch (ai.type) {
              case 'xy':
                pos.dx += ai.dx / duration * dur;
                pos.dy += ai.dy / duration * dur;
                break;
                
              case 'rel':
                angle += ai.angle / duration * dur;
                length += ai.length / duration * dur;
                var aa = angle * Math.PI / 180;
                pos.dx = Math.cos(aa) * length,
                pos.dy = Math.sin(aa) * length;
                break;
            }
          }
        }
      }
    }
    
    // connect positions (0 cannot have any predecessor)
    for (var p = 1, p2 = pos1.length; p < p2; ++p) {
      var pos = pos1[p];
      if (pos.predecessor >= 0) {
        var posP = pos1[pos.predecessor];
        pos.dx += posP.dx;
        pos.dy += posP.dy;
      }
    }
    
    // set items depending on the positions
    $$('g#' + id + ' > [data-anim-index]').forEach((item) => {
      var idx = parseInt(item.dataset.animIndex);
      if (isFinite(idx)) {
        var pos = pos1[idx],
            posP = pos.predecessor >= 0 ? pos1[pos.predecessor] : null;

        // set visibility
        this.setVisibility(item, pos.visible);

        // set position
        switch (item.tagName.toLowerCase()) {
          //<line x1="107" y1="115" x2="159" y2="115" id="draw_1_20" data-anim-index="9" style="fill: none; stroke: #111111; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;"/>
          case 'line':
            if (posP !== null) {
              item.setAttribute('x1', posP.dx);
              item.setAttribute('y1', posP.dy);
              item.setAttribute('x2', pos.dx);
              item.setAttribute('y2', pos.dy);
            } else {
              log("Cannot set line info for " + idx + "!");
            }
            break;

          //<ellipse cx="154" cy="107" rx="8" ry="8" id="draw_1_22" data-anim-index="10" style="stroke: none; fill: #eeeeee;"/>
          case 'ellipse':
            item.setAttribute('cx', pos.dx);
            item.setAttribute('cy', pos.dy);
            break;

          default:
            console.error('Cannot set position for svg-draw-item ' + item.tagname + '!');
        }
      }
    });
  },
    
  setPos: function(x, y) {
    return ' translate(' + x + ', ' + y + ')';
  },

  setRot: function(angle, rotx, roty) {
    return (rotx !== undefined && roty !== undefined) 
        ? (' rotate(' + angle + ', ' + rotx + ', ' + roty + ')') 
        : (' rotate(' + angle + ')');
  },
  
  setScale: function(scale, cx, cy) {
    return (cx !== undefined && cy !== undefined)
        ? ' translate(' + cx + ', ' + cy + ') scale(' + scale + ') translate(' + -cx + ', ' + -cy + ')'
        : ' scale(' + scale + ')';
  },
  
  setVisibility: function(actor, visible) {
    actor.style.display = visible ? 'block' : 'none';
  },
  
  setPlayerType: function(actor, playertype) {
    actor.setAttribute('class', playertype);
  },
  
  setPlayerText: function(actor, text) {
    var texts = actor.getElementsByTagName('text');
    if (texts !== null && texts.length > 0) {
      texts[0].innerHTML = text;
    }
  }
};
animator.init(animation0, animation);

function onAnimClick(event) {
  var elem = event.target;
  while (elem) {
    if (elem.dataset && elem.dataset.item) {
      switch (elem.dataset.item) {
        case 'ID_mi_play':
          $$('g.actors').forEach((actors) => actors.className.baseVal = 'actors animation');
          animator.start();
          $('#ID_animation').className.baseVal = elem.dataset.item;
          break;
        case 'ID_mi_pause':
          // 'pause' is not allowed if state is 'stopped'
          if ($('#ID_animation').className.baseVal !== "ID_mi_stop") {
            animator.pause();
            $('#ID_animation').className.baseVal = elem.dataset.item;
          }
          break;
        case 'ID_mi_stop':
          $$('g.actors').forEach((actors) => actors.className.baseVal = 'actors scratch');
          animator.stop();
          $('#ID_animation').className.baseVal = elem.dataset.item;
          break;
      }
      elem = null;
    } else {
      elem = elem.parentNode;
    }
  }
}

$event($('#ID_animation'), 'click', onAnimClick);
animator.initAnimation(1.0, 0.0);
}());