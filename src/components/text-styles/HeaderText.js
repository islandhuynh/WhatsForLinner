import styled from "styled-components/native";

export const HeaderText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${(props) => props.theme.colors.brand.primary};
`;
