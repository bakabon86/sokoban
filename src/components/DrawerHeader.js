import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { colors } from '../utils/constants';
import styled from 'styled-components/native';


const AvatarContainer = styled.View`
  flex: 2;
  top: 5;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.Image`
  width: 108;
  height: 108;
  borderRadius: 50;
`;


//const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';
const LOGO_URL = '../../assets/images/app.png';

const DrawerHeader = ({ navigateToCallback }) => (
	<TouchableOpacity onPress={() => navigateToCallback('Home')}>
		<View
			style={{
				flexDirection: 'row',
				//backgroundColor: '#0033FF',
				backgroundColor: colors.BLUE_100,
				paddingVertical: 28,
				paddingLeft: 17,
				paddingTop: StatusBar.currentHeight + 10,
				alignItems: 'center',
			}}
		>
			{/* <Image
				source={{
					uri: LOGO_URL,
					width: 40,
					height: 40,
				}}
			/> */}
			<Image
				source={
					require(LOGO_URL)
				}
				style={{width: 40, height: 40}}
			/>
			<Text style={{ color: '#FFF', paddingLeft: 9, fontSize: 16 }}>
				Sokoban
			</Text>
		</View>
	</TouchableOpacity>
);

export default DrawerHeader;
