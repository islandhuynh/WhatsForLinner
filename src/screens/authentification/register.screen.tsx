import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';
import { AccScreen, AccScreenProps } from './utilities';
import { spacer } from '../../components/styles/stylesheet';

export const RegisterScreen: React.FC<AccScreenProps> = ({ setScreen }): JSX.Element => {
  const { error, registerUser } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState<string | undefined>(undefined);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string | undefined>(undefined);
  const [registerError, setRegisterError] = useState<string | undefined>(undefined);

  const createNewAccount = () => {
    if (!emailInput) {
      setRegisterError('Please enter an email');
      return;
    }

    if (!passwordInput) {
      setRegisterError('Please enter a password');
      return;
    }

    if (passwordInput.length < 8) {
      setRegisterError('Please enter a password of at least 8 characters');
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setRegisterError('Please make sure both passwords match');
      return;
    }

    registerUser(emailInput, passwordInput);
    setRegisterError(undefined);
  }

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
        {registerError && <Text>{registerError}</Text>}
        {error && <Text>{error}</Text>}
        <Text>Email</Text>
        <TextInput placeholder="email" onChangeText={emailValue => setEmailInput(emailValue)} />
        <Text>Password</Text>
        <TextInput placeholder="password" secureTextEntry={true} onChangeText={pass => setPasswordInput(pass)} />
        <Text>Confirm Password</Text>
        <TextInput placeholder="confirm password" secureTextEntry={true} onChangeText={secondPass => setConfirmPasswordInput(secondPass)} />
        <Button title="Sign Up" onPress={() => createNewAccount()} />
        <Text>Already have an account? Sign In</Text>
        <Button title="Return to sign in" onPress={() => setScreen(AccScreen.LOGIN)} />
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
