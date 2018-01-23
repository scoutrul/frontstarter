var _default = function _default(body) {
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset=\"UTF-8\">\n    </head>\n    <body>\n      <div id=\"app\">" + body + "</div>\n    </body>\n  </html>\n  <script src=\"/bundle.js\" defer></script>\n";
};

export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "src/template.js");
}();

;