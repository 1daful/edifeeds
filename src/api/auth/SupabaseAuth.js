import config from "../../../public/config.json";
import { createClient } from "@supabase/supabase-js";
class SupabaseAuth {
    constructor() {
        //if(SupabaseAuth._instance)
    }
    static _instance;
    static get Instance() {
        return this._instance || new SupabaseAuth();
    }
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, config.api.Supabase.options);
    auth = this.supabase.auth;
    authenticated = false;
    //jwt?: string
    async signUp(userCred, data) {
        const { user, session, error } = await this.auth.signUp({
            email: userCred.email,
            password: userCred.password,
        }, {
            data: data
        });
        return { user, session, error };
    }
    async updateUser(jwt, user) {
        const { data, error } = await this.auth.api.updateUser(jwt, user);
        return { data, error };
    }
    async login(providerId, userCred) {
        //let provider: Provider = providerId
        let scopes;
        switch (providerId) {
            case "google":
                //provider = 'google'
                scopes = '';
                break;
            case "facebook":
                //provider = 'facebook'
                scopes = 'public_profile email';
                break;
            case "twitter":
                //provider = 'twitter'
                scopes = '';
                break;
            default:
                if (userCred) {
                    const { user, session, error } = await this.auth.signIn({
                        email: userCred.email,
                        password: userCred.password
                    });
                    //const jwt = session?.access_token
                    this.authenticated = true;
                    return { user, session, error };
                }
                break;
        }
        const { user, session, error } = await this.auth.signIn({
            provider: providerId
        }, {
            scopes: scopes
        });
        /*if (session) {
          const oAuthToken = session.provider_token // use to access provider API
        }*/
        this.authenticated = true;
        return { user, session, error };
    }
    async logout() {
        const { error } = await this.auth.signOut();
        return error;
    }
    async getUser() {
        const user = await this.auth.user();
        return user;
    }
    isAuthenticated() {
        let sess;
        this.auth.onAuthStateChange((event, session) => {
            this.authenticated = true;
            console.log("event and session");
            console.log(event, session);
            sess = session;
        });
        console.log("session: ", sess);
        return this.authenticated;
    }
    isSignedIn() {
        let signedIn = false;
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_IN') {
                console.log('SIGNED_IN', session);
            }
        });
        signedIn = true;
        return signedIn;
    }
    isSignedOut() {
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_OUT')
                console.log('SIGNED_OUT', session);
        });
    }
    isDeleted() {
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'USER_DELETED')
                console.log('USER_DELETED', session);
        });
    }
    async updateCred(email) {
        const { user, error } = await this.auth.update({ email: email });
        return { user, error };
    }
    async recoverPassword(email) {
        const { data, error } = await this.auth.api.resetPasswordForEmail(email);
        return { data, error };
    }
    startSession() {
        return this.auth.session()?.user;
    }
}
export const auth = SupabaseAuth.Instance;
//# sourceMappingURL=SupabaseAuth.js.map