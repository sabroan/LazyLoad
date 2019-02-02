/*jslint browser: true*/
/*jshint esversion: 6 */
/* global window, document */
var LazyLoad = (function () {
    "use strict";
    const ARRAY = Array;
    const OBJECT = Object;
    const WINDOW = window;
    const DOCUMENT = document;
    const listen = "addEventListener";
    const unlisten = "removeEventListener";
    const setTimeout = WINDOW.setTimeout;
    const forEach = function (array, callback) {
        return ARRAY.prototype.forEach.call(array, callback);
    };
    const hasProperty = function (object, property) {
        return OBJECT.prototype.hasOwnProperty.call(object, property);
    };
    const isInArray = function (array, value) {
        return (array.indexOf(value) >= 0);
    };
    const getLoadedNodes = function (tag, attribute) {
        const nodes = DOCUMENT.getElementsByTagName(tag);
        const loaded = [];
        forEach(nodes, function (node) {
            const property = node.getAttribute(attribute);
            if (property) {
                loaded.push(property);
            }
        });
        return loaded;
    };
    const Public = function () {
        return;
    };
    Public.prototype.script = function (queue) {
        const loaded = getLoadedNodes("script", "src");
        const indexes = OBJECT.keys(queue);
        function Load() {
            if (indexes.length === 0) {
                return;
            }
            const index = indexes.shift();
            const script = queue[index];
            if (hasProperty(script, "src") && !isInArray(loaded, script.src)) {
                loaded.push(script.src);
                const node = DOCUMENT.createElement("script");
                const attributes = OBJECT.keys(script);
                forEach(attributes, function (attribute) {
                    node[attribute] = script[attribute];
                });
                DOCUMENT.body.appendChild(node);
            }
            setTimeout(Load);
        }
        setTimeout(Load);
    };
    Public.prototype.link = function (queue) {
        const loaded = getLoadedNodes("link", "href");
        const Load = function () {
            const fragment = DOCUMENT.createDocumentFragment();
            forEach(OBJECT.keys(queue), function (index) {
                const link = queue[index];
                const hasHref = hasProperty(link, "href");
                const isLoaded = isInArray(loaded, link.href);
                if (hasHref && !isLoaded) {
                    loaded.push(link.href);
                    const node = DOCUMENT.createElement("link");
                    const attributes = {
                        rel: "stylesheet",
                        type: "text/css"
                    };
                    forEach(OBJECT.keys(attributes), function (attribute) {
                        const isSet = hasProperty(link, attribute);
                        if (!isSet) {
                            link[attribute] = attributes[attribute];
                        }
                    });
                    forEach(OBJECT.keys(link), function (attribute) {
                        node[attribute] = link[attribute];
                    });
                    fragment.appendChild(node);
                }
            });
            DOCUMENT.head.appendChild(fragment);
        };
        const AnimationFrame = WINDOW.requestAnimationFrame;
        if (AnimationFrame) {
            AnimationFrame.call(WINDOW, function () {
                setTimeout(Load);
            });
        } else if (DOCUMENT.readyState === "loading") {
            DOCUMENT[listen]("DOMContentLoaded", Load, true);
        } else {
            setTimeout(Load);
        }
    };
    Public.prototype.onSight = function (selector) {
        if (!selector) {
            return;
        }
        const Observ = function() {
            const nodeList = DOCUMENT.querySelectorAll(selector);
            const isObserver = hasProperty(WINDOW, "IntersectionObserver");
            const setNodeSource = function (node) {
                const applyDataset = function (element) {
                    forEach(["srcset", "src", "data"], function (property) {
                        if (hasProperty(element.dataset, property)) {
                            element[property] = element.dataset[property];
                        }
                    });
                };
                if (node.children.length) {
                    forEach(OBJECT.keys(node.children), function (index) {
                        applyDataset(node.children[index]);
                    });
                    if (isInArray(["VIDEO", "AUDIO"], node.tagName)) {
                        node.load();
                    }
                } else {
                    applyDataset(node);
                }
            };
            if (isObserver) {
                const ObserverConstructor = WINDOW.IntersectionObserver;
                const Observer = new ObserverConstructor(function(list) {
                    forEach(list, function(entry) {
                        if (entry.isIntersecting) {
                            setNodeSource(entry.target);
                            Observer.unobserve(entry.target);
                        }
                    });
                });
                forEach(nodeList, function(node) {
                    Observer.observe(node);
                });
            } else {
                let running = false;
                const nodeArray = ARRAY.prototype.slice.call(nodeList);
                const isVisible = function (element) {
                    const clientRect = element.getBoundingClientRect();
                    const style = WINDOW.getComputedStyle(element);
                    const inViewport = (
                        (clientRect.top <= WINDOW.innerHeight) &&
                        clientRect.bottom >= 0
                    );
                    return (inViewport && style.display !== "none");
                };
                const onSight = function() {
                    if (running) {
                        return;
                    }
                    running = true;
                    setTimeout(function () {
                        forEach(nodeArray, function(element, index) {
                            if (!isVisible(element)) {
                                return;
                            }
                            setNodeSource(element);
                            nodeArray.splice(index, 1);
                            if (nodeArray.length === 0) {
                                WINDOW[unlisten]("load", onSight, true);
                                WINDOW[unlisten]("resize", onSight);
                                WINDOW[unlisten]("orientationchange", onSight);
                                DOCUMENT[unlisten]("scroll", onSight, true);
                            }
                        });
                        running = false;
                    }, 200);
                };
                WINDOW[listen]("load", onSight, true);
                WINDOW[listen]("resize", onSight);
                WINDOW[listen]("orientationchange", onSight);
                DOCUMENT[listen]("scroll", onSight, true);
            }
        };
        if (DOCUMENT.readyState === "loading") {
            DOCUMENT[listen]("DOMContentLoaded", Observ, true);
        } else {
            setTimeout(Observ);
        }
    };
    return new Public();
}());