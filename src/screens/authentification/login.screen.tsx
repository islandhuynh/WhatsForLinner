import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';

export const LoginScreen = (): JSX.Element => {
  const { login, error } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState<string | undefined>(undefined);

  return (
    <SafeArea>
      <View style={styles.formContainer}>
        <Text>What's for Linner?</Text>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/lottie/4762-food-carousel.json")}
          style={styles.animationView}
        />
        <Text>Email</Text>
        <TextInput placeholder="email" onChangeText={emailValue => setEmailInput(emailValue)} />
        <Text>Password</Text>
        <TextInput placeholder="password" secureTextEntry={true} onChangeText={pass => setPasswordInput(pass)} />
        <Button title="Login" onPress={() => { login(emailInput, passwordInput) }} />
        {error && <Text>{error}</Text>}
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    alignContent: 'center',
  },
  animationView: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
