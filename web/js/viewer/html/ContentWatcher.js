const $ = require('jquery')

const {Preconditions} = require("../../Preconditions");
const {Objects} = require("../../util/Objects");

/**
 * Assumes that you have tried to change the URL for an iframe and watches for
 * it to start loading properly.
 */
class ContentWatcher {

    // TODO: right now we look for the URL not being about:blank which is kind
    // of a hack but works for now.  Technically we should listen to the
    // iframe src attribute changing.

    constructor(contentElement, callback, options ) {
        this.contentElement = Preconditions.assertNotNull(contentElement, "contentElement");
        this.options = Objects.defaults(options, {
            timeoutInterval: 100,
            currentURL: "about:blank"
        });
        this.callback = Preconditions.assertNotNull(callback, "callback");

        this.completed = false;

    }

    start() {
        this.watchInBackground();
    }

    watchInBackground() {

        if(this.finishedLoading()) {

            console.log("Detected content loaded.");
            this.callback();
            return;

        }

        setTimeout(this.watchInBackground.bind(this), this.options.timeoutInterval);

    }

    finishedLoading() {

        if(this.contentElement.tagName === "WEBVIEW") {
            return ! this.contentElement.isLoading();
        } else {

            return this.contentElement.contentDocument &&
                   this.contentElement.contentDocument.location.href !== this.options.currentURL;

        }

    }

}

module.exports.ContentWatcher = ContentWatcher;
