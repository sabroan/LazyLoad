# *LazyLoad*

## Deprecated!
Use [JavaScript](//github.com/sabroan/lazyload.script) / [CSS](//github.com/sabroan/lazyload.link) instead.

---

Fast and tiny no-dependency javaScript utility that makes it easy to load assets.
Global object `LazyLoad` will be created, which contain next methods:
### LazyLoad.script
This method requires an object as argument and represent queue, which should be loaded or executed.
Passed object should contain ***object / string / function*** as property.
If parameter is ***function*** or ***string***, callback will be executed.
In case if ***object*** was set as queue item, two possible scenarios are possible:
1. **`src`** attribute is set, an ordinary `<script>` node will be created with the passed arguments. If `async` attribute is **not** set, the following script will be executed, only when current is completely ready.
2. **`function`** is set, ***function*** or ***string*** from this parameter will be executed, work the same as ***string / function*** call, but in this case, `argument` key can be passed as callback argument.
#### Example
```javascript
    var Callback = {};
    Callback.message = function (arg) {
        console.log(arg.message + ': ' + arg.time);
    };
    Callback.End = function () {
        console.log('All scripts is ready: ' + Date.now());
    };
    /*global LazyLoad*/
    LazyLoad.script({
        start               : function () {
            console.log('Start: ' + Date.now());
        },
        jquery              : {
            src             : '//code.jquery.com/jquery-3.2.1.min.js',
            crossorigin     : 'anonymous',
            integrity       : 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4='
        },
        jQueryReady         : {
            function        : 'Callback.message',
            argument        : {
                message     : 'jQuery Ready',
                time        : Date.now(),
            }
        },
        popper              : {
            src             : 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            crossorigin     : 'anonymous',
            integrity       : 'sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh'
        },
        bootstrap           : {
            'src'           : '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
            'crossorigin'   : 'anonymous',
            'integrity'     : 'sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ'
        },
        end                 : Callback.End,
    });
```
### LazyLoad.link
This parameter requires an object where each value contains attributes to `<link>` tag.
**`href`** attribute is **required!**
Next attributes will be added automatically if they are not specified:
```
rel     : 'stylesheet'
type    : 'text/css'
```
#### Example
```javascript
/*global LazyLoad*/
LazyLoad.link({
    bootstrap           : {
        href            : '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css',
        integrity       : 'sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb',
        crossorigin     : 'anonymous',
    },
});
```
