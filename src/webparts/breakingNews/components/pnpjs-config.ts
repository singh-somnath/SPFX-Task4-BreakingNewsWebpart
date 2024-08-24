// import pnp, pnp logging system, and any other selective imports needed
import { ISPFXContext, spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/hubsites";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/profiles";
import "@pnp/sp/presets/all";


let _sp: SPFI;

export const getSP = (context?: ISPFXContext): SPFI => {
    if (context) {
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};