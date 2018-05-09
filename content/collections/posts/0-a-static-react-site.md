---
title: A static React site on S3 with directory-style URIs
slug: a-static-react-site
blurb: "I wanted to put together a new site recently, as I'm thinking about looking for a job soon. This was a bit of a treat - a personal site is always an excuse to mess around with the latest Gee Whiz toolsets without worrying about whether they fit a client's needs, or whether they actually make any kind of sense."
---

I wanted to put together a new site recently, as I'm thinking about looking for a job soon. This was a bit of a treat - a personal site is always an excuse to mess around with the latest Gee Whiz toolsets without worrying about whether they fit a client's needs, or whether they actually make any kind of sense.

This post will describe how it was built, and the one or two interesting hacks that were needed along the way. Maybe they'll be useful to somebody with similar requirements to mine.

My requirements were:

1. Directly editable. No messing around with templates.
2. Markdown post support.
3. Static site. No webserver needed.
4. Instantaneous navigation between pages. No loading.
5. No ugly "/foo/index.html" URIs that document stores like S3 usually require.

I checked the calendar and it's 2018, so obviously I decided to use React.

Why not [Ghost](https://ghost.org/), the excellent blogging platform? It's not static. I didn't want to be running a persistent server process just to deliver dumb unchanging content<sup>1</sup>.

Why not [Jekyll](https://jekyllrb.com/), or [Hugo](https://gohugo.io/), the excellent static blog generators? I wanted the freedom to write my own pages from scratch ([like a portfolio page](https://bonner.jp/work)) rather than mess around with passing themes through an engine.

But forcing a user to download a big blob of JS, in order to download some data, in order to render a page in their browser is even slower and more wasteful than running their request through a serverside process.

The solution was a well-maintained and highly customizable build tool for React called [React Static](https://github.com/nozzle/react-static). It allows me to run a build command locally and upload the resulting assets to S3, so the initial document that hits the user's browser is already the prerendered HTML page they requested. React (and the data React will use to hydrate the other pages to which they may want to navigate) are downloaded in the background.

With the addition of a markdown-to-JSON library called [jdown](https://github.com/DanWebb/jdown), that took care of requirements 1 through 4.

Unfortunately, React Static seems to have been designed to be delivered by an Apache-style server, where the URL `/posts/` would correspond to the file `/posts/index.html` with a module like `mod_dir`. It generates an output `/dist/` folder with this kind of structure that isn't going to work on a system not running Apache, like any document store. The project actually [recommends S3 as a hosting option](https://github.com/nozzle/react-static/blob/master/docs/concepts.md#hosting) (behind Netlify, which also looks nice), but ignores this problem.

Even if React Static did something more S3-friendly with the directory - generating `/dist/posts.html` rather than `/dist/posts/index.html`, for instance - that wouldn't really serve our purposes. S3 allows exactly two request destination rewrites for a bucket: one of them for the root bucket URL, and the other for errors. Using the default behavior would mean that users arriving directly at [https://bonner.jp/work](https://bonner.jp/work) - or refreshing, or using the browser's back button - would not get the prerendered page they wanted.

Instead, their browser would show them the HTML for the index page (or error page, depending on how S3 was configured), and after React finished downloading and checking the URI, the desired page would be rendered. Unacceptable!

So customizing React Static was not a solution. Finding another storage solution that supported this structure might be, but I'm not aware of anything as cheap and powerful as S3/Cloudfront.

Luckily, AWS recently released a service called [Lambda@Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) that allows you to execute arbitrary code *at the cache* rather than waiting for it to hit the server, *and modify the request object accordingly*.

So once the S3 content is behind a Cloudfront CDN, it's a simple step to write a regex that will append `/index.html` onto an inbound page request, discarding a trailing slash if it's present, and ignoring assets.

A hastily written regex to exclude asset requests:
```
/^((?!\.(css|js|html|xml|txt|ico|jpg|png|gif|json|pdf)$).)*$/
```

Now a user's request to e.g. [https://bonner.jp/work](https://bonner.jp/work) will return the HTML for the "Work" page, at which point the JS it needs to render everything else<sup>2</sup> downloads in the background. Voila.

If you'd like to see how it turned out, well, click around. The source code is [here on github](https://github.com/j4p3/bonner.jp). Thanks for reading.

### Footnotes

1. My previous site used [obtvse](https://github.com/natew/obtvse2), a (hilarious) parody/clone of the [svbtle](https://svbtle.com/) blog network. I enjoyed admin postwriting tool, but there was no need to run a Rails app with an accompanying database just to present text that wouldn't change between requests. These days I compose everything in a text editor anyway.
2. Everything else linked to on that page, anyway.