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
		breakpoints: {
			700: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
	});
});
