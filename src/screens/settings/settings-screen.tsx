import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colorTheme } from '../../components/styles/theme';
import { SafeArea } from '../../components/utility/safe.area.component';
import { AuthContext } from '../../services/authentification/firebase-auth';

export const Settings = (): JSX.Element => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeArea>
      <View style={styles.settingsContainer}>
        <Text style={styles.title}>Settings</Text>
        <Button
          mode="contained"
          color={colorTheme.midnightGreen}
          onPress={() => logout()}
        >
          logout
        </Button>
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  settingsContainer: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
})