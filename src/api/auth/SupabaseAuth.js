import config from "../../../public/config.json";
import { createClient } from "@supabase/supabase-js";
class SupabaseAuth {
    constructor() {
    }
    static _instance;
    static get Instance() {
        return this._instance || new SupabaseAuth();
    }
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, config.api.Supabase.options);
    auth = this.supabase.auth;
    authenticated = false;
    async signUp(userCred, data) {
        const { user, session, error } = await this.auth.signUp({
            email: userCred.email,
            password: userCred.password,
        }, {
            data: data
        });
        return { user, session, error };
    }
    async updateUser(user) {
        const { data, error } = await this.auth.update(user);
        return { data, error };
    }
    async login(providerId, userCred) {
        let scopes;
        switch (providerId) {
            case "google":
                scopes = '';
                break;
            case "facebook":
                scopes = 'public_profile email';
                break;
            case "twitter":
                scopes = '';
                break;
            default:
                if (userCred) {
                    const { user, session, error } = await this.auth.signIn({
                        email: userCred.email,
                        password: userCred.password
                    });
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
    async isAuthenticated() {
        if (this.startSession()) {
            return true;
        }
        else
            return false;
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
    async updateCred(key, val) {
        const { data, user, error } = await this.auth.update({ [key]: val });
        return { data, user, error };
    }
    async resetPassword(email) {
        return this.auth.api.resetPasswordForEmail(email, {
            redirectTo: "/profile"
        });
    }
    startSession() {
        return this.auth.session()?.user;
    }
    isNewUser(user) {
        if (user.user_metadata.last_signin === user.user_metadata.created_at) {
            return true;
        }
        else {
            return false;
        }
    }
}
export const auth = SupabaseAuth.Instance;
//# sourceMappingURL=SupabaseAuth.js.map