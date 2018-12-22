/*jslint browser: true*/
/*jshint esversion: 6 */
/*global window, document */
;(function () {
    'use scrict';
    const Public = function () {};
    const Fn = {
        forEach: function (array, callback) {
            Array.prototype.forEach.call(array, callback);
        },
        hasProperty: function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }
    };
    Public.prototype.script = function (queue) {
        const loaded = [];
        const indexes = Object.keys(queue);
        const scripts = document.getElementsByTagName('script');
        Fn.forEach(scripts, function (script) {
            const source = script.getAttribute('src');
            if (source) {
                loaded.push(source);
            }
        });
        let Load;
        Load = function () {
            if (0 >= indexes.length) {
                return;
            }
            const index = indexes.shift();
            const script = queue[index];
            const has_src = Fn.hasProperty(script, 'src');
            const is_loaded = (loaded.indexOf(script.src) >= 0);
            if (has_src && !is_loaded) {
                loaded.push(script.src);
                const node = document.createElement('script');
                const attributes = Object.keys(script);
                Fn.forEach(attributes, function (attribute) {
                    node[attribute] = script[attribute];
                });
                if (node.hasAttribute('async')) {
                    window.setTimeout(Load);
                } else {
                    node.addEventListener('load', Load, false);
                }
                return document.body.appendChild(node);
            }
            return window.setTimeout(Load);
        };
        return window.setTimeout(Load);
    };
    Public.prototype.link = function (queue) {
        const loaded = [];
        const links = document.getElementsByTagName('link');
        Fn.forEach(links, function (link) {
            const href = link.getAttribute('href');
            if (href) {
                loaded.push(href);
            }
        });
        const Load = function () {
            const fragment = document.createDocumentFragment();
            Fn.forEach(Object.keys(queue), function (index) {
                const link = queue[index];
                const has_href = Fn.hasProperty(link, 'href');
                const is_loaded = (loaded.indexOf(link.href) >= 0);
                if (has_href && !is_loaded) {
                    loaded.push(link.href);
                    const node = document.createElement('link');
                    const defaults = {
                        rel: 'stylesheet',
                        type: 'text/css'
                    };
                    Fn.forEach(Object.keys(defaults), function (attribute) {
                        const is_set = Fn.hasProperty(link, attribute);
                        if (!is_set) {
                            link[attribute] = defaults[attribute];
                        }
                    });
                    Fn.forEach(Object.keys(link), function (attribute) {
                        node[attribute] = link[attribute];
                    });
                    fragment.appendChild(node);
                }
            });
            return document.head.appendChild(fragment);
        };
        const AnimationFrame = window.requestAnimationFrame;
        if (AnimationFrame) {
            AnimationFrame.call(window, function () {
                window.setTimeout(Load);
            });
        } else {
            window.addEventListener('DOMContentLoaded', Load, false);
        }
    };
    window.LazyLoad = new Public ();
})();