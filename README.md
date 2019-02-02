# *LazyLoad*

**Note:** This object uses the *properties* of HTML nodes instead of *attributes*, which means, some names can differ, like `crossOrigin` instead of `crossorigin`

---

Global object `LazyLoad` will be created, which contain next methods:
## LazyLoad.script
A passed object should contain the *object's* with properties which represent the script tag attributes or inline events.  
The following script will be executed in `async` mode, if you need to load dependencies do it with `onload` event.  
**Note:** `src` attribute is **required!**
### Example
```javascript
/*global LazyLoad*/
LazyLoad.script({
    jquery: {
        src: '//code.jquery.com/jquery-3.3.1.slim.min.js',
        integrity: 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
        crossOrigin: 'anonymous',
        onload: function () {
            LazyLoad.script({
                popper: {
                    src: '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js',
                    integrity: 'sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut',
                    crossOrigin: 'anonymous'
                },
                bootstrap: {
                    src: '//stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js',
                    integrity: 'sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k',
                    crossOrigin: 'anonymous'
                }
            });
        }
    }
});
```
## LazyLoad.link
This parameter requires an object where each value contains attributes to the `<link>` tag.  
Next attributes will be added automatically if they are not specified:
```
rel     : 'stylesheet'
type    : 'text/css'
```
**Note:** `href` attribute is **required!**  
### Example
```javascript
/*global LazyLoad*/
LazyLoad.link({
    bootstrap: {
        href: '//stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
        integrity: 'sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS',
        crossOrigin: 'anonymous'
    },
    bootstrapTheme: {
        href: '//bootswatch.com/4/darkly/bootstrap.css',
    }
});
```

## LazyLoad.onSight
This parameter requires a [selector](//www.w3.org/TR/CSS22/selector.html) for elements which should be loaded, when they appear in the viewport.  
Desired lazy attributes should be specified in the [dataset](//developer.mozilla.org/docs/Web/API/HTMLElement/dataset).  
Supported attributes: `srcset`, `src`, `data`.
### Example
```html
<img class='lazy' src='/placeholder.png' data-srcset='/srcset-1x.png 1x, /srcset-2x.png 2x' />
<video class='lazy' preload controls width='100%'>
    <source data-src='/video.ogg' type='video/ogg'/>
    <source data-src='/video.mp4' type='video/mp4'/>
    <source data-src='/video.webm' type='video/webm'/>
    <track kind='subtitles' srclang='en' data-src='/en.vtt' label='English' default>
    <p>Your browser does not support the HTML5 Video element.</p>
</video>
<object class='lazy' type='application/pdf' data-data='/file.pdf'></object>
<iframe class='lazy' data-src='/iframe'></iframe>
```
```javascript
/*global LazyLoad*/
LazyLoad.onSight('.lazy');
```