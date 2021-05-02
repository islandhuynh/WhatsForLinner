import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
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
  }
})

export const spacer = StyleSheet.create({
  xs: {
    padding: 4
  },
  small: {
    padding: 8
  },
  medium: {
    padding: 12
  },
  large: {
    padding: 16
  },
  xl: {
    padding: 20
  },
  xxl: {
    padding: 24
  }
})