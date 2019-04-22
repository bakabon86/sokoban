import { colors } from './utils/constants';
import React, { Component } from 'react';
import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

export const evaluateOuterDrawerListItems = items => {
	const drawerItems = {};
	items.forEach((item, index) => {
		let { key } = item;
		// Delimiter _
		// key => DataSearch_Basic to DataSearch
		key = key.substr(0, key.indexOf('_'));
		if (key.length) {
			if (drawerItems.hasOwnProperty(key)) {
				drawerItems[key].end = index + 1;
			} else {
				drawerItems[key] = {
					start: index,
					end: 0,
				};
			}
		}
	});
	return drawerItems;
};

export const evaluateChildDrawerTitle = ({ navigation }) => ({
	title: navigation.state.key.substr(navigation.state.key.indexOf('_') + 1),

	headerStyle: {
		backgroundColor: colors.BLUE_100,
	},
	headerTitleStyle: {
		color: colors.WHITE,
	},
	headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
});

export const singleDrawerTitle = ({ navigation }) => ({
	title: navigation.state.key,

	headerStyle: {
		backgroundColor: colors.BLUE_100,
	},
	headerTitleStyle: {
		color: colors.WHITE,
	},
	headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
});