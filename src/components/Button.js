import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { colors } from '../utils/constants';

const ButtonContainer = styled.TouchableHighlight`
  width: 260;
  height: 40;
  marginBottom: 10;
  backgroundColor: #41bce6;
  borderRadius: 5;
  justifyContent: center;
  alignItems: center;
`;
// backgroundColor: ${props=> props.theme.BLUE_100};
const Text = styled.Text`
  fontSize: 20;
  color: #fff;
`;
// color: ${props => props.theme.WHITE};
class Button extends Component {
  render() {
    const { text, onPress, theme } = this.props;

    return (
      <ButtonContainer
        underlayColor={colors.BLUE_200}
        onPress={onPress}
      >
        <Text>{text}</Text>
      </ButtonContainer>
    );
  }
}

export default withTheme(Button);
