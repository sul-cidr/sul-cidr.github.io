# sul-cidr.github.io

This is a back-of-an-envelope experiment.  Originally it was set up to grab the Stanford Events RSS feed directly in the client browser on page load, but the feed is served without a CORS header (somewhat inexplicably -- I have a ticket that's been open and unanswered for 10 months at time of writing), so it was using a CORS proxy.  Today I updated it to fetch the RSS feed every day in a GitHub Actions workflow and commit it to the repo from where it is served by GitHub Pages.  If this is ever to be more than an experiment a better solution should probably be used.
