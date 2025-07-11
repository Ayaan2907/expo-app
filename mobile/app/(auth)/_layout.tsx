import { Redirect, Stack } from 'expo-router'
import { useAuth } from '~/lib/auth-hooks'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack />
}