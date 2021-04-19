import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  }
})