# sul-cidr.github.io

~This is a back-of-an-envelope experiment.  Originally it was set up to grab the Stanford Events RSS feed directly in the client browser on page load, but the feed is served without a CORS header (somewhat inexplicably -- I have a ticket that's been open and unanswered for 10 months at time of writing), so it was using a CORS proxy.  Today I updated it to fetch the RSS feed every day in a GitHub Actions workflow and commit it to the repo from where it is served by GitHub Pages.  If this is ever to be more than an experiment a better solution should probably be used.~

### Feb. 2022 Update

Updated to use the RSS feed from the new events.stanford.edu site.  This feed is inferior in many ways, ~but is at least served with appropriate CORS headers.  The GitHub Actions workflow has been accordingly disabled, but is left in the repo for posterity.~

Further update: the RSS feed seems to have the needed CORS headers **some of the time**, but not always.  Unclear why (load balancer?  caching?) but the Actions workflow has been reinstated and updated to fetch the new feed.
