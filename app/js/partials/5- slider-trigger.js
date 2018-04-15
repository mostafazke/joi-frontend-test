let productSlider = new tns({
    container: '.product-slider-trigger',
    items: 4,
    slideBy: 'page',
    mouseDrag: true,
    loop: false,
    autoplayHoverPause: true,
    responsive: true,
    responsive: {
        0: {
            controls: false,
            items: 1
        },
        387: {
            controls: true,            
            items: 2
        },
        645: {
            items: 3
        },
        740: {
            items: 4
        }
    }
}),
inspirationSlider = new tns({
    container: '.inspiration-slider-trigger',
    items: 4,
    slideBy: 'page',
    mouseDrag: true,
    loop: false,
    controls: false,
    nav: true,
    autoplayHoverPause: true,
    responsive: true,
    responsive: {
        0: {
            items: 1
        },
        387: {
            items: 2
        },
        645: {
            items: 3
        },
        740: {
            items: 4
        }
    }
});