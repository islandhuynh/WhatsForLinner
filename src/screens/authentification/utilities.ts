export interface AccScreenProps {
  setScreen: React.Dispatch<React.SetStateAction<AccScreen>>
}

export enum AccScreen {
  LOGIN,
  REGISTER
}