// ==========================================================================
// Cookie consent — gates the Jotform sign-up form behind an explicit
// Accept/Reject choice, stored in a strictly-necessary cookie
// (cgtd_consent). Nothing Jotform-related loads until that choice is
// "accepted": no iframe src, no embed-handler script. Present on every
// page (not just the homepage) so the "manage cookie preferences"
// control works from the Cookie Policy page too.
// ==========================================================================
var CONSENT_COOKIE = 'cgtd_consent';
var CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function cgtdGetCookie(name) {
	var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
	return match ? decodeURIComponent(match[1]) : null;
}

function cgtdSetCookie(name, value) {
	document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + CONSENT_MAX_AGE_SECONDS + '; SameSite=Lax';
}

function cgtdLoadJotform() {
	var embedWrap = document.getElementById('support-form-embed');
	var placeholder = document.getElementById('support-form-placeholder');
	var iframe = document.getElementById('JotFormIFrame-262994968304069');
	if (!embedWrap || !iframe) {
		return;
	}
	if (!iframe.getAttribute('src')) {
		iframe.setAttribute('src', iframe.getAttribute('data-src'));
		var script = document.createElement('script');
		script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
		script.onload = function () {
			if (window.jotformEmbedHandler) {
				window.jotformEmbedHandler("iframe[id='JotFormIFrame-262994968304069']", 'https://form.jotform.com/');
			}
		};
		document.body.appendChild(script);
	}
	embedWrap.hidden = false;
	if (placeholder) {
		placeholder.hidden = true;
	}
}

function cgtdShowFormPlaceholder() {
	var embedWrap = document.getElementById('support-form-embed');
	var placeholder = document.getElementById('support-form-placeholder');
	if (embedWrap) {
		embedWrap.hidden = true;
	}
	if (placeholder) {
		placeholder.hidden = false;
	}
}

function cgtdShowCookieBanner() {
	var banner = document.getElementById('cookie-banner');
	if (banner) {
		banner.hidden = false;
	}
}

function cgtdHideCookieBanner() {
	var banner = document.getElementById('cookie-banner');
	if (banner) {
		banner.hidden = true;
	}
}

function cgtdApplyConsent(value) {
	cgtdSetCookie(CONSENT_COOKIE, value);
	if (value === 'accepted') {
		cgtdLoadJotform();
	} else {
		cgtdShowFormPlaceholder();
	}
	cgtdHideCookieBanner();
}

document.addEventListener('DOMContentLoaded', function () {
	var consent = cgtdGetCookie(CONSENT_COOKIE);
	if (consent === 'accepted') {
		cgtdLoadJotform();
	} else if (consent === 'rejected') {
		cgtdShowFormPlaceholder();
	} else {
		// No choice stored yet — form stays blocked (same state as a
		// rejection) until an explicit choice is made. Never treated as
		// implied consent, regardless of how long the banner sits there
		// unanswered.
		cgtdShowFormPlaceholder();
		cgtdShowCookieBanner();
	}

	var acceptBtn = document.getElementById('cookie-accept');
	var rejectBtn = document.getElementById('cookie-reject');
	if (acceptBtn) {
		acceptBtn.addEventListener('click', function () {
			cgtdApplyConsent('accepted');
		});
	}
	if (rejectBtn) {
		rejectBtn.addEventListener('click', function () {
			cgtdApplyConsent('rejected');
		});
	}
	document.querySelectorAll('.js-manage-cookies').forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			cgtdShowCookieBanner();
		});
	});

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
