webpackHotUpdate_N_E("pages/index",{

/***/ "./node_modules/next/dist/build/polyfills/object-assign.js":
false,

/***/ "./node_modules/prop-types/checkPropTypes.js":
false,

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
false,

/***/ "./node_modules/react/cjs/react.development.js":
false,

/***/ "./node_modules/react/index.js":
false,

/***/ "./node_modules/webpack/buildin/harmony-module.js":
false,

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process, module) {var next = __webpack_require__(/*! next */ \"next\");\n\nvar app = next({\n  dev: false\n});\nvar handle = app.getRequestHandler();\n\nmodule.exports.handler = function (req, res) {\n  return app.prepare().then(function () {\n    return handle(req, res);\n  })[\"catch\"](function (ex) {\n    console.error(ex.stack);\n    process.exit(1);\n  });\n};\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/NDRkOCJdLCJuYW1lcyI6WyJuZXh0IiwicmVxdWlyZSIsImFwcCIsImRldiIsImhhbmRsZSIsImdldFJlcXVlc3RIYW5kbGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJwcmVwYXJlIiwidGhlbiIsImV4IiwiY29uc29sZSIsImVycm9yIiwic3RhY2siLCJwcm9jZXNzIiwiZXhpdCJdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQU1BLElBQUksR0FBR0MsbUJBQU8sQ0FBQyxrQkFBRCxDQUFwQjs7QUFFQSxJQUFNQyxHQUFHLEdBQUdGLElBQUksQ0FBQztBQUFFRyxLQUFHLEVBQUU7QUFBUCxDQUFELENBQWhCO0FBQ0EsSUFBTUMsTUFBTSxHQUFHRixHQUFHLENBQUNHLGlCQUFKLEVBQWY7O0FBRUFDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxPQUFmLEdBQXlCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3JDLFNBQU9SLEdBQUcsQ0FBQ1MsT0FBSixHQUNKQyxJQURJLENBQ0M7QUFBQSxXQUFNUixNQUFNLENBQUNLLEdBQUQsRUFBTUMsR0FBTixDQUFaO0FBQUEsR0FERCxXQUVFLFVBQUFHLEVBQUUsRUFBSTtBQUNYQyxXQUFPLENBQUNDLEtBQVIsQ0FBY0YsRUFBRSxDQUFDRyxLQUFqQjtBQUNBQyxXQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiO0FBQ0QsR0FMSSxDQUFQO0FBTUQsQ0FQRCIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbmV4dCA9IHJlcXVpcmUoJ25leHQnKVxuXG5jb25zdCBhcHAgPSBuZXh0KHsgZGV2OiBmYWxzZSB9KVxuY29uc3QgaGFuZGxlID0gYXBwLmdldFJlcXVlc3RIYW5kbGVyKClcblxubW9kdWxlLmV4cG9ydHMuaGFuZGxlciA9IChyZXEsIHJlcykgPT4ge1xuICByZXR1cm4gYXBwLnByZXBhcmUoKVxuICAgIC50aGVuKCgpID0+IGhhbmRsZShyZXEsIHJlcykpXG4gICAgLmNhdGNoKGV4ID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXguc3RhY2spXG4gICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICB9KVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next":
/*!***********************!*\
  !*** external "next" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = next;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FL2V4dGVybmFsIFwibmV4dFwiP2VkOGEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibmV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gbmV4dDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next\n");

/***/ })

})