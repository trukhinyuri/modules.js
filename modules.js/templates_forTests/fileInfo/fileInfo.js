/**
 * Created with IntelliJ IDEA.
 * User: trukhinyuri
 * Date: 1/15/13
 * Time: 3:25 PM
 * To change this template use File | Settings | File Templates.
 */
"use strict";
(function() {
    var templateName = "fileInfo";
    var events = new Modules.Events();
    events.addTemplateLoadedListener(templateName, run);
    function run() {
        var fileInfos = document.getElementsByClassName("fileInfo");
        events.addListeners(fileInfos, 'click', fileInfoClickListener, false);
        function fileInfoClickListener(event) {
            var target = event.target;
            if (target.className == "fileInfo") {
                var fileInfo_checkBox = target.getElementsByClassName("fileInfo_checkBox")[0];
                var fileInfo_checkBox_checked = target.getElementsByClassName("fileInfo_checkBox_checked")[0];
                if (fileInfo_checkBox != undefined) {
                    fileInfo_checkBox.className = 'fileInfo_checkBox_checked';
                } else if (fileInfo_checkBox_checked != undefined) {
                    fileInfo_checkBox_checked.className = 'fileInfo_checkBox';
                }
            }
        }
    }
}());

