/* ===================================================================
 * Hudson 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    'use strict';


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader')) {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


    /* move header
     * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function () {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    }; // end ssMoveHeader


const cvModal = document.getElementById("cvModal");
const closeBtn = document.getElementById("closeCv");

// both buttons
const headerBtn = document.getElementById("openCvPreview");
const footerBtn = document.getElementById("openCvPreview_footer");

// open modal function
function openCvModal(e) {
    e.preventDefault();
    cvModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// attach events (check existence for safety)
if (headerBtn) headerBtn.addEventListener("click", openCvModal);
if (footerBtn) footerBtn.addEventListener("click", openCvModal);

// close logic
closeBtn.addEventListener("click", closeModal);

cvModal.addEventListener("click", function (e) {
    if (e.target === cvModal) closeModal();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});

function closeModal() {
    cvModal.classList.remove("active");
    document.body.style.overflow = "";
}






    /* mobile menu
     * ---------------------------------------------------- */
const ssMobileMenu = function () {

    const toggleButton = document.querySelector('.s-header__menu-toggle');
    const mainNavWrap = document.querySelector('.s-header__nav');
    const siteBody = document.body;

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener('click', function (e) {
        e.preventDefault();
        toggleButton.classList.toggle('is-clicked');
        siteBody.classList.toggle('menu-is-open');
    });

    mainNavWrap.querySelectorAll('a').forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.matchMedia('(max-width: 900px)').matches) {
                toggleButton.classList.remove('is-clicked');
                siteBody.classList.remove('menu-is-open');
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 901px)').matches) {
            siteBody.classList.remove('menu-is-open');
            toggleButton.classList.remove('is-clicked');
        }
    });

};

ssMobileMenu();



    /* highlight active menu link on pagescroll
     * ------------------------------------------------------ */
    const ssScrollSpy = function () {

        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function (current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                /* If our current scroll position enters the space where current section 
                 * on screen is, add .current class to parent element(li) of the thecorresponding 
                 * navigation link, else remove it. To know which link is active, we use 
                 * sectionId variable we are getting while looping through sections as 
                 * an selector
                 */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy


    /* glightbox
     * ------------------------------------------------------ */
    const ssGLightbox = function () {

        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            // svg: { ... } removed to use defaults
        });

    }; // end ssGLightbox
    ssGLightbox(); 


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 50
                },
                // when window width is > 1180px
                1181: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function () {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function () {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function () {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* projects interaction
     * ------------------------------------------------------ */
    const ssProjects = function () {
        const detailBtns = document.querySelectorAll('.more-detail-btn');
        const closeBtns = document.querySelectorAll('.close-detail-btn');
        const cards = document.querySelectorAll('.project-card-inner');

        // Click "More Detail" to flip
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const card = this.closest('.project-card-inner');
                if (card) {
                    card.classList.add('is-flipped');
                }
            });
        });

        // Click "Back" to flip back
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const card = this.closest('.project-card-inner');
                if (card) {
                    card.classList.remove('is-flipped');
                }
            });
        });

        // Mouse leave to resets (Desktop)
        cards.forEach(card => {
            card.addEventListener('mouseleave', function () {
                if (this.classList.contains('is-flipped')) {
                    this.classList.remove('is-flipped');
                }
            });
        });
    };

    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssProjects();
        ssPreloader();
        ssMoveTo();

    })();

})(document.documentElement);