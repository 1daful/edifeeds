import { LocalStorage } from "quasar";
import { auth } from "./SupabaseAuth";
export const authGuard = async (to, from, next) => {
    //const auth = new Auth();
    //const auth = new SupabaseAuth()
    if (await auth.startSession()) {
        next();
    }
    else {
        LocalStorage.set("url", to.path);
        next({
            name: "SignIn",
            path: "signin",
        });
    }
};
export const navGuard = async (t, from, next) => {
};
//# sourceMappingURL=authGuard.js.map