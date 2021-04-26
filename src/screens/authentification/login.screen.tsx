import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';
import { spacer } from '../../components/styles/stylesheet';
import { AccScreen, AccScreenProps } from './utilities';
import { colorTheme } from '../../components/styles/theme';

export const LoginScreen: React.FC<AccScreenProps> = ({ setScreen }): JSX.Element => {
  const { login, error, setError } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState<string | undefined>(undefined);

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
          <TextInput
            theme={{ colors: { primary: colorTheme.midnightGreen } }}
            label="Email"
            placeholder="Email"
            mode="outlined"
            onChangeText={emailValue => setEmailInput(emailValue)}
          />
          <TextInput
            theme={{ colors: { primary: colorTheme.midnightGreen } }}
            style={styles.textInputColor}
            label="Password"
            placeholder="Password"
            mode="outlined"
            secureTextEntry={true}
            onChangeText={pass => setPasswordInput(pass)}
          />
          <View style={spacer.small} />
          <Button color={colorTheme.midnightGreen} mode="contained" onPress={() => { login(emailInput, passwordInput) }}>Login</Button>
          {error && <Text style={styles.centeredText}>{error}</Text>}
          <View style={spacer.xs} />
          <Text style={styles.centeredText}>No Account? Register here!</Text>
          <Button
            color={colorTheme.midnightGreen}
            mode="contained"
            onPress={() => {
              setScreen(AccScreen.REGISTER)
              setError(null)
            }}
          >
            Register
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
    backgroundColor: 'rgba(255, 255, 255, 0.20)'
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
