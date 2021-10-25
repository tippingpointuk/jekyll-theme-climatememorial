// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;

var header = document.querySelector('header');
var main = document.querySelector('main');
var navbarHeight = header.offsetHeight;

window.onscroll = function(event){
    didScroll = true;
};

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled()
{
    var scrollPos = -main.getBoundingClientRect().top;

    if (Math.abs(lastScrollTop - scrollPos) <= delta)
        return;

    if (scrollPos > lastScrollTop)
    {
        if (scrollPos > navbarHeight)
        {
            header.classList.add("nav-hide");
            header.classList.remove("nav-visible");
        }
    } else
    {
        header.classList.remove("nav-hide");
        header.classList.add("nav-visible");
    }

    lastScrollTop = scrollPos;
}
