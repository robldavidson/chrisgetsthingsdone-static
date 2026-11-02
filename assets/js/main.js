document.addEventListener('DOMContentLoaded', function () {
	// Close the mobile menu after tapping a link, so it doesn't stay
	// open over the section you just scrolled to.
	var navToggle = document.getElementById('nav-toggle');
	document.querySelectorAll('.site-nav__menu a').forEach(function (link) {
		link.addEventListener('click', function () {
			if (navToggle) {
				navToggle.checked = false;
			}
		});
	});

	if (typeof Swiper === 'undefined') {
		return;
	}

	// centeredSlides + the .swiper-slide-active styling in style.css is
	// what makes the middle card read as larger/brighter than its two
	// neighbours — no special Swiper effect module needed for that.
	new Swiper('.endorsements-swiper', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 1.2,
		spaceBetween: 16,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.endorsements-swiper .swiper-button-next',
			prevEl: '.endorsements-swiper .swiper-button-prev',
		},
		// pauseOnMouseEnter (desktop) and disableOnInteraction: false
		// (touch/click — a tap on an arrow or dot doesn't permanently
		// kill autoplay) are both here on purpose: an endlessly-moving
		// carousel with no way to stop it is an accessibility problem
		// (WCAG 2.2.2) — hovering it, or just interacting with it at
		// all, is this site's "pause" control.
		autoplay: {
			delay: 4500,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		breakpoints: {
			700: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
	});
});
