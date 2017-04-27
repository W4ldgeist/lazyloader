var LazyLoader = {
    viewMinX:0,
    viewMaxX:0,
    timeout: 300,
    throttle: false,
    stopClick: true,
    /**
     * Initializes the singleton object, checks some compatibility settings
     * Triggers the first visibility check outside of the timeout throttle
     */
    init: function () {
        if('pointer-events' in document.documentElement.style){
            LazyLoader.stopClick = false;
        }
        LazyLoader.timeoutLoad();
        window.onscroll = LazyLoader.throttledLoad;
    },
    /**
     * Does a visibility check based on the X values
     * @param {Image} element
     * @returns {boolean}
     */
    isVisible: function(element){
        var offsetTop = element.offsetTop;
        var offsetMax = offsetTop + element.height;
        return (offsetTop >= LazyLoader.viewMinX || offsetMax >= LazyLoader.viewMinX)
            && (offsetTop <= LazyLoader.viewMaxX || offsetMax <= LazyLoader.viewMaxX);
    },
    /**
     * Returns the distance the viewport has moved
     * @returns {number}
     */
    getScrollTop: function () {
        return document.body.scrollTop || document.documentElement.scrollTop;
    },
    /**
     * Sets the class variables for the viewMinX and viewMaxX
     */
    setViewPosition: function () {
        LazyLoader.viewMinX = LazyLoader.getScrollTop();
        LazyLoader.viewMaxX = LazyLoader.viewMinX + window.innerHeight;
    },
    /**
     * Assigns the href to the link element, switches the classes to fadeout the low res image. If the browser doesn't
     * support pointer-events it assigns an onclick function to the link to prevent the default
     */
    showHighRes: function () {
        var link = this.element.parentNode;
        link.style.backgroundImage = "url('" + link.href + "')";
        this.element.classList.remove("lazy--low");
        this.element.classList.add("lazy--hide");
        link.onclick = LazyLoader.stopClick && LazyLoader.noClick;
        this.element.loading = false;
    },
    /**
     * Prevents the link from working
     * @param {Event} e
     */
    noClick: function (e) {
        e.preventDefault();
    },
    /**
     * If the element is visible it loads the href stored in the link in a placeholder image object, which triggers
     * the onload function to switch out the lowres with the highres image.
     * @param {Image} element
     */
    loadBackground: function (element) {
        if(LazyLoader.isVisible(element) && !element.loading){
            element.loading = true;
            var image = new Image();
            image.src = element.parentNode.href;
            image.element = element;
            image.onload = LazyLoader.showHighRes;
        }
    },
    /**
     * Runs through all images and executes the loadBackground callback for every image
     * @returns {boolean}
     */
    loadHighRes: function () {
        var list = Array.prototype.slice.call(document.getElementsByClassName("lazy--low"));
        LazyLoader.setViewPosition();
        list.forEach(LazyLoader.loadBackground);

        LazyLoader.throttle = false;
        return true;
    },
    /**
     * Throttles the execution by the amount defined in LazyLoader.timeout (milliseconds). Adjust according to your needs.
     */
    throttledLoad: function () {
        LazyLoader.throttle = LazyLoader.throttle || setTimeout(LazyLoader.timeoutLoad, LazyLoader.timeout);
    },
    /**
     * If requestAnimationFrame is supported assigns loadHighRes as callback to the function, or if not executes the function directly
     */
    timeoutLoad: function () {
        LazyLoader.throttle = (typeof requestAnimationFrame === 'function' && requestAnimationFrame(LazyLoader.loadHighRes)) || LazyLoader.loadHighRes();
    }
};