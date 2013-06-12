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
    var dom = new Modules.DOM();
    events.addTemplateLoadedListener(templateName, run);
    function run() {
        var fileInfos = document.getElementsByClassName("fileInfo");
        events.addListeners(fileInfos, 'click', fileInfoClickListener, true);
        function fileInfoClickListener(event) {
            var eventTarget = event.target;
            var templateRoot = dom.getTemplateRoot(eventTarget, "fileInfo");
            var fileInfo_checkBox = templateRoot.getElementsByClassName("fileInfo_checkBox")[0];
            var fileInfo_checkBox_checked = templateRoot.getElementsByClassName("fileInfo_checkBox_checked")[0];
            if (fileInfo_checkBox != undefined) {
                fileInfo_checkBox.className = 'fileInfo_checkBox_checked';
            } else if (fileInfo_checkBox_checked != undefined) {
                fileInfo_checkBox_checked.className = 'fileInfo_checkBox';
            }
        }
    }
}());

