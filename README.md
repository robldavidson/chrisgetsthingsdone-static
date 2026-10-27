# Chris Gets Things Done — static site

A single-page site (hero, campaign video, endorsements carousel, plan,
about, support) — plain HTML/CSS/JS, no build step, [Swiper](https://swiperjs.com/)
loaded from a CDN for the endorsements carousel. Built to deploy on
GitHub Pages.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo's **Settings > Pages**, set **Source** to "Deploy from a
   branch", pick the branch (usually `main`) and folder `/ (root)`.
3. GitHub gives you a `https://<username>.github.io/<repo>/` URL a
   minute or two later. A custom domain can be added in the same
   Pages settings screen.

`.nojekyll` is already in the repo root — without it, GitHub Pages runs
the site through Jekyll by default, which isn't needed here and can
occasionally mangle a plain static site in confusing ways (e.g. files
starting with an underscore are ignored).

## Campaign video

GitHub Pages can technically serve a video file directly from the
repo, but it isn't built for it: there's a soft 100MB-per-file limit,
no compression/adaptive bitrate, and large binaries bloat the git
history permanently. **Host the video on YouTube or Vimeo instead**
and embed it — both are free, handle compression and playback for
you, and an embed is just an `<iframe>`. YouTube is the simpler
default (no view limits); Vimeo is worth it if you want a cleaner
player with no suggested-video sidebar (their free tier caps total
storage, which is fine for a handful of campaign videos).

Replace the placeholder in `index.html`'s `.video-embed` div with
something like:

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
	title="Campaign video" frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen></iframe>
```

(`youtube-nocookie.com` avoids setting tracking cookies until someone
actually presses play.)

## Support / sign-up form

The `.support__form` div in `index.html`'s `#support` section holds a
**Jotform** embed (form ID `262994968304069`) via their `<iframe>` +
`for-form-embed-handler.js` auto-resize script — not their "source
code" embed, which dumps Jotform's full JS/CSS (including Prototype.js,
whose `$()` isn't jQuery's and can collide with other scripts) directly
into this page. The iframe keeps all of that walled off in its own
document instead.

One thing already fixed here: Jotform's default snippet includes
`onload="window.parent.scrollTo(0,0)"` on the iframe, which yanks the
whole page back to the top every time the iframe (re)loads — fine if
the form IS the page, actively broken for a form sitting mid-page on a
one-pager like this (someone clicks "Get Involved", scrolls to
#support, and the page jumps back to the hero). That attribute has
been removed; don't re-add it if you regenerate the embed code from
Jotform later.

Jotform's free tier caps at 100 submissions/month and 5 forms, and
shows their branding footer (visible at the bottom of the embedded
form) unless you're on a paid plan.

A couple of free alternatives, if this ever needs revisiting:

- **Formspree** — you write a plain `<form>` in your own HTML pointed
  at a Formspree endpoint URL; it emails you the submissions. Because
  it's your own markup, it matches the rest of the page's design
  exactly rather than sitting in an iframe. Free tier: 50
  submissions/month.
- **Google Forms** — zero setup, completely free, no submission cap.
  Embed via the iframe Google gives you under Send > Embed HTML.
  Responses land in a Google Sheet. Looks like a Google Form (limited
  styling), but it's the fastest way to get something working.
