import React from 'react';
import { View, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation';
import styled from 'styled-components/native';

import Button from './Button';


const ContainerView = styled.View`
  flex: 1;
`;

const DrawerContainer = styled.View`
  flex: 8;
`;

const AvatarContainer = styled.View`
  flex: 2;
  top: 5;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.View`
  width: 108;
  height: 108;
  borderRadius: 50;
  backgroundColor: ${props => props.theme.BLUE_100};
`;

const ItemContainer = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const CustomDrawerContent = (props) => ( 
  <View>
    <ScrollView>
      <ContainerView>       
       <DrawerContainer>
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
          <ItemContainer>                
            <DrawerItems {...props} />
          </ItemContainer>
        </DrawerContainer>
        <ButtonContainer>
          <Button text="Logout" onPress={() => props.navigation.navigate('Logout')} />
        </ButtonContainer>
      </ContainerView>
    </ScrollView>
  </View>
);

export default CustomDrawerContent;
