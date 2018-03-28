/*jslint browser: true*/
/*jshint esversion: 6 */
/*global window, document */
if (typeof window.LazyLoad === typeof undefined) {
    window.LazyLoad = {};
}
window.LazyLoad.link = function (queue) {
    "use strict";
    const loadedStyles = [];
    const queueIndexes = Object.keys(queue);
    const linkNodes = document.getElementsByTagName("link");
    Array.prototype.forEach.call(linkNodes, function (link) {
        const linkHyperReference = link.getAttribute("href");
        if (linkHyperReference) {
            loadedStyles.push(linkHyperReference);
        }
    });
    const processQueueItems = function () {
        const fragment = document.createDocumentFragment();
        Array.prototype.forEach.call(queueIndexes, function (queueIndex) {
            let currentItem = queue[queueIndex];
            if ("[object String]" === Object.prototype.toString.call(currentItem)) {
                currentItem = {
                    href: currentItem
                };
            }
            if (Object.prototype.hasOwnProperty.call(currentItem, "href") && (-1 >= loadedStyles.indexOf(currentItem.href))) {
                loadedStyles.push(currentItem.href);
                const link = document.createElement("link");
                const defaultAttributes = {
                    rel: "stylesheet",
                    type: "text/css",
                };
                const defaultAttributesKeys = Object.keys(defaultAttributes);
                Array.prototype.forEach.call(defaultAttributesKeys, function (attributeName) {
                    if (!Object.prototype.hasOwnProperty.call(currentItem, attributeName)) {
                        currentItem[attributeName] = defaultAttributes[attributeName];
                    }
                });
                const linkAttributesKeys = Object.keys(currentItem);
                Array.prototype.forEach.call(linkAttributesKeys, function (attributeName) {
                    link.setAttribute(attributeName, currentItem[attributeName]);
                });
                fragment.appendChild(link);
            }
        });
        return document.head.appendChild(fragment);
    };
    const raf = window.requestAnimationFrame;
    if (raf) {
        raf(function () {
            window.setTimeout(processQueueItems, 0);
        });
    } else {
        window.addEventListener("DOMContentLoaded", processQueueItems, false);
    }
};