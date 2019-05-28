(function (Module) {
    (function (DOM) {
        function isHTMLModule(element) {
            return element;
        }
        function getModules(className) {
            return className;
        }
        DOM.getModules = getModules;
    })(Module.DOM || (Module.DOM = {}));
    var DOM = Module.DOM;
})(exports.Module || (exports.Module = {}));
var Module = exports.Module;

