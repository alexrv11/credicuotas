import React from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';

const SignInScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Sign in screen
            </Text>
            <TouchableOpacity onPress={() => console.log("click home")}><Text>Home</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

export default SignInScreen;