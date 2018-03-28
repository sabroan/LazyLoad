/*jslint browser: true*/
/*jshint esversion: 6 */
/*global window, document */
if (typeof window.LazyLoad === typeof undefined) {
    window.LazyLoad = {};
}
window.LazyLoad.script = function (queue) {
    "use strict";
    const loadedScripts = [];
    const queueIndexes = Object.keys(queue);
    const scriptNodes = document.getElementsByTagName("script");
    Array.prototype.forEach.call(scriptNodes, function (script) {
        const scriptSource = script.getAttribute("src");
        if (scriptSource) {
            loadedScripts.push(scriptSource);
        }
    });
    const executeCallback = function (callback, argument) {
        if ("[object Function]" === Object.prototype.toString.call(callback)) {
            return callback(argument);
        }
        if ("[object String]" === Object.prototype.toString.call(callback)) {
            let scope = window;
            const namespaces = callback.split(".");
            namespaces.every(function (deep) {
                if (Object.prototype.hasOwnProperty.call(scope, deep)) {
                    scope = scope[deep];
                    return true;
                }
                scope = null;
                return false;
            });
            if (scope) {
                return scope.call(window, argument);
            }
        }
    };
    let processQueueItems;
    processQueueItems = function () {
        if (0 >= queueIndexes.length) {
            return;
        }
        const currentIndex = queueIndexes.shift();
        const currentItem = queue[currentIndex];
        if (Object.prototype.hasOwnProperty.call(currentItem, "src")) {
            if (-1 >= loadedScripts.indexOf(currentItem.src)) {
                loadedScripts.push(currentItem.src);
                const script = document.createElement("script");
                const attributes = Object.keys(currentItem);
                Array.prototype.forEach.call(attributes, function (attributeName) {
                    script.setAttribute(attributeName, currentItem[attributeName]);
                });
                if (script.hasAttribute("async")) {
                    window.setTimeout(processQueueItems, 0);
                } else {
                    script.addEventListener("load", processQueueItems, false);
                }
                return document.body.appendChild(script);
            }
        } else {
            let callback = null;
            if (Object.prototype.hasOwnProperty.call(currentItem, "function")) {
                callback = currentItem.function;
            } else {
                callback = currentItem;
            }
            const argument = currentItem.argument || {};
            executeCallback(callback, argument);
        }
        return window.setTimeout(processQueueItems, 0);
    };
    return window.setTimeout(processQueueItems, 0);
};