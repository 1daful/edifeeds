import { auth } from "../auth/SupabaseAuth";
export class EAuth {
    auth = auth;
    async signUp(user, data) {
        return await this.auth.signUp(user, data);
    }
    login(id, user) {
        this.auth.login(id, user);
    }
    logout() {
        throw new Error("Method not implemented.");
    }
    getUser() {
        throw new Error("Method not implemented.");
    }
    isAuthenticated() {
        return true;
    }
}
//# sourceMappingURL=Auth.js.map