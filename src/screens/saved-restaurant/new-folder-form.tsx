import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface NewFolderProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewFolderForm: React.FC<NewFolderProps> = ({ setModalVisibility }): JSX.Element => {
  const [newFolderName, setNewFolderName] = useState('')

  return (
    <View>
      <Text>Add Folder</Text>
      <TextInput mode="outlined" label="Restaurant name" value={newFolderName} onChangeText={name => setNewFolderName(name)} />
      <Button onPress={() => setModalVisibility(false)} mode="contained">Add New Folder</Button>
    </View>
  )
}