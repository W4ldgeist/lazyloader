# LazyLoader

A high performance javascript image lazy loader inspired by medium, facebook. It will load a low res image first, which is then replaced if it *comes into view* in the browser. No fancy effects, no jquery, plain javascript, performance oriented. Got some great inspiration from progressive-image.js.

## Highlights

* No jQuery needed
* High performance, wide browser support (fallbacks included) IE 9+
* Easy to use
* Very few lines of additional HTML markup needed to make it work
* High-res images will still be indexed by Google
* Clean style programming for easy extension, improvement, further development
* Tested to perform well even with 1000 images in your page (even on mobile devices scrolling should be smooth - not on really old ones of course, I can't do magic)

## How to use it

### Include the code
Reference the .js and .css file (or include them in your build process). The code is not minified, I leave that to you. Rip out the documentation or let your build system handle it. The code is documented and structured for best readability.

It's best to include the .js right above your <body> tag.

```html
<link rel="stylesheet" href="css/lazyload.css">
<script src="js/lazyloader.js"></script>
```

### Trigger the code

Then you have to trigger the init function where ever and whenever you feel like it. Usually I would do something like this:

```javascript
window.addEventListener('load', LazyLoader.init);
```

*Don't write () at the end of init, or it will be called immediately instead of as a function once the page markup is loaded.*

### Write the markup

The goal was to have as little additional markup as possible, while still support all kinds of fallbacks, performance considerations and make sure Google doesn't only see your low-res image. So this is what I use:

```html
<a href="highres.jpg" class="lazy">
    <img src="lowres.jpg" class="lazy--low"/>
</a>
```

Since the high resolution image is loaded as a background to the <a> tag you'll have to make sure they have the same aspect ratio. You can use different images if you want, but any transition effects will not look pretty (you've been warned :)

I hope you enjoy this little piece of code and find it useful. If you have suggestions, improvements go right ahead!