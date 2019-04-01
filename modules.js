
/*
 * Copyright 2012-2019 Yuri Trukhin
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * @fileOverview
 * @copyright (C) Yuri V. Trukhin.
 * @author trukhinyuri <yuri@trukhin.com>
 * @version 0.9.1
 * @license Apache License, Version 2.0. You may obtain a copy of the License at {@link http://www.apache.org/licenses/LICENSE-2.0}
 */

"use strict";
//noinspection JSUnresolvedVariable
/**
 * Exports object for global modules.
 * @namespace exports
 * @memberOf window
 */
window.exports = window.exports || (window.exports = {});
/**
 * @namespace Modules
 * @memberOf window.exports
 *
 */
(function (Modules) {
    Object.defineProperties(Modules, {
        "MODULE" : {
            /** Module ITEM_TYPE constant
             * @instance
             * @name MODULE
             * @memberOf window.exports.Modules
             * @readonly
             * @returns {String}
             */
            get: function() {
                return "module";
            }
            , enumerable: true
            , configurable: false
        }
        , "TEMPLATE" : {
            /** Template ITEM_TYPE constant
             * @instance
             * @name TEMPLATE
             * @memberOf window.exports.Modules
             * @readonly
             * @returns {String}
             */
            get: function() {
                return "template";
            }
            , enumerable: true
            , configurable: false
        }
        , "HTML" : {
            /** Template ITEM_TYPE constant
             * @instance
             * @name HTML
             * @memberOf window.exports.Modules
             * @readonly
             * @returns {String}
             */
            get: function() {
                return "html";
            }
            , enumerable: true
            , configurable: false
        }
        , "CSS" : {
            /** Template ITEM_TYPE constant
             * @instance
             * @name CSS
             * @memberOf window.exports.Modules
             * @readonly
             * @returns {String}
             */
            get: function() {
                return "css";
            }
            , enumerable: true
            , configurable: false
        }
        , "JAVASCRIPT" : {
            /** Template ITEM_TYPE constant
             * @instance
             * @name JAVASCRIPT
             * @memberOf window.exports.Modules
             * @readonly
             * @returns {String}
             */
            get: function() {
                return "javascript";
            }
            , enumerable: true
            , configurable: false
        }
    });

    /**
     * @namespace Modules.DOM
     * @memberOf Modules
     */
    (function (DOM) {
        /**
         * Return true if htmlElement is module
         * @method isHTMLModule
         * @memberOf Modules.DOM
         * @param {HTMLElement} htmlElement Any html element
         * @returns {boolean}
         */
        function isHTMLModule (htmlElement) {
            if (htmlElement.parentNode != null) {
                return htmlElement.parentNode.getAttribute("data-" + "modulesjs_item_type") === Modules.MODULE;
            } else {
                return false;
            }
        }
        /**
         * Return true if htmlElement is template
         * @method isHTMLTemplate
         * @memberOf Modules.DOM
         * @param {HTMLElement} htmlElement Any html element
         * @returns {boolean}
         */
        function isHTMLTemplate (htmlElement) {
            if (htmlElement.parentNode != null) {
                return htmlElement.parentNode.getAttribute("data-" + "modulesjs_item_type") === Modules.TEMPLATE;
            } else {
                return false;
            }
        }

        /**
         * Return Array of modules from all htmlElements with className
         * @method getModules
         * @memberOf Modules.DOM
         * @param {String} className ClassName for filter by module type
         * @returns {Array}
         */
        function getModules (className) {
            let elements = document.getElementsByClassName(className);
            let result = new Array();
            for (let i = 0; i < elements.length; i++) {
                if (isHTMLModule(elements[i])) {
                    result.push(elements[i]);
                }
            }
            return result;
        }

        /**
         * Return Array of templates from all htmlElements with className
         * @method getTemplates
         * @memberOf Modules.DOM
         * @param {String} className ClassName for filter by module type
         * @returns {Array}
         */
        function getTemplates (className) {
            let elements = document.getElementsByClassName(className);
            let result = new Array();
            for (let i = 0; i < elements.length; i++) {
                if (isHTMLTemplate(elements[i])) {
                    result.push(elements[i]);
                }
            }
            return result;
        }
        /**
         * Return htmlElement by className, which contains current htmlElement or Null, if container isn`t exist
         * @method getFirstContainerElementByClassName
         * @memberOf Modules.DOM
         * @param {HTMLElement|Node} htmlElement HTMLElement or Node, which contains in container with className
         * @param {String} className ClassName for container element
         * @returns {HTMLElement|Null}
         */
        function getFirstContainerElementByClassName (htmlElement, className) {
            if (htmlElement.className === className) {
                return htmlElement;
            } else {
                if (htmlElement.parentNode != null) {
                    return getFirstContainerElementByClassName(htmlElement.parentNode, className);
                }
                else {
                    return null;
                }
            }
        }

        /**
         * Wrapper for htmlElement.getElementsByClassName(className)[0];
         * @method getFirstElementByClassName
         * @memberOf Modules.DOM
         * @param {HTMLDocument} htmlDocument HTMLElement or Node, which contains desired element
         * @param {String} className ClassName for desired element
         * @returns {NodeList}
         */
        function getFirstElementByClassName (htmlDocument, className) {
            return htmlDocument.getElementsByClassName(className)[0];
        }

        /**
         * Get URL of document folder
         * @method getDocumentRootURL
         * @memberOf Modules.DOM
         * @returns {String} URL of document folder
         */
        function getDocumentRootURL() {
            let documentURL = document.URL.split("/");
            documentURL.pop();
            let documentRootURL = documentURL.join("/");
            return documentRootURL;
        }

        DOM.isHTMLModule = isHTMLModule;
        DOM.isHTMLTemplate = isHTMLTemplate;
        DOM.getModules = getModules;
        DOM.getTemplates = getTemplates;
        DOM.getFirstContainerElementByClassName = getFirstContainerElementByClassName;
        DOM.getFirstElementByClassName = getFirstElementByClassName;
        DOM.getDocumentRootURL = getDocumentRootURL;
    })(Modules.DOM || (Modules.DOM = {}));
    let DOM = Modules.DOM;

    /**
     * @namespace Modules.Events
     * @memberOf Modules
     */
    (function (Events) {
         /**
          * Add event listener
          * @method addListener
          * @memberOf Modules.Events
          * @param {HTMLElement} target Any html element
          * @param {String} type The event type for which the user is registering
          * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
          * contains the methods to be called when the event occurs
          * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
          * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
          * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
          * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
          * @returns {EventListener} Passed listener.
          */
        function addListener (target, type, listener, useCapture) {
             let _useCapture = useCapture || false;
             target.addEventListener(type, listener, _useCapture);
             return listener;
        };
        /**
         * Add event listener with bind context. Bypass problems where it's unclear what this will be,
         * depending on the context from which function was called
         * @method addContextListener
         * @memberOf Modules.Events
         * @param {HTMLElement} target Any html element
         * @param {String} type The event type for which the user is registering
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} [context="this"] Context scope for this inside listener
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
         * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addContextListener(target, type, listener, context, useCapture) {
            let _context = context || this;
            let _useCapture = useCapture || false;
            let bindedListener = listener.bind(_context);
            //noinspection JSUnresolvedFunction,JSUnresolvedVariable
            target.addEventListener(type, bindedListener, _useCapture);
            return bindedListener;
        }

        /**
         * Remove event listener
         * @method removeListener
         * @memberOf Modules.Events
         * @param {HTMLElement} target Any html element
         * @param {String} type The event type for which the user is removing
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree
         * If a listener was registered twice, one with capture and one without, each must be removed separately
         * Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa
         */
        function removeListener (target, type, listener, useCapture) {
            let _useCapture = useCapture || false;
            target.removeEventListener(type, listener, _useCapture);
        };

        /**
         * Add event listener, which launches when Document Object Model (DOM) Content Loaded
         * @method addStartupListener
         * @memberOf Modules.Events
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @returns {EventListener} Passed listener
         */
        function addStartupListener (listener) {
            addListener(document, "DOMContentLoaded", listener, false);
            return listener;
        };

        /**
         * Add event listener with bind context, which launches when Document Object Model (DOM) Content Loaded
         * @method addStartupContextListener
         * @memberOf Modules.Events
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} [context="this"] Context scope for this inside listener
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addStartupContextListener (listener, context) {
            let _context = context || this;
            return addContextListener(document, "DOMContentLoaded", listener, _context, false);
        };

        /**
         * Remove event listener, which launches when Document Object Model (DOM) Content loaded
         * @method removeStartupListener
         * @memberOf Modules.Events
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         */
        function removeStartupListener (listener) {
            removeListener(document, "DOMContentLoaded", listener, false);
        };

        /**
         * Add event listener for document target
         * @method addDocumentListener
         * @memberOf Modules.Events
         * @param {String} type The event type for which the user is removing
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree
         * If a listener was registered twice, one with capture and one without, each must be removed separately
         * Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa
         * @returns {EventListener} Passed listener.
         */
        function addDocumentListener (type, listener, useCapture) {
            //noinspection JSUnresolvedVariable
            addListener(document, type, listener, useCapture);
            return listener;
        };

        /**
         * Add event listener for document target with bind this context. Bypass problems where it's unclear what this will be,
         * depending on the context from which function was called
         * @method addDocumentContextListener
         * @memberOf Modules.Events
         * @param {String} type The event type for which the user is registering
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} [context="this"] Context scope for this inside listener
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
         * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addDocumentContextListener(type, listener, context, useCapture) {
            let _context = context || this;
            //noinspection JSUnresolvedFunction
            return addContextListener(document, type, listener, _context, useCapture)
        }

        /**
         * Remove event listener for document target
         * @method removeDocumentListener
         * @memberOf Modules.Events
         * @param {String} type The event type for which the user is removing
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree
         * If a listener was registered twice, one with capture and one without, each must be removed separately
         * Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa
         */
        function removeDocumentListener (type, listener, useCapture) {
            let _useCapture = useCapture || false;
            removeListener(document, type, listener, _useCapture);
        };

        /**
         * Add event listener, which launches when Modules.ITEM_TYPE loaded
         * @method addItemLoadedListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addItemLoadedListener(ITEM_TYPE, itemName, listener) {
             if (ITEM_TYPE === Modules.MODULE) {
                 return addListener(document, "module_" + itemName + "_loaded", listener, false);
             } else if (ITEM_TYPE === Modules.TEMPLATE) {
                 return addListener(document, "template_" + itemName + "_loaded", listener, false);
             } else if (ITEM_TYPE === Modules.HTML) {
                 return addListener(document, "html_" + itemName + "_loaded", listener, false);
             } else if (ITEM_TYPE === Modules.CSS) {
                 return addListener(document, "css_" + itemName + "_loaded", listener, false);
             } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                 return addListener(document, "js_" + itemName + "_loaded", listener, false);
             }
        }

        /**
         * Add event listener, which launches when Modules.ITEM_TYPE loaded with bind this context.
         * Bypass problems where it's unclear what this will be, depending on the context from which function was called
         * @method addItemLoadedContextListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} [context="this"] Context scope for this inside listener
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addItemLoadedContextListener (ITEM_TYPE, itemName, listener, context) {
            let _context = context || this;
            if (ITEM_TYPE === Modules.MODULE) {
                return addContextListener(document, "module_" + itemName + "_loaded", listener, _context, false);
            } else if (ITEM_TYPE === Modules.TEMPLATE) {
                return addContextListener(document, "template_" + itemName + "_loaded", listener, _context, false);
            } else if (ITEM_TYPE === Modules.HTML) {
                return addContextListener(document, "html_" + itemName + "_loaded", listener, _context, false);
            } else if (ITEM_TYPE === Modules.CSS) {
                return addContextListener(document, "css_" + itemName + "_loaded", listener, _context, false);
            } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                return addContextListener(document, "js_" + itemName + "_loaded", listener, _context, false);
            }
        }

        /**
         * Remove event listener, which launches when Modules.ITEM_TYPE loaded
         * @method removeItemLoadedListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we don`t want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         */
        function removeItemLoadedListener(ITEM_TYPE, itemName, listener) {
            if (ITEM_TYPE === Modules.MODULE) {
                removeListener(document, "module_" + itemName + "_loaded", listener, false);
            } else if (ITEM_TYPE === Modules.TEMPLATE) {
                removeListener(document, "template_" + itemName + "_loaded", listener, false);
            } else if (ITEM_TYPE === Modules.HTML) {
                removeListener(document, "html_" + itemName + "_loaded", listener, false);
            } else if (ITEM_TYPE === Modules.CSS) {
                removeListener(document, "css_" + itemName + "_loaded", listener, false);
            } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                removeListener(document, "js_" + itemName + "_loaded", listener, false);
            }
        }

        /**
         * Add event listener, which launches before Modules.ITEM_TYPE start loading
         * @method addBeforeItemLoadedListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addBeforeItemLoadedListener(ITEM_TYPE, itemName, listener) {
            if (ITEM_TYPE === Modules.MODULE) {
                return addListener(document, "module_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.TEMPLATE) {
                return addListener(document, "template_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.HTML) {
                return addListener(document, "html_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.CSS) {
                return addListener(document, "css_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                return addListener(document, "js_" + itemName + "_loadingStarted", listener, false);
            }
        }

        /**
         * Add event listener, which launches before Modules.ITEM_TYPE start loading, with bind this context.
         * Bypass problems where it's unclear what this will be, depending on the context from which function was called
         * @method addBeforeItemLoadedContextListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} [context="this"] Context scope for this inside listener
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addBeforeItemLoadedContextListener (ITEM_TYPE, itemName, listener, context) {
            let _context = context || this;
            if (ITEM_TYPE === Modules.MODULE) {
                return addContextListener(document, "module_" + itemName + "_loadingStarted", listener, _context, false);
            } else if (ITEM_TYPE === Modules.TEMPLATE) {
                return addContextListener(document, "template_" + itemName + "_loadingStarted", listener, _context, false);
            } else if (ITEM_TYPE === Modules.HTML) {
                return addContextListener(document, "html_" + itemName + "_loadingStarted", listener, _context, false);
            } else if (ITEM_TYPE === Modules.CSS) {
                return addContextListener(document, "css_" + itemName + "_loadingStarted", listener, _context, false);
            } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                return addContextListener(document, "js_" + itemName + "_loadingStarted", listener, _context, false);
            }
        }

        /**
         * Remove event listener, which launches before Modules.ITEM_TYPE start loading
         * @method removeBeforeItemLoadedListener
         * @memberOf Modules.Events
         * @param {String} ITEM_TYPE Modules.ITEM_TYPE constant
         * @param {String} itemName The name of item, where we don`t want to track loading
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         */
        function removeBeforeItemLoadedListener(ITEM_TYPE, itemName, listener) {
            if (ITEM_TYPE === Modules.MODULE) {
                removeListener(document, "module_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.TEMPLATE) {
                removeListener(document, "template_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.HTML) {
                removeListener(document, "html_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.CSS) {
                removeListener(document, "css_" + itemName + "_loadingStarted", listener, false);
            } else if (ITEM_TYPE === Modules.JAVASCRIPT) {
                removeListener(document, "js_" + itemName + "_loadingStarted", listener, false);
            }
        }

        /**
         * Add event listener to all targets
         * @method addListeners
         * @memberOf Modules.Events
         * @param {NodeList} targets NodeList of any html elements
         * @param {String} type The event type for which the user is registering
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
         * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
         * @returns {EventListener} Passed listener
         */
        function addListeners(targets, type, listener, useCapture) {
            let _useCapture = useCapture || false;
            let length = targets.length;
            for (let i = 0; i < length; i++) {
                targets[i].addEventListener(type, listener, _useCapture);
            }
            return listener;
        }

        /**
         * Add event listener to all targets with bind this context. Bypass problems where it's unclear what this will be,
         * depending on the context from which function was called
         * @method addContextListeners
         * @memberOf Modules.Events
         * @param {NodeList} targets NodeList of any html elements
         * @param {String} type The event type for which the user is registering
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {object} context Context scope for this inside listener
         * @param {boolean} [useCapture=false="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
         * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
         * @returns {EventListener} Listener in context. Need for remove listener
         */
        function addContextListeners(targets, type, listener, context, useCapture) {
            let _useCapture = useCapture || false;
            let _context = context || this;
            //noinspection JSUnresolvedFunction
            let bindedListener = listener.bind(_context);
            let length = targets.length;
            for (let i = 0; i < targets.length; i++) {
                targets[i].addEventListener(type, bindedListener, _useCapture);
            }
            return bindedListener;
        }

        /**
         * Remove event listener from all targets
         * @method removeListeners
         * @memberOf Modules.Events
         * @param {NodeList} targets NodeList of any html elements
         * @param {String} type The event type for which the user is removing
         * @param {EventListener} listener The listener parameter takes an interface implemented by the user which
         * contains the methods to be called when the event occurs
         * @param {boolean} [useCapture="false"] If true, useCapture indicates that the user wishes to initiate capture.
         * After initiating capture, all events of the specified type will be dispatched to the registered EventListener
         * before being dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through
         * the tree will not trigger an EventListener designated to use capture. Event phases: capture -> target -> bubble
         */
        function removeListeners (targets, type, listener, useCapture) {
            let _useCapture = useCapture || false;
            let length = targets.length;
            for (let i = 0; i < length; i++) {
                removeListener(targets[i], type, listener, _useCapture);
            }
        }

        /**
         * Dispatch the DOM event, initialized by an application for any purpose
         * @method dispatchCustomEvent
         * @memberOf Modules.Events
         * @param {HTMLElement} target Any html element
         * @param {String} type The name of the custom event
         * @param {any} [detail="Null"] A user-defined object that can contain additional information about the event
         * @param {boolean} [canBubble="true"] Whether the event propagates upward
         * @param {boolean} [cancelable="true"] Whether the event is cancelable and so preventDefault can be called
         * @returns {boolean} The return value is false if at least one of the event handlers which handled this event
         * called Event.preventDefault(). Otherwise it returns true
         */
        function dispatchCustomEvent (target, type, detail, canBubble, cancelable) {
            let _canBubble = canBubble || false;
            let _cancelable = cancelable || false;
            let _detail = detail || undefined;
            let event = document.createEvent("CustomEvent");
            event.initCustomEvent(type, _canBubble, _cancelable, _detail);
            return target.dispatchEvent(event);
        }

        /**
         * Communication between itemTypes within the document
         * @namespace Modules.Events.Messages
         * @memberOf Modules.Events
         */
        (function (Messages) {

            /**
             * Subscribe listener on messages theme
             * @method subscribe
             * @memberOf Modules.Events.Messages
             * @param {String} theme Unique theme of message within the page
             * @param {EventListener} listener Listener for receive messages
             * @param {String} [sourceID = null] Unique ID of sender
             * @param {String} [destinationID = null] Unique ID of receiver
             */
            function subscribe (theme, listener, sourceID, destinationID) {
                let messagePrefix = "modulesjs_message_";
                let calculatedTheme = calculateTheme();

                function calculateTheme() {
                    let _calculatedTheme = "";
                    if (sourceID == null) {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "__" + destinationID;
                        }
                    } else {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID + "_" + destinationID;
                        }
                    }
                    return _calculatedTheme;
                }

                if (calculatedTheme != "") {
                    Modules.Events.addDocumentListener(calculatedTheme, listener, false);
                }
            }

            /**
             * Send message to subscribed listeners
             * @method send
             * @memberOf Modules.Events.Messages
             * @param {String} theme Unique theme of message within the page
             * @param {any} [detail = null] A user-defined object that can contain detail information in message
             * @param {String} [sourceID = null] Unique ID of sender
             * @param {String} [destinationID = null] Unique ID of receiver
             */
            function send (theme, detail, sourceID, destinationID) {
                let messagePrefix = "modulesjs_message_";
                let calculatedTheme = calculateTheme();

                function calculateTheme() {
                    let _calculatedTheme = "";
                    if (sourceID == null) {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "__" + destinationID;
                        }
                    } else {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID + "_" + destinationID;
                        }
                    }
                    return _calculatedTheme;
                }

                let detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};

                if (calculatedTheme !== "") {
                    Modules.Events.dispatchCustomEvent(document, calculatedTheme, detailObject, false, false);
                }
            }

            /**
             * Subscribe listener on messages theme
             * @method unsubscribe
             * @memberOf Modules.Events.Messages
             * @param {String} theme Unique theme of message within the page
             * @param {EventListener} listener Listener for unsubscribe, used for receive messages
             * @param {String} [sourceID = null] Unique ID of sender
             * @param {String} [destinationID = null] Unique ID of receiver
             */
            function unsubscribe (theme, listener, sourceID, destinationID) {
                let messagePrefix = "modulesjs_message_";
                let calculatedTheme = calculateTheme();
                function calculateTheme() {
                    let _calculatedTheme = "";
                    if (sourceID == null) {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "__" + destinationID;
                        }
                    } else {
                        if (destinationID == null) {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID;
                        } else {
                            _calculatedTheme = messagePrefix + theme + "_" + sourceID + "_" + destinationID;
                        }
                    }
                    return _calculatedTheme;
                }

                if (calculatedTheme !== "") {
                    Modules.Events.removeDocumentListener(calculatedTheme, listener);
                }
            }
            Messages.send = send;
            Messages.subscribe = subscribe;
            Messages.unsubscribe = unsubscribe;
        })(Modules.Events.Messages || (Modules.Events.Messages = {}));
        let Messages = Modules.Events.Messages;

        Events.addListener = addListener;
        Events.addContextListener = addContextListener;
        Events.removeListener = removeListener;
        Events.addStartupListener = addStartupListener;
        Events.addStartupContextListener = addStartupContextListener;
        Events.removeStartupListener = removeStartupListener;
        Events.addDocumentListener = addDocumentListener;
        Events.addDocumentContextListener = addDocumentContextListener;
        Events.removeDocumentListener = removeDocumentListener;
        Events.addItemLoadedListener = addItemLoadedListener;
        Events.addItemLoadedContextListener = addItemLoadedContextListener;
        Events.removeItemLoadedListener = removeItemLoadedListener;
        Events.addBeforeItemLoadedListener = addBeforeItemLoadedListener;
        Events.addBeforeItemLoadedContextListener = addBeforeItemLoadedContextListener;
        Events.removeBeforeItemLoadedListener = removeBeforeItemLoadedListener;
        Events.addListeners = addListeners;
        Events.addContextListeners = addContextListeners;
        Events.removeListeners = removeListeners;
        Events.dispatchCustomEvent = dispatchCustomEvent;
    })(Modules.Events || (Modules.Events = {}));
    let Events = Modules.Events;

    (function (L18N) {
        function localize(langObject) {
            for (let property in langObject) {
                if (langObject.hasOwnProperty(property)) {
                    let elements = document.getElementsByClassName(property);
                    for (let i = 0; i < elements.length; i++ ) {
                        elements[i].innerHTML = langObject[property];
                    }
                }
            }
        };

        // function switchLocalize (theme, detail, sourceID, destinationID) {
        //     let messagePrefix = "modulesjs_message_";
        //     let calculatedTheme = calculateTheme();
        //
        //     function calculateTheme() {
        //         let _calculatedTheme = "";
        //         if (sourceID == null) {
        //             if (destinationID == null) {
        //                 _calculatedTheme = messagePrefix + theme;
        //             } else {
        //                 _calculatedTheme = messagePrefix + theme + "__" + destinationID;
        //             }
        //         } else {
        //             if (destinationID == null) {
        //                 _calculatedTheme = messagePrefix + theme + "_" + sourceID;
        //             } else {
        //                 _calculatedTheme = messagePrefix + theme + "_" + sourceID + "_" + destinationID;
        //             }
        //         }
        //         return _calculatedTheme;
        //     }
        //
        //     let detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
        //
        //     if (calculatedTheme !== "") {
        //         Modules.Events.dispatchCustomEvent(document, calculatedTheme, detailObject, false, false);
        //     }
        // }

        L18N.localize = localize;
    })(Modules.L18N || (Modules.L18N = {}));
    let L18N = Modules.L18N;
    /**
     * @namespace Modules.Loader
     * @memberOf Modules
     */
    (function (Loader) {


//        /**
//         * Return true if htmlElement is module
//         * @method isHTMLModule
//         * @memberOf Modules.DOM
//         * @param {HTMLElement} htmlElement Any html element
//         * @returns {boolean}
//         */
//        function isHTMLModule (htmlElement) {
//            if (htmlElement.parentNode != null) {
//                return htmlElement.parentNode.getAttribute("data-" + "modulesjs_item_type") === "module";
//            } else {
//                return false;
//            }
//        }



        function _buildFilePath(path, name) {
            let result = path + "/" + name;
            return result;
        }

        function _buildTemplatePath(path, name) {
            let result = path + "/" + name + "/" + name;
            return result;
        }

        function _replace$PlaceholdersInTemplate(responseText, name, simpleDataSource) {
            let keys = Object.keys(simpleDataSource);
            let placeholder, value;
            let result = responseText;
            for (let i = 0; i < keys.length; i++) {
                placeholder = keys[i];
                value = simpleDataSource[keys[i]];
                result = result.split('$' + placeholder + ';').join(value);
            }
            return result;
        }

        function _addUUIDAttribute(responseText, itemNumber, name) {
            let dom = document.createElement('div');
            dom.innerHTML = responseText;
            let element = dom.getElementsByClassName('fileInfo')[0];
            element.setAttribute('uuid', itemNumber);
            return element.outerHTML;
        }


//        function loadTemplate (path, templateName, className, dataSource, callback, container) {
//            document.getElementsByClassName(className).innerHTML = "";
//            let htmlItemType = "template";
//            setTimeout(function(){
//                loadSync(path, templateName, className, dataSource, htmlItemType, callback, container);
//            }, 0);
//            function loadSync(path, templateName, className, dataSource, htmlItemType, callback, container) {
//                let templatePath = _buildTemplatePath(path, templateName);
//                dispatchCustomEvent(document, "template_" + templateName + "_loadingStarted",
//                    {"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
//                function htmlLoadedHandler(responseText, name) {
//                    let result = '';
//                    let stepResult = '';
//                    //plain object
//                    if (dataSource.length === undefined) {
//                        result = _replace$PlaceholdersInTemplate(responseText, name, dataSource);
//                        result = _addUUIDAttribute(result, 0, templateName);
//                    }
//                    //list
//                    else {
//                        for (let i = 0; i < dataSource.length; i++) {
//                            stepResult = _replace$PlaceholdersInTemplate(responseText, name, dataSource[i]);
//                            stepResult = _addUUIDAttribute(stepResult, i, templateName);
//                            result += stepResult;
//                        }
//                    }
//                    _renderHTML(result, className, htmlItemType, container, function(){
//                        _loadJS(templatePath, templateName, function() {
//                            dispatchDocumentCustomEvent("template_" + templateName + "_loaded"
//                                ,{"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
//                            if (callback) {
//                                callback();
//                            }
//                        });
//                    });
//                }
//                _loadCSS(templatePath, templateName, function() {
//                    _loadHTMLInMemory(templatePath, templateName, htmlLoadedHandler);
//                });
//
//            }
//        };
//        function loadHTML (path, fileName, className, callback, container) {
//            let htmlItemType = "file";
//            setTimeout(function(){
//                loadSync(path, fileName, className, htmlItemType, callback, container);
//            }, 0);
//            function loadSync(path, fileName, className, htmlItemType, callback, container) {
////                if ( fileName.length )
//                let htmlPath = _buildFilePath(path, fileName);
//                dispatchCustomEvent(document, "html_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
//                _loadHTML(htmlPath, fileName, className, htmlItemType, container, function() {
//                    dispatchDocumentCustomEvent("html_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
//        function loadJS (path, fileName, callback) {
//            loadAsync(path, fileName, callback);
//            function loadAsync(path, fileName, callback) {
//                setTimeout(function(){
//                    loadSync(path, fileName, callback);
//                }, 0);
//            }
//            function loadSync(path, fileName,  callback) {
//                let jsPath = _buildFilePath(path, fileName);
//                this.dispatchCustomEvent(document, "js_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "jsPath": jsPath, "path" : path}});
//                _loadJS(jsPath, fileName, function() {
//                    dispatchDocumentCustomEvent("js_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "jsPath": jsPath, "path" : path}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
//        function loadCSS (path, fileName, callback) {
//            loadAsync(path, fileName, callback);
//            function loadAsync(path, fileName, callback) {
//                setTimeout(function(){
//                    loadSync(path, fileName, callback);
//                }, 0);
//            }
//            function loadSync(path, fileName, callback) {
//                let cssPath = _buildFilePath(path, fileName);
//                this.dispatchCustomEvent(document, "css_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "cssPath": cssPath, "path" : path}});
//                _loadCSS(cssPath, fileName, function() {
//                    dispatchDocumentCustomEvent("css_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "cssPath": cssPath, "path" : path}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
        /**
         * Check path correctness
         * @private
         * @method _checkPath
         * @memberOf Modules.Loader
         * @param {String} path Location of the items
         * @returns {String} Correct path or page directory
         */
        function _checkPath(path) {
            let documentRootURL = Modules.DOM.getDocumentRootURL();
            if (typeof (path) == "string") {
                if (path[path.length-1] != "/") {
                    if (path[0] != "/") {
                        return documentRootURL + "/" + path + "/";
                    }
                    else {
                        return documentRootURL + path + "/";
                    }
                }
                else {
                    if (path[0] != "/") {
                        return documentRootURL + "/" + path;
                    } else {
                        return documentRootURL + path;
                    }
                }
            }
            else {
                return documentRootURL + "/";
            }
        }

        /**
         * Check name correctness (remove extension for internal use)
         * @private
         * @method _checkName
         * @memberOf Modules.Loader
         * @param {String} itemName Location of the items
         * @returns {String} Correct path or page directory
         */
        function _checkName(itemName) {
            let correctName = itemName;
            if (typeof (itemName) == "string") {
                if (itemName.indexOf('.') === -1) {
                    return correctName;
                } else {
                    correctName = itemName.substr(0, itemName.lastIndexOf('.')) || itemName;
                    return correctName;
                }
            }
            else {
                console.warn("Error: itemName " + itemName + "is not string!");
            }
        }

        /**
         * Build path to module directory
         * @private
         * @method _buildModulePath
         * @memberOf Modules.Loader
         * @param {String} path Location of the modules directory
         * @param {String} moduleName Name of the current module
         * @returns {String} Path to the current module directory
         */
        function _buildModulePath(path, moduleName) {
            let result = path + moduleName + "/";
            return result;
        }

        /**
         * Load CSS file to the document (adding correct link to the file)
         * @private
         * @method _loadCSS
         * @memberOf Modules.Loader
         * @param {String} correctPath Location of the CSS file
         * @param {String} itemName Name of the CSS file
         * @param {Function} callback Callback is called when the CSS file loaded on the page
         */
        function _loadCSS (correctPath, itemName, callback) {
            let modulesCSSprefix = "modulesjs_css_";

            let itemData = {"itemInfo": { "itemName" : itemName, "itemPath": correctPath }};
            Modules.Events.dispatchCustomEvent(document, "css_" + itemName + "_loadingStarted", itemData);

            let cssLoaded = document.getElementsByClassName(modulesCSSprefix + itemName)[0];
            if (!cssLoaded) {
                let css = document.createElement('link');
                css.href = correctPath + itemName + ".css";
                css.className = modulesCSSprefix + itemName;
                css.type = "text/css";
                css.rel = "stylesheet";
                document.getElementsByTagName("head")[0].appendChild(css);
            }

            Modules.Events.dispatchCustomEvent(document, "css_" + itemName + "_loaded", itemData);

            if (callback) {
                callback();
            }
        }

        /**
         * Unload CSS from the document
         * @private
         * @method _unloadCSS
         * @memberOf Modules.Loader
         * @param {String} itemName Name of the CSS file
         * @param {Function} callback Callback is called when the CSS file unloaded on the page
         */
        function _unloadCSS(itemName, callback) {
            //TODO: check, that not one module is not used this CSS, which unloading. Need to store loaded modules info?
            let modulesCSSprefix = "modulesjs_css_";
            let cssLoaded = document.getElementsByClassName(modulesCSSprefix + itemName)[0];
            if (cssLoaded) {
                document.getElementsByTagName("head")[0].removeChild(cssLoaded);
            }
            if (callback) {
                callback();
            }
        }

        function _loadL18NJS (correctPath, itemName, l18n, callback) {
            if ((l18n != null) && (l18n.length > 0)) {
                let locN = 0;
                let _nextL18NJSLoaded = function () {
                    locN++;
                    if (locN < l18n.length) {
                        _loadNextL18NJS(l18n[locN], correctPath, itemName, _nextL18NJSLoaded);
                    } else {
                        callback(itemName);
                    }
                };

                _loadNextL18NJS(l18n[locN], correctPath, itemName, _nextL18NJSLoaded);

            } else {
                callback();
            }


        }

        function _loadNextL18NJS(loc, correctPath, itemName, callback) {
            let modulesJsPrefix = "modulesjs_l18n_js_";
            let locFolderName = "l18n/";

            let itemData = {"itemInfo": { "itemName" : itemName, "itemPath": correctPath }};
            Modules.Events.dispatchCustomEvent(document, "javascript_l18n_" + itemName + "_" + loc + "_loadingStarted", itemData);

            let jsLoaded = document.getElementsByClassName(modulesJsPrefix + itemName + "_" + loc)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }

            let script = document.createElement('script');
            script.src = correctPath + locFolderName + loc + ".js";
            script.className = modulesJsPrefix + itemName + "_" + loc;
            script.type = "text/javascript";
            script.async = true;
            document.getElementsByTagName("head")[0].appendChild(script);
            let done = false;
            script.onreadystatechange = script.onload = function () {
                let state = script.readyState;
                if (!done && (!state || state === "loaded" || state === "complete")) {
                    done = true;
                    Modules.Events.dispatchCustomEvent(document, "javascript_l18n_" + itemName + "_" + loc + "_loaded", itemData);
                    if (callback) {
                        callback();
                    }
                }
            };
        }

        /**
         * Load JavaScript file to the document (adding correct link to the file)
         * @private
         * @method _loadJS
         * @memberOf Modules.Loader
         * @param {String} correctPath Location of the JavaScript file
         * @param {String} itemName Name of the JavaScript file
         * @param {Function} callback Callback is called when the JavaScript file loaded on the page
         */
        function _loadJS (correctPath, itemName, callback) {
            let modulesJsPrefix = "modulesjs_js_";

            let itemData = {"itemInfo": { "itemName" : itemName, "itemPath": correctPath }};
            Modules.Events.dispatchCustomEvent(document, "javascript_" + itemName + "_loadingStarted", itemData);

            let jsLoaded = document.getElementsByClassName(modulesJsPrefix + itemName)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }

            let script = document.createElement('script');
            script.src = correctPath + itemName + ".js";
            script.className = modulesJsPrefix + itemName;
            script.type = "text/javascript";
            script.async = true;
            document.getElementsByTagName("head")[0].appendChild(script);
            let done = false;
            script.onreadystatechange = script.onload = function () {
                let state = script.readyState;
                if (!done && (!state || state === "loaded" || state === "complete")) {
                    done = true;
                    Modules.Events.dispatchCustomEvent(document, "javascript_" + itemName + "_loaded", itemData);
                    if (callback) {
                        callback(itemName);
                    }
                }
            };
        }

        /**
         * Unload JavaScript from the document
         * @private
         * @method _unloadJS
         * @memberOf Modules.Loader
         * @param {String} itemName Name of the JavaScript file
         * @param {Function} callback Callback is called when the JavaScript file loaded on the page
         */
        function _unloadJS(itemName, callback) {
            //TODO: check, that not one module is not used this js, which unloading
            let modulesJsPrefix = "modulesjs_js_";
            let jsLoaded = document.getElementsByClassName(modulesJsPrefix + itemName)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }
            if (callback) {
                callback();
            }
        }

        /**
         * Load content of HTML file to the document
         * @private
         * @method _loadHTML
         * @memberOf Modules.Loader
         * @param {String} pathToItemFiles Location of the HTML file
         * @param {String} itemName Name of the HTML file
         * @param {String} className Class on page for loading item
         * @param {String} itemType ITEM_TYPE constant for item type. See {@link window.exports.Modules}
         * @param {String} [containerClassName = undefined] Container class of className for adequate definition place for item loading
         * @param {Function} callback Callback is called when the content of the HTML file loaded on the document
         */
        function _loadHTML(pathToItemFiles, itemName, className, itemType, containerClassName, callback) {
            function loadedHandler(responseText, name) {
                _renderHTML(responseText, className, itemType, containerClassName, callback);
            }
            _loadHTMLInMemory(pathToItemFiles, itemName, loadedHandler);
        }

        function _loadHTMLTemplate(pathToItemFiles, itemName, className, itemType, containerClassName, dataSource, callback) {
            function loadedHandler(responseText, name) {
                let templatedText = insertTemplate(responseText, dataSource);
                _renderHTML(templatedText, className, itemType, containerClassName, callback);
            }
            _loadHTMLInMemory(pathToItemFiles, itemName, loadedHandler);
        }

        function insertTemplate (responseText, dataSource) {
            for (let key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    responseText = replaceAll(responseText, "$" + key + ";", dataSource[key]);
                }
            }

            function replaceAll(str, find, replace) {
                return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
            }
            //for secure replace
            function escapeRegExp(str) {
                return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            }

            return responseText;
        }

        /**
         * Unload content of HTML file from the document
         * @private
         * @method _unloadHTML
         * @memberOf Modules.Loader
         * @param {String} itemName Name of the HTML file
         * @param {String} className Class on page for unloading item
         * @param {String} itemType ITEM_TYPE constant for item type. See {@link window.exports.Modules}
         * @param {String} [containerClassName = undefined] Container class of className for adequate definition place for item unloading
         * @param {Function} callback Callback is called when the content of the HTML file unloaded from the document
         */
        function _unloadHTML(itemName, className, itemType, containerClassName, callback) {
            if (containerClassName != null) {
                let containerElement = document.getElementsByClassName(containerClassName);
                let containerElementLength = containerElement.length;
                for (let currentContainerElement = 0; currentContainerElement < containerElementLength; currentContainerElement ++) {
                    let elementClasses = containerElement.getElementsByClassName(className);
                    unloadContentFromElementClasses(elementClasses);
                }
            } else {
                let elementClasses = document.getElementsByClassName(className);
                unloadContentFromElementClasses(elementClasses);
            }

            function unloadContentFromElementClasses (elementClasses) {
                let classesCount = elementClasses.length;
                for (let htmlID = 0; htmlID < classesCount; htmlID++) {
                    elementClasses[htmlID].removeAttribute("data-" + "modulesjs_item_id");
                    elementClasses[htmlID].removeAttribute("data-" + "modulesjs_item_type");
                    elementClasses[htmlID].innerHTML = "";
                }
            }

            if (callback) {
                callback();
            }
        }

        /**
         * Render HTML content on the document
         * @private
         * @method _renderHTML
         * @memberOf Modules.Loader
         * @param {String} HTMLContent HTML content for rendering
         * @param {String} className Class on document for loading item
         * @param {String} itemType ITEM_TYPE constant for item type. See {@link window.exports.Modules}
         * @param {String} [containerClassName = undefined] Container class of className for adequate definition place for loading item
         * @param {Function} callback Callback is called when the content of the HTML file rendered on the document
         */
        function _renderHTML(HTMLContent, className, itemType, containerClassName, callback) {
            if (containerClassName != null) {
                let containerElement = document.getElementsByClassName(containerClassName);
                let containerElementLength = containerElement.length;
                for (let currentContainerElement = 0; currentContainerElement < containerElementLength; currentContainerElement ++) {
                    let elementClasses = containerElement.getElementsByClassName(className);
                    loadContentInElementClasses(elementClasses);
                }
            } else {
                let elementClasses = document.getElementsByClassName(className);
                loadContentInElementClasses(elementClasses);
            }

            function loadContentInElementClasses (elementClasses) {
                let classesCount = elementClasses.length;
                for (let htmlID = 0; htmlID < classesCount; htmlID++) {
                    elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_id", htmlID.toString());
                    elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_type", itemType);
                    elementClasses[htmlID].innerHTML = HTMLContent;
                }
            }

            if (callback) {
                callback();
            }
        }

        /**
         * Load HTML content from file in memory (passed in callback parameter (HTMLContent, itemName))
         * @private
         * @method _loadHTMLInMemory
         * @memberOf Modules.Loader
         * @param {String} pathToItemFiles Location of the HTML file
         * @param {String} itemName Name of the HTML file
         * @param {Function} callback Callback is called when the content of the HTML file loaded in the memory
         */
        function _loadHTMLInMemory(pathToItemFiles, itemName, callback) {
            let xhrHtmlLoader = new XMLHttpRequest();
            xhrHtmlLoader.open("GET", pathToItemFiles  + ".html", true);
            xhrHtmlLoader.onreadystatechange = function() {
                if (xhrHtmlLoader.readyState === 4 /* complete */) {
                    if (xhrHtmlLoader.status === 200 || xhrHtmlLoader.status === 304) {
                        if (callback) {
                            callback(xhrHtmlLoader.responseText, itemName);
                        }
                    }
                }
            };
            xhrHtmlLoader.send(null);
        }

        /**
         * Load module in className from path
         * @private
         * @method _loadModule
         * @memberOf Modules.Loader
         * @param {String} correctPath Location of the items folder, checked with _checkPath
         * @param {String} moduleName Name of the item
         * @param {String} className Class on page for loading item
         * @param {Function} callback Callback is called when item loaded
         * @param {String} [containerClassName = undefined] Container class of className for adequate definition place for item loading
         */
        function _loadModule (correctPath, moduleName, className, callback, l18n, containerClassName) {
            requestAnimationFrame(function(){
                loadSync(correctPath, moduleName, className, callback, containerClassName);
            });

            function loadSync (correctPath, moduleName, className, callback, containerClassName) {
                let modulePath = _buildModulePath(correctPath, moduleName);

                let itemData = {"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className,
                    "containerClassName" : containerClassName}};

                Modules.Events.dispatchCustomEvent(document, "module_" + moduleName + "_loadingStarted", itemData);

                let pathToModuleFiles = modulePath + moduleName;

                _loadCSS(modulePath, moduleName, function() {
                    _loadHTML(pathToModuleFiles, moduleName, className, Modules.MODULE, containerClassName, function() {
                         _loadL18NJS(modulePath, moduleName, l18n, function () {
                            _loadJS(modulePath, moduleName, function() {
                                Modules.Events.dispatchCustomEvent(document, "module_" + moduleName + "_loaded", itemData);
                                if (callback) {
                                    callback();
                                }
                            });
                         });
                    });
                });
            }
        }

        function _loadTemplate(correctPath, moduleName, className, callback, containerClassName, dataSource) {
            requestAnimationFrame(function(){
                loadSync(correctPath, moduleName, className, callback, containerClassName);
            });

            function loadSync (correctPath, moduleName, className, callback, containerClassName) {
                let modulePath = _buildModulePath(correctPath, moduleName);

                let itemData = {"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className,
                    "containerClassName" : containerClassName}};

                Modules.Events.dispatchCustomEvent(document, "template_" + moduleName + "_loadingStarted", itemData);

                let pathToModuleFiles = modulePath + moduleName;

                _loadCSS(modulePath, moduleName, function() {
                    _loadHTMLTemplate(pathToModuleFiles, moduleName, className, Modules.MODULE, containerClassName, dataSource, function() {
                        _loadJS(modulePath, moduleName, function() {
                            Modules.Events.dispatchCustomEvent(document, "template_" + moduleName + "_loaded", itemData);
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            }
        }

        /**
         * Get number of modules loaded on the page
         * @private
         * @method _getModulesNumberLoaded
         * @memberOf Modules.Loader
         * @param {String} moduleName Name of the item
         * @returns {Number} Number of loaded modules
         */
        function _getModulesNumberLoaded(moduleName) {
            let modules = document.getElementsByClassName(moduleName);
            return modules.length;
        }

        /**
         * Unload module from className
         * @private
         * @method _unloadModule
         * @memberOf Modules.Loader
         * @param {String} correctPath Location of the items folder, checked with _checkPath
         * @param {String} moduleName Name of the item
         * @param {String} className Class on page for loading item
         * @param {Function} callback Callback is called when item loaded
         * @param {String} [containerClassName = undefined] Container class of className for adequate definition place for item loading
         */
        function _unloadModule(moduleName, className, callback, containerClassName) {
            requestAnimationFrame(function(){
                unloadSync(moduleName, className, callback, containerClassName);
            });

            function unloadSync (moduleName, className, callback, containerClassName) {
                let itemData = {"itemInfo": {"itemName" : moduleName, "className": className,
                    "containerClassName" : containerClassName, "isJSCSSUnloaded": false}};
                Modules.Events.dispatchCustomEvent(document, "module_" + moduleName + "_unloadingStarted", itemData);

                let loadedModulesNumber = _getModulesNumberLoaded(moduleName);
                if (loadedModulesNumber > 1) {
                    _unloadHTML(moduleName, className, Modules.MODULE, containerClassName, function() {
                        itemData.isJSCSSUnloaded = true;
                        Modules.Events.dispatchCustomEvent(document, "module_" + moduleName + "_unloaded", itemData);
                        if (callback) {
                            callback();
                        }
                    });
                } else if ((loadedModulesNumber === 1)) {
                    _unloadJS(moduleName, function() {
                        _unloadHTML(moduleName, className, Modules.MODULE, containerClassName, function() {
                            _unloadCSS(moduleName, function() {
                                itemData.isJSCSSUnloaded = false;
                                Modules.Events.dispatchCustomEvent(document, "module_" + moduleName + "_unloaded", itemData);
                                if (callback) {
                                    callback();
                                }
                            });
                        });
                    });
                }

            }
        }

        /**
         * Load modules.js module in className from path
         * @method loadModule
         * @memberOf Modules.Loader
         * @param {String | undefined} relativePath Relative path to the items folder
         * @param {String} moduleName Name of the module
         * @param {String} className Class on the page for loading item
         * @param {Function} callback Callback is called when item loaded
         * @param {String} containerClassName Class on the page, which parent for class for loading item
         */
        function loadModule (relativePath, moduleName, className, callback, l18n, containerClassName) {
            let _correctPath = _checkPath(relativePath);
            _loadModule(_correctPath, moduleName, className, callback, l18n, containerClassName);
        }

        function loadTemplate (relativePath, moduleName, className, dataSource, callback, containerClassName) {
            let _correctPath = _checkPath(relativePath);
            _loadTemplate(_correctPath, moduleName, className, callback, containerClassName, dataSource);
        }

        function onTemplateLoaded (templateName, handle) {
            let templateElements = document.getElementsByClassName(templateName);
            for (let currentId = 0; currentId < templateElements.length; currentId++) {
                if (templateElements[currentId].getAttribute("data-" + "templateLoaded") == null) {
                    handle(templateElements[currentId], currentId);
                    templateElements[currentId].setAttribute("data-" + "templateLoaded", true);
                }
            }
        }

        /**
         * Load javascript file in className from path
         * @method loadJS
         * @memberOf Modules.Loader
         * @param {String | undefined} relativePath Relative path to the items folder
         * @param {String} itemName Name of the item
         * @param {Function} callback Callback is called when item loaded
         */
        function loadJS (relativePath, itemName, callback) {
            let _correctPath = _checkPath(relativePath);
            let _correctName = _checkName(itemName);
            _loadJS(_correctPath, _correctName, callback);
        }

        /**
         * Load css file in className from path
         * @method loadCSS
         * @memberOf Modules.Loader
         * @param {String | undefined} relativePath Relative path to the items folder
         * @param {String} itemName Name of the item
         * @param {Function} callback Callback is called when item loaded
         */
        function loadCSS (relativePath, itemName, callback) {
            let _correctPath = _checkPath(relativePath);
            let _correctName = _checkName(itemName);
            _loadCSS(_correctPath, _correctName, callback);
        }

        /**
         * Load itemType in className from path
         * @deprecated Since version 1.0
         * @method load
         * @memberOf Modules.Loader
         * @param {String} itemType ITEM_TYPE constant for item type. See {@link window.exports.Modules}
         * @param {String | undefined} relativePath Relative path to the items folder
         * @param {String} itemName Name of the item
         * @param {String} className Class on the page for loading item
         * @param {Function} callback Callback is called when item loaded
         * @param {String} containerClassName Class on the page, which parent for class for loading item
         * @param {Object} dataSource Object with data for Modules.TEMPLATE
         */
        function load (itemType, relativePath, itemName, className, callback, containerClassName, dataSource) {
            if (itemType === Modules.MODULE) {
                loadModule(relativePath, itemName, className, callback, containerClassName);
            }
            if (itemType === Modules.JAVASCRIPT) {
                loadJS(relativePath, itemName, callback);
            }
            if (itemType === Modules.CSS) {
                loadCSS(relativePath, itemName, callback);
            }

// else if (itemType === this.itemTypes.template) {
//                loadTemplate(this.path, itemName, className, dataSource, callback, container);
//            } else if (itemType === this.itemTypes.html) {
//                loadHTML(this.path, itemName, className, callback, container);
//            } else if (itemType === this.itemTypes.css) {
//                loadCSS(this.path, itemName, callback);
//            } else if (itemType === this.itemTypes.javascript) {
//                loadJS(this.path, itemName, callback);
//            }
        }

//
        /**
         * Unload itemType in className
         * @method unload
         * @memberOf Modules.Loader
         * @param {String} itemType ITEM_TYPE constant for item type. See {@link window.exports.Modules}
         * @param {String} itemName Name of the item
         * @param {String} className Class on the page for unloading item
         * @param {Function} callback Callback is called when item unloaded
         * @param {String} container Class on the page, which parent for class for unloading item
         */
        function unload(itemType, itemName, className, callback, container) {
            if (itemType === Modules.MODULE) {
                _unloadModule(itemName, className, callback, container);
            }
        }

        Loader.loadModule = loadModule;
        Loader.loadTemplate = loadTemplate;
        Loader.onTemplateLoaded = onTemplateLoaded;
        Loader.loadJS = loadJS;
        Loader.loadCSS = loadCSS;
        Loader.load = load;
        Loader.unload = unload;
    })(Modules.Loader || (Modules.Loader = {}));
    let Loader = Modules.Loader;

//    Modules.Loader = (function () {
//        function Loader(path) {
//            if (path != undefined) {
//                if (path[path.length-1] === "/") {
//                    path = path.substring(0, path.length - 1);
//                }
//                this._path = path;
//            }
//            else {
//                this._path = "";
//            }
//

//
//        }
//        Loader.prototype = {
//            constructor: Loader,
//            get path () {
//                return this._path;
//            }

//        }

//        function _loadCSS(path, name, callback) {
//            let modulesCSSprefix = "modulesjs_css_";
//            let cssLoaded = document.getElementsByClassName(modulesCSSprefix + name)[0];
//            if (!cssLoaded) {
//                let css = document.createElement('link');
//                css.href = path + ".css";
//                css.className = modulesCSSprefix + name;
//                css.type = "text/css";
//                css.rel = "stylesheet";
//                document.getElementsByTagName("head")[0].appendChild(css);
//            }
//            if (callback) {
//                callback();
//            }
//        }
//        function _loadJS (path, name, callback) {
//            let modulesJsPrefix = "modulesjs_js_";
//            let jsLoaded = document.getElementsByClassName(modulesJsPrefix + name)[0];
//            if (jsLoaded) {
//                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
//            }
//            let script = document.createElement('script');
//            script.src = path + ".js";
//            script.className = modulesJsPrefix + name;
//            script.type = "text/javascript";
//            script.async = true;
//            document.getElementsByTagName("head")[0].appendChild(script);
//            let done = false;
//            script.onreadystatechange = script.onload = function () {
//                let state = script.readyState;
//                if (!done && (!state || state === "loaded" || state === "complete")) {
//                    done = true;
//                    if (callback) {
//                        callback(name);
//                    }
//                }
//            }
//        }
//        function _loadHTML(path, name, className, attributeType, container, callback) {
//            function loadedHandler(responseText, name) {
//                _renderHTML(responseText, className, attributeType, container, callback);
//            }
//            _loadHTMLInMemory(path, name, loadedHandler);
//        }
//        function _renderHTML(responseText, className, htmlItemType, container, callback) {
//            let elementClasses = null;
//            if (container != null) {
//                let containerElement = document.getElementsByClassName(container)[0];
//                elementClasses = containerElement.getElementsByClassName(className);
//            } else {
//                elementClasses = document.getElementsByClassName(className);
//            }
//            let classesCount = elementClasses.length;
//            for (let htmlID = 0; htmlID < classesCount; htmlID++) {
//                elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_id", htmlID.toString());
//                elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_type", htmlItemType);
//                elementClasses[htmlID].innerHTML = responseText;
//            }
//            if (callback) {
//                callback();
//            }
//        }
//        function _loadHTMLInMemory(path, name, callback) {
//            let xhrHtmlLoader = new XMLHttpRequest();
//            xhrHtmlLoader.open("GET", path  + ".html", true);
//            xhrHtmlLoader.onreadystatechange = function() {
//                if (xhrHtmlLoader.readyState === 4 /* complete */) {
//                    if (xhrHtmlLoader.status === 200 || xhrHtmlLoader.status === 304) {
//                        if (callback) {
//                            callback(xhrHtmlLoader.responseText, name);
//                        }
//                    }
//                }
//            };
//            xhrHtmlLoader.send(null);
//        }
//        function _buildFilePath(path, name) {
//            let result = path + "/" + name;
//            return result;
//        }
//        function _buildTemplatePath(path, name) {
//            let result = path + "/" + name + "/" + name;
//            return result;
//        }
//        function _replace$PlaceholdersInTemplate(responseText, name, simpleDataSource) {
//            let keys = Object.keys(simpleDataSource);
//            let placeholder, value;
//            let result = responseText;
//            for (let i = 0; i < keys.length; i++) {
//                placeholder = keys[i];
//                value = simpleDataSource[keys[i]];
//                result = result.split('$' + placeholder + ';').join(value);
//            }
//            return result;
//        }
//        function _addUUIDAttribute(responseText, itemNumber, name) {
//            let dom = document.createElement('div');
//            dom.innerHTML = responseText;
//            let element = dom.getElementsByClassName('fileInfo')[0];
//            element.setAttribute('uuid', itemNumber);
//            return element.outerHTML;
//        }
//        function _buildModulePath(path, name) {
//            let result = path + "/" + name + "/";
//            return result;
//        }
//        function loadModule (path, moduleName, className, callback, container) {
//            let htmlItemType = "module";
//            setTimeout(function(){
//                loadSync(path, moduleName, className, htmlItemType, callback, container);
//            }, 0);
//            function loadSync (path, moduleName, className, htmlItemType, callback, container) {
//                let modulePath = _buildModulePath(path, moduleName);
//                dispatchDocumentCustomEvent("module_" + moduleName + "_loadingStarted",
//                    {"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className}});
//                let pathToModuleFiles = modulePath + moduleName;
//                _loadCSS(pathToModuleFiles, moduleName, function() {
//                    _loadHTML(pathToModuleFiles, moduleName, className, htmlItemType, container, function() {
//                        _loadJS(pathToModuleFiles, moduleName, function() {
//                            dispatchDocumentCustomEvent("module_" + moduleName + "_loaded"
//                                ,{"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className}});
//                            if (callback) {
//                                callback();
//                            }
//                        });
//                    });
//                });
//            }
//        }
//        function loadTemplate (path, templateName, className, dataSource, callback, container) {
//            document.getElementsByClassName(className).innerHTML = "";
//            let htmlItemType = "template";
//            setTimeout(function(){
//                loadSync(path, templateName, className, dataSource, htmlItemType, callback, container);
//            }, 0);
//            function loadSync(path, templateName, className, dataSource, htmlItemType, callback, container) {
//                let templatePath = _buildTemplatePath(path, templateName);
//                dispatchCustomEvent(document, "template_" + templateName + "_loadingStarted",
//                    {"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
//                function htmlLoadedHandler(responseText, name) {
//                    let result = '';
//                    let stepResult = '';
//                    //plain object
//                    if (dataSource.length === undefined) {
//                        result = _replace$PlaceholdersInTemplate(responseText, name, dataSource);
//                        result = _addUUIDAttribute(result, 0, templateName);
//                    }
//                    //list
//                    else {
//                        for (let i = 0; i < dataSource.length; i++) {
//                            stepResult = _replace$PlaceholdersInTemplate(responseText, name, dataSource[i]);
//                            stepResult = _addUUIDAttribute(stepResult, i, templateName);
//                            result += stepResult;
//                        }
//                    }
//                    _renderHTML(result, className, htmlItemType, container, function(){
//                        _loadJS(templatePath, templateName, function() {
//                            dispatchDocumentCustomEvent("template_" + templateName + "_loaded"
//                                ,{"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
//                            if (callback) {
//                                callback();
//                            }
//                        });
//                    });
//                }
//                _loadCSS(templatePath, templateName, function() {
//                    _loadHTMLInMemory(templatePath, templateName, htmlLoadedHandler);
//                });
//
//            }
//        };
//        function loadHTML (path, fileName, className, callback, container) {
//            let htmlItemType = "file";
//            setTimeout(function(){
//                loadSync(path, fileName, className, htmlItemType, callback, container);
//            }, 0);
//            function loadSync(path, fileName, className, htmlItemType, callback, container) {
////                if ( fileName.length )
//                let htmlPath = _buildFilePath(path, fileName);
//                dispatchCustomEvent(document, "html_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
//                _loadHTML(htmlPath, fileName, className, htmlItemType, container, function() {
//                    dispatchDocumentCustomEvent("html_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
//        function loadJS (path, fileName, callback) {
//            loadAsync(path, fileName, callback);
//            function loadAsync(path, fileName, callback) {
//                setTimeout(function(){
//                    loadSync(path, fileName, callback);
//                }, 0);
//            }
//            function loadSync(path, fileName,  callback) {
//                let jsPath = _buildFilePath(path, fileName);
//                this.dispatchCustomEvent(document, "js_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "jsPath": jsPath, "path" : path}});
//                _loadJS(jsPath, fileName, function() {
//                    dispatchDocumentCustomEvent("js_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "jsPath": jsPath, "path" : path}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
//        function loadCSS (path, fileName, callback) {
//            loadAsync(path, fileName, callback);
//            function loadAsync(path, fileName, callback) {
//                setTimeout(function(){
//                    loadSync(path, fileName, callback);
//                }, 0);
//            }
//            function loadSync(path, fileName, callback) {
//                let cssPath = _buildFilePath(path, fileName);
//                this.dispatchCustomEvent(document, "css_" + fileName + "_loadingStarted",
//                    {"detail": {"itemName" : fileName, "cssPath": cssPath, "path" : path}});
//                _loadCSS(cssPath, fileName, function() {
//                    dispatchDocumentCustomEvent("css_" + fileName + "_loaded"
//                        ,{"detail": {"fileName" : fileName, "cssPath": cssPath, "path" : path}});
//                    if (callback) {
//                        callback();
//                    }
//                });
//            }
//        }
//        Loader.prototype.load = function (itemName, className, callback, itemType, dataSource, container) {
//            if ((itemType === this.itemTypes.module) || (itemType == null)) {
//                loadModule(this.path, itemName, className, callback, container);
//            } else if (itemType === this.itemTypes.template) {
//                loadTemplate(this.path, itemName, className, dataSource, callback, container);
//            } else if (itemType === this.itemTypes.html) {
//                loadHTML(this.path, itemName, className, callback, container);
//            } else if (itemType === this.itemTypes.css) {
//                loadCSS(this.path, itemName, callback);
//            } else if (itemType === this.itemTypes.javascript) {
//                loadJS(this.path, itemName, callback);
//            }
//        };
//        return Loader;
//    })();

    /**
     * @namespace Modules.Server
     * @memberOf Modules
     */
    (function (Server) {
        /**
         * Get String from URL
         * @method getString
         * @memberOf Modules.Server
         * @param {String} url URL for request
         * @returns {string}
         */
        function getString (url) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            return xhr.responseText;
        }
        function getStringAsync(url, handler) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 /* complete */) {
                    if (xhr.status === 200 || xhr.status === 304) {
                        handler(xhr.responseText);
                    }
                }
            };
            xhr.send();
        }
        function loadJSONConfig(path, name, callback) {
            let jsLoaded = document.getElementsByClassName("modulesjs-config-" + name)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }
            let script = document.createElement('script');
            script.src = path + "/" + name + ".js";
            script.className = "modulesjs-config-" + name;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
            let done = false;

            script.onreadystatechange = script.onload = function () {
                let state = script.readyState;
                if (!done && (!state || state === "loaded" || state === "complete")) {
                    done = true;
                    document.dispatchEvent(new CustomEvent("config_" + name + "_loaded",
                        {"detail": {"configName" : name, "_path": path}}
                    ));
                    if (callback) {
                        callback(name);
                    }
                }
            }
        }
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        Server.getString = getString;
        Server.getStringAsync = getStringAsync;
        Server.loadJSONConfig = loadJSONConfig;
        Server.getRandomInt = getRandomInt;
    })(Modules.Server || (Modules.Server = {}));

})(window.exports.Modules || (window.exports.Modules = {}));
//noinspection JSUnresolvedVariable
/**
 * Global Modules.JS object, contains window.exports.Modules namespace
 * @instance
 * @global
 * @name Modules
 */
let Modules = window.exports.Modules;
