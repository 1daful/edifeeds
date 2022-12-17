package main
import (
    "github.com/supertokens/supertokens-golang/recipe/session"
    "github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
    "github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
    "github.com/supertokens/supertokens-golang/supertokens"
    "net/http" 
    "github.com/gorilla/handlers" 
    "github.com/gorilla/mux" 
    "github.com/supertokens/supertokens-golang/supertokens")

func main() { 
    // SuperTokens init... 
    apiBasePath := "/auth"
    websiteBasePath := "/auth"
    err := supertokens.Init(supertokens.TypeInput{
        Supertokens: &supertokens.ConnectionInfo{
            // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
            ConnectionURI: "https://try.supertokens.com",
            // APIKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
        },
        AppInfo: supertokens.AppInfo{
            AppName: "Edifeeds",
            APIDomain: "http://localhost:2000",
            WebsiteDomain: "http://localhost:9000",
            APIBasePath: &apiBasePath,
            WebsiteBasePath: &websiteBasePath,
        },
        RecipeList: []supertokens.Recipe{
            thirdpartyemailpassword.Init(&tpepmodels.TypeInput{
/*TODO: See next step*/
thirdpartyemailpassword.Init(&tpepmodels.TypeInput{ Providers: []tpmodels.TypeProvider{ 
    // We have provided you with development keys which you can use for testing. 
    // IMPORTANT: Please replace them with your own OAuth keys for production use. 
    thirdparty.Google(tpmodels.GoogleConfig{ ClientID: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com", ClientSecret: "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", }), thirdparty.Github(tpmodels.GithubConfig{ ClientID: "467101b197249757c71f", ClientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd", }), thirdparty.Apple(tpmodels.AppleConfig{ ClientID: "4398792-io.supertokens.example.service", ClientSecret: tpmodels.AppleClientSecret{ KeyId: "7M48Y4RYDL", PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----", TeamId: "YWQCXGJRJL", }, }), 
     thirdparty.Facebook(tpmodels.FacebookConfig{ // ClientID: "FACEBOOK_CLIENT_ID", 
     ClientSecret: "FACEBOOK_CLIENT_SECRET", 
     }), 
    }
}),
            session.Init(nil), // initializes session features
        },
    })

    if err != nil {
        panic(err.Error())
    }
    // Add APIs 
    router := mux.NewRouter() 
     Adding handlers.CORS(options)(supertokens.Middleware(router))
    http.ListenAndServe(
        "SERVER ADDRESS", 
        handlers.CORS( 
            handlers.AllowedHeaders(
                append([]string{"Content-Type"}, 
                supertokens.GetAllCORSHeaders()...)
            ), 
            handlers.AllowedMethods(
                []string{
                    "GET", "POST", "PUT", "HEAD", "OPTIONS"
                }), 
                handlers.AllowedOrigins(
                    []string{"http://localhost:9000"}
                ), handlers.AllowCredentials(), 
        )(supertokens.Middleware(router))
    )

}
