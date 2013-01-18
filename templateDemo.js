"use strict";
(function () {
    function run() {
        var templates = new Modules.Loader("/templates");

//        var fileInfoData = [
//            {filename: 'filename', lastModificationDate: 'lastModificationDate'}
//            , {filename: 'filename', lastModificationDate: 'lastModificationDate'}
//        ];
        var fileInfoData = {filename : 'one.txt', lastModifiedDate: '01.01.2013'};
//        var fileInfoListData =
        templates.loadTemplate('fileInfo', 'body', fileInfoData);
    }
    var events = new Modules.Events();
    events.addListener(document, "DOMContentLoaded", run);
}());