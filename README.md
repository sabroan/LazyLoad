# *LazyLoad*
Fast and tiny no-dependency javaScript utility that makes it easy to load assets.
Global object `LazyLoad` will be created, which contain next methods:
## LazyLoad.script
This method requires an object as argument and represent queue, which should be loaded or executed.
Passed object should contain *object's* with propertys which represent script tag attributes.
If **`async`** attribute is not set, the following script will be executed, only when current is completely ready.
Support inline events.
*Note:* **`src`** attribute is **required!**
### Example
```javascript
/*global LazyLoad*/
LazyLoad.script({
    jquery              : {
        src             : '//code.jquery.com/jquery-3.2.1.min.js',
        crossorigin     : 'anonymous',
        integrity       : 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=',
        onload          : function () {
            console.log('jquery ready');    
        },
    },
    popper              : {
        src             : 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
        crossorigin     : 'anonymous',
        integrity       : 'sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh'
    },
    bootstrap           : {
        src             : '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        crossorigin     : 'anonymous',
        integrity       : 'sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ'
    },
});
```
## LazyLoad.link
This parameter requires an object where each value contains attributes to `<link>` tag.  
*Note:* **`href`** attribute is **required!**  
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

## TODO
- [ ] Add lazyload for `<img>` tags.
