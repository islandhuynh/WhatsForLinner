import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface NewFolderProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewFolderForm: React.FC<NewFolderProps> = ({ setModalVisibility }): JSX.Element => {
  const [newFolderName, setNewFolderName] = useState('');

  return (
    <View style={styles.modalView}>
      <Text>Add Folder</Text>
      <TextInput mode="outlined" label="Restaurant name" value={newFolderName} onChangeText={name => setNewFolderName(name)} />
      <View style={styles.spacing} />
      <Button onPress={() => setModalVisibility(false)} mode="contained">Add New Folder</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  errorText: {
    color: 'red'
  },
  spacing: {
    padding: 8,
  }
})