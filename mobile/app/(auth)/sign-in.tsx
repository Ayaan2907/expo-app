import { useSignIn } from '~/lib/auth-hooks'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return
    console.log('signIn', signIn)
    router.replace('/(tabs)')



    // Start the sign-in process using the email and password provided
    // try {
    //   const signInAttempt = await signIn.create({
    //     identifier: emailAddress,
    //     password,
    //   })

    //   // If sign-in process is complete, set the created session as active
    //   // and redirect the user
    //   if (signInAttempt.status === 'complete') {
    //     await setActive({ session: signInAttempt.createdSessionId })
    //     router.replace('/')
    //   } else {
    //     // If the status isn't complete, check why. User might need to
    //     // complete further steps.
    //     console.error(JSON.stringify(signInAttempt, null, 2))
    //   }
    // } catch (err) {
    //   // See https://clerk.com/docs/custom-flows/error-handling
    //   // for more info on error handling
    //   console.error(JSON.stringify(err, null, 2))
    // }
  }

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <View className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6">
        <Text className="text-3xl font-bold text-center text-primary mb-2">Sign in</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          onChangeText={setEmailAddress}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-2"
        />
        <TextInput
          value={password}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          onChangeText={setPassword}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-4"
        />
        <TouchableOpacity
          onPress={onSignInPress}
          className="w-full bg-primary rounded-lg py-3 items-center active:opacity-80"
        >
          <Text className="text-white font-semibold text-base">Continue</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-zinc-500 mr-1">Don't have an account?</Text>
          <Link href="/sign-up">
            <Text className="text-primary font-semibold">Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}