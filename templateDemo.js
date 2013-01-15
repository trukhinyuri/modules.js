"use strict";
(function () {
    function run() {
        var templates = new Modules.Loader("/templates");
        var fileInfoData = {};
        templates.loadTemplate('fileInfo', 'body', fileInfoData);
    }
    var events = new Modules.Events();
    events.addListener(document, "DOMContentLoaded", run);
}());