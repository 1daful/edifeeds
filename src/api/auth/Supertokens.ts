import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";

export class SupertokensAuth {
    constructor () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens Demo",
                apiDomain: "http://localhost:3001",
            },
            recipeList: [Session.init()],
        });
    }
}