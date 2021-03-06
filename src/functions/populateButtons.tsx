import React from 'react';
import { View, StyleSheet } from 'react-native';

// populate buttons in rows of threes
export const populateButtons = (typeList: string[], buttonFunction: (item: string) => JSX.Element): JSX.Element => {
  let buttonViewElements: JSX.Element[] = [];

  for (let index = 0; index < typeList.length; index += 3) {
    buttonViewElements.push(
      <View style={styles.horizontalButtonContainer} key={index}>
        <View style={{ flex: 1 }}>
          {buttonFunction(typeList[index])}
        </View>
        <View style={{ flex: 1 }}>
          {buttonFunction(typeList[index + 1])}
        </View>
        <View style={{ flex: 1 }}>
          {buttonFunction(typeList[index + 2])}
        </View>
      </View>
    )
  }

  return <>{buttonViewElements}</>
}

const styles = StyleSheet.create({
  horizontalButtonContainer: {
    flexDirection: 'row',
  }
})