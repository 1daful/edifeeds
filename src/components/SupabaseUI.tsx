import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'
import config from "../../public/config.json"

const supabase = createClient(config.api.Supabase.url, config.api.Supabase.key)

const Container = (props: { supabaseClient: { auth: { signOut: () => void } }; 
children: any }) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export default function ReactAuth() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  )
}