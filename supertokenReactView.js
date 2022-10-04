import config from "../../"
import * as React from "react";
import * as SuperTokens from "supertokens-
auth-react";
import * as ThirdPartyEmailPassword from
"supertokens-auth-react/recipe/
thirdpartyemailpassword";
import { Github, Google } from
"supertokens-auth-react/recipe/
thirdpartyemailpassword";
import Session from "supertokens-auth-
react/recipe/session";
SuperTokens.init({
   appInfo: {
       appName: config.Supertokens.appName,
       apiDomain: config.Supertokens,
       websiteDomain: "http://
localhost:4200",
   },
   recipeList: [
       ThirdPartyEmailPassword.init({
           signInAndUpFeature: {
               providers: [Github.init(),
Google.init()],
           }
       }),
       Session.init(),
   ],
});
class SuperTokensReactComponent extends
React.Component {
   override render() {
       if (SuperTokens.canHandleRoute()) {
           return
SuperTokens.getRoutingComponent();
       }
       return "Route not found";
   }
}
export default SuperTokensReactComponent;
