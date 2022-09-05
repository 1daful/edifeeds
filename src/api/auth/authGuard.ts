
import { auth } from "./SupabaseAuth";
export const authGuard = async (to: any, from: any, next: any) => {
    //const auth = new Auth();
    //const auth = new SupabaseAuth()

      if (await auth.startSession()) {
        next();
      }
      else (next({
        name: "SignIn",
        path: "signin",
        query: {
          myUrl: to.path
        }
      }))
  }
