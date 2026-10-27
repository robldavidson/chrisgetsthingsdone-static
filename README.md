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

The `.support__form-placeholder` div in `index.html`'s `#support`
section is where a sign-up/endorsement-request form goes. A few free
options that work on a static GitHub Pages site (no backend of your
own needed):

- **Formspree** — you write a plain `<form>` in your own HTML pointed
  at a Formspree endpoint URL; it emails you the submissions. Because
  it's your own markup, it matches the rest of the page's design
  exactly rather than sitting in an iframe. Free tier: 50
  submissions/month. Best fit if you want the form to look native.
- **Google Forms** — zero setup, completely free, no submission cap.
  Embed via the iframe Google gives you under Send > Embed HTML.
  Responses land in a Google Sheet. Looks like a Google Form (limited
  styling), but it's the fastest way to get something working today.
- **Jotform** — nicer-looking embeddable forms and conditional logic
  out of the box; free tier caps at 100 submissions/month and 5 forms,
  and shows Jotform's own branding link unless you're on a paid plan.
- **Tally** — similar to Jotform, generous free tier, clean embed,
  worth a look if Formspree's plain-form approach doesn't fit.

For a small campaign site, Formspree (native look, no iframe) or
Google Forms (fastest to set up) are the two worth starting with.
