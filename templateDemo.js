"use strict";
(function () {
    function run() {
        var templates = new Modules.Loader("/templates");
        var fileInfoData = {filename : 'one.txt', lastModifiedDate: '01.01.2013'};
        templates.loadTemplate('fileInfo', 'bodySimple', fileInfoData);
        var fileInfoListData = [
            {
                filename: 'one.cpp'
                ,lastModifiedDate: '01.01.2013'
            }
            , {
                filename: 'one.h'
                ,lastModifiedDate: '02.01.2013'
            }
        ];
        templates.loadTemplateList('fileInfo', 'bodyList', fileInfoListData);
    }
    var events = new Modules.Events();

    //events.addListener(document, "DOMContentLoaded", run);
    events.addStartupListener(run);

}());