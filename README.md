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

The `.video-embed` div in `index.html`'s `#video` section currently
holds:

```html
<iframe src="https://www.youtube-nocookie.com/embed/dnIm7XdJVxk"
	title="Chris White for English Party Chair" frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen></iframe>
```

To swap in a different video, replace `dnIm7XdJVxk` with the new
video's ID (the part after `youtu.be/` or `v=` in its URL) and update
the `title` attribute to match.

`youtube-nocookie.com` is YouTube's privacy-enhanced embed domain —
checked directly (including while the video was actually playing, not
just on load): it sets no cookies at all. This is also documented in
`cookies.html`, so if the video is ever swapped for a different
hosting approach (e.g. Vimeo), that page's "Campaign video" section
needs updating to match.

## Support section

`index.html`'s `#support` section originally held a **Jotform**
sign-up/endorsement embed, gated behind a cookie-consent banner
(`main.js` handled the Accept/Reject choice and conditionally loaded
the iframe + Jotform's auto-resize script). Both were removed once
voting opened: the section now just holds a static thank-you message
in `.support__message`, telling people to use their vote. The cookie
banner, its CSS, and the consent JS in `main.js` were removed at the
same time — with no third-party embed left to gate, there was nothing
left for a cookie banner to do. `cookies.html` and `privacy.html` were
updated to match (the site sets no cookies at all now).

If a sign-up form is ever needed again, a couple of free options:

- **Formspree** — you write a plain `<form>` in your own HTML pointed
  at a Formspree endpoint URL; it emails you the submissions. Because
  it's your own markup, it matches the rest of the page's design
  exactly rather than sitting in an iframe. Free tier: 50
  submissions/month.
- **Google Forms** — zero setup, completely free, no submission cap.
  Embed via the iframe Google gives you under Send > Embed HTML.
  Responses land in a Google Sheet. Looks like a Google Form (limited
  styling), but it's the fastest way to get something working.

Either of those sets its own third-party cookies once submitted, so
reintroducing one means reintroducing the Cookie Policy table and
(arguably) a consent banner too.
