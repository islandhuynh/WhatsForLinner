import styled from "styled-components/native";

export const PageTitle = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${(props) => props.theme.colors.ui.primary};
  text-align: center;
`;