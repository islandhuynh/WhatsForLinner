import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';

import { spacer } from '../../components/styles/stylesheet';

export const LoginScreen = (): JSX.Element => {
  const { login, error, createUser } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState<string | undefined>(undefined);

  return (
    <SafeArea>
      <View style={styles.formContainer}>
        <View style={spacer.large} />
        <Text style={styles.title}>What's for Linner?</Text>
        <View style={spacer.large} />
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/lottie/4762-food-carousel.json")}
          style={styles.animationView}
        />
        <View style={spacer.large} />
        <Text>Email</Text>
        <TextInput placeholder="email" onChangeText={emailValue => setEmailInput(emailValue)} />
        <Text>Password</Text>
        <TextInput placeholder="password" secureTextEntry={true} onChangeText={pass => setPasswordInput(pass)} />
        <Button title="Login" onPress={() => { login(emailInput, passwordInput) }} />
        {error && <Text>{error}</Text>}
        <Button title="Test" onPress={() => { createUser() }} />
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    alignContent: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  animationView: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center'
  }
})
