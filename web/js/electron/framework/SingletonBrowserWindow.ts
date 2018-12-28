/**
 * Create a single browser window by key and just focus if the window is still
 * open the second time we try to open it.
 */
import {BrowserWindow} from 'electron';
import {BrowserWindowRegistry, BrowserWindowTag, TagMap} from './BrowserWindowRegistry';
import {Logger} from '../../logger/Logger';

const log = Logger.create();

export class SingletonBrowserWindow {

    public static async getInstance(tag: BrowserWindowTag,
                                    browserWindowFactory: BrowserWindowFactory,
                                    extraTags: TagMap = {}): Promise<BrowserWindow> {

        const existing = BrowserWindowRegistry.tagged(tag);

        if (existing.length === 1) {

            log.info("Found existing repository UI. Focusing.");

            const id = existing[0];

            const browserWindow = BrowserWindow.fromId(id);
            browserWindow.focus();
            return browserWindow;

        }

        // FIXME: there's a problem here in that there's a race here ... we need
        // to acquire some sort of mutex lock per tag here before opening the
        // window... ... but what do we do if the window is 'opening' ???
        const result = await browserWindowFactory();

        const tags: TagMap = Object.assign({}, extraTags);
        tags[tag.name] = tag.value;

        BrowserWindowRegistry.tag(result.id, tags);

        return result;

    }

}

export type BrowserWindowFactory = () => Promise<BrowserWindow>;
