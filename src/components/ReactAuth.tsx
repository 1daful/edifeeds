import config from "../../public/config.json"
import * as React from "react";
import * as SuperTokens from "supertokens-auth-react";
import * as ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { Facebook, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
SuperTokens.init({
   appInfo: {
       appName: config.api.Supertokens.appName,
       apiDomain: config.api.Supertokens.apiDomain,
       websiteDomain: "http://localhost:9000",
   },
   recipeList: [
       ThirdPartyEmailPassword.init({
           signInAndUpFeature: {
               providers: [Facebook.init(), Google.init()],
           }
       }),
       Session.init(),
   ],
});
class SuperTokensReactComponent extends
React.Component {
   override render() {
       if (SuperTokens.canHandleRoute()) {
           return SuperTokens.getRoutingComponent();
       }
       return "Route not found";
   }
}
export default SuperTokensReactComponent;
