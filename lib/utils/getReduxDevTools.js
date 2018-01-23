export default function getReduxDevTools() {
  var devtoolsEnabled = process.env.NODE_ENV === 'development' && typeof global.devToolsExtension === 'function';
  var devTools = devtoolsEnabled ? global.devToolsExtension() : function (f) {
    return f;
  };
  return devTools;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getReduxDevTools, 'getReduxDevTools', 'src/utils/getReduxDevTools.js');
}();

;