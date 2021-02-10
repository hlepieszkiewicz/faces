// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"nOYY":[function(require,module,exports) {
window.addEventListener('load', function () {
  console.clear(); // CONSTANS

  var RED = 'rgb(156, 52, 32)';
  var ORANGE = ' rgb(239,127,26)';
  var BLUE = 'rgb(10, 71, 102)';
  var WHITE = 'rgb(255,255,255)'; //HTML ELEMENTS

  var canvasEl = document.querySelector('#container');
  var colorButtons = document.querySelectorAll('.toolbar__color');
  var actionButtons = document.querySelectorAll('.toolbar__button');
  var audio = document.querySelector('audio');
  var svgElements = document.querySelectorAll(".svg-face");
  var positionInfo = canvasEl.getBoundingClientRect();
  var height = positionInfo.height;
  var width = positionInfo.width;
  var faceParts = [];
  var currentNode = null;

  var handleColorButton = function handleColorButton(_ref) {
    var color = _ref.target.dataset.color;

    switch (color) {
      case 'red':
        changeBackgroundColor(RED);
        changeTranformerBorderColor(WHITE);
        changeTextColor(WHITE);
        break;

      case 'orange':
        changeBackgroundColor(ORANGE);
        changeTranformerBorderColor(BLUE);
        changeTextColor(WHITE);
        break;

      case 'blue':
        changeBackgroundColor(BLUE);
        changeTranformerBorderColor(WHITE);
        changeTextColor(WHITE);
        break;

      case 'white':
        changeBackgroundColor(WHITE);
        changeTranformerBorderColor(BLUE);
        changeTextColor(BLUE);
        break;
    }
  };

  var handleActionButton = function handleActionButton(_ref2) {
    var button = _ref2.target.dataset.action;

    switch (button) {
      case 'eraser':
        if (currentNode) {
          transformer.detach();
          currentNode.remove();
          layer.draw();
        }

        break;

      case 'trash':
        stage.clear();
        transformer.detach();
        layer.removeChildren();
        changeBackgroundColor(WHITE);
        changeTranformerBorderColor(BLUE);
        changeTextColor(BLUE);
        setup();
        break;

      case 'download':
        transformer.detach();
        layer.draw();
        alert("Aby zapisa\u0107 \uD83D\uDCE5\n        1) kliknij prawym przyciskiem myszy na obrazie\n        2) wybierz opcj\u0119 \"zapisz jako\".");
        break;
    }
  };

  var changeBackgroundColor = function changeBackgroundColor(color) {
    rect.fill(color);
    layer.draw();
  };

  var changeTranformerBorderColor = function changeTranformerBorderColor(color) {
    transformer.borderStroke(color);
    layer.draw();
  };

  var changeTextColor = function changeTextColor(color) {
    text.fill(color);
    layer.draw();
  };

  var getImageByID = function getImageByID(_ref3) {
    var id = _ref3.id;
    return document.querySelector("img.preload#".concat(id));
  };

  var makeFaceNode = function makeFaceNode(element) {
    var faceElement = new Konva.Image({
      x: Math.random() * stage.width() / 3,
      y: Math.random() * stage.height() / 3,
      image: element,
      draggable: true,
      zIndex: 1
    });

    var selected = function selected(node) {
      transformer.nodes([node]);
      node.zIndex(20);
      transformer.zIndex(20);
      text.zIndex(20);
      currentNode = node;
    };

    faceElement.on('mousedown', function () {
      selected(faceElement);
    });
    faceElement.on('touchstart', function () {
      selected(faceElement);
    });
    return faceElement;
  };

  var setup = function setup() {
    layer.add(rect);
    layer.add(transformer);
    layer.add(text);
  };

  var stage = new Konva.Stage({
    container: 'container',
    // -10px for the border
    width: width - 10,
    height: height - 10
  });
  var layer = new Konva.Layer();
  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: WHITE
  });
  var transformer = new Konva.Transformer({
    keepRatio: true,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    padding: 2,
    borderDash: [5, 10]
  });
  var text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: 'Calibri',
    fontSize: 24,
    text: '',
    fill: 'black'
  });

  var init = function init() {
    colorButtons.forEach(function (btn) {
      btn.addEventListener('click', handleColorButton);
    });
    actionButtons.forEach(function (btn) {
      btn.addEventListener('click', handleActionButton);
    });
    svgElements.forEach(function (el) {
      var contnetFaceParts = el.querySelectorAll(".face-part");
      contnetFaceParts.forEach(function (part) {
        return faceParts.push(part);
      });
    });
    faceParts.forEach(function (part) {
      part.addEventListener('click', function () {
        var img = getImageByID(part);
        var node = makeFaceNode(img);
        layer.add(node);
        layer.draw();
        audio.play();
      });
    });
    stage.add(layer);
    setup();
    layer.draw();
  };

  init();
});
},{}]},{},["nOYY"], null)
//# sourceMappingURL=editor.488279c3.js.map