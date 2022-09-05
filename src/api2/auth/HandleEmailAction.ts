import { applyActionCode, checkActionCode } from "@firebase/auth";
import { FirebaseAuth } from "../auth/FirebaseAuth";

export class HandleEmailAction {

    fAuth = new FirebaseAuth()
    auth = this.fAuth.auth
    actionMessage = {
        verifyEmail: '',
        resetPaasword: '',
        recoverEmail: ''
    }
    log = {
        errorCode: '',
        errorMessage: ''
    }

    handlePasswordReset(actionCode: string, continueUrl: string, lang: string, showResetScreen: Function){
        let that = this
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        let localLang = lang;
    }

    handleEmailRecover(actionCode: string, continueUrl: string, lang: string) {
        let that = this;
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        let restoredEmail: string;
        // Confirm the action code is valid.
        checkActionCode(this.auth, actionCode).then((info) => {
        // Get the restored email address.
        restoredEmail = info.data.email || '';

        // Revert to the old email.
        applyActionCode(this.auth, actionCode);
        }).then(() => {

        // Account email reverted to restoredEmail

        // TODO: Display a confirmation message to the user.

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        this.fAuth.sendPasswordResetEmail(restoredEmail)
    }).catch(function(error) {
        // Invalid code.
        that.log.errorCode = error.code;
        that.log.errorMessage = error.message;
        switch (error.code) {
            case '':
                
                break;
        
            default:
                break;
        }
    });
    }

    handleEmailVerification(actionCode: string, continueUrl: string, lang: string, showContinueLink: Function) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        // Try to apply the email verification code.
        let that = this
        applyActionCode(this.auth, actionCode).then(() => {
            // Email address has been verified.
    
            // TODO: Display a confirmation message to the user.
            // You could also provide the user with a link back to the app.
    
            showContinueLink(continueUrl);
            this.actionMessage.verifyEmail = "Email address successfully verified."
    
            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch(function(error) {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
            that.log.errorMessage = error.message;
            that.log.errorCode = error.code;
                    that.actionMessage.verifyEmail = 'The verification link is invalid.'
            });
    }
}