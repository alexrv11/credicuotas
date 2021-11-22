import React from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '633905538419-23ltnsa16p1727n90vll09nvn6j6jh25.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const SignInScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Sign in screen
            </Text>
            <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}><Text>Sign in with Google</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

export default SignInScreen;