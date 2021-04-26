import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';
import { AccScreen, AccScreenProps } from './utilities';
import { spacer } from '../../components/styles/stylesheet';
import { colorTheme } from '../../components/styles/theme';

export const RegisterScreen: React.FC<AccScreenProps> = ({ setScreen }): JSX.Element => {
  const { error, registerUser, setError } = useContext(AuthContext);
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
      <ImageBackground source={require("../../../assets/background/food-gathering.jpg")} style={styles.backgroundImage}>
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
          <TextInput
            theme={{ colors: { primary: colorTheme.midnightGreen } }}
            mode="outlined"
            label="Email"
            placeholder="Email"
            onChangeText={emailValue => setEmailInput(emailValue)}
          />
          <TextInput
            theme={{ colors: { primary: colorTheme.midnightGreen } }}
            mode="outlined"
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={pass => setPasswordInput(pass)}
          />
          <TextInput
            theme={{ colors: { primary: colorTheme.midnightGreen } }}
            mode="outlined"
            label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={secondPass => setConfirmPasswordInput(secondPass)}
          />
          <View style={spacer.xs} />
          <Button
            color={colorTheme.midnightGreen}
            mode="contained"
            onPress={() => createNewAccount()}
          >
            Sign up
          </Button>
          <View style={spacer.xs} />
          <Text style={styles.centeredText}>Already have an account? Sign In</Text>
          <Button
            color={colorTheme.midnightGreen}
            mode="contained"
            onPress={() => {
              setScreen(AccScreen.LOGIN)
              setError(null)
            }}
          >
            Return to Sign in
          </Button>
        </View>
      </ImageBackground>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 32,
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
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
    textAlign: 'center',
    color: colorTheme.midnightGreen,
  },
  centeredText: {
    textAlign: 'center',
  },
  textInputColor: {
    color: colorTheme.midnightGreen
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  }
})

