import React from 'react';
import { Platform } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/Login';
import RegisterRequestScreen from './screens/Register/RegisterRequest';
import RegisterApprovalListScreen from './screens//Register/RegisterApprovalList';
import RegisterApprovalScreen from './screens/Register/RegisterApproval';
import RegisterHistoryListScreen from './screens/Register/RegisterHistoryList';

import formPushScreen from './screens/Push/formPush';
import PushApprovalListScreen from './screens/Push/PushApprovalList';
import PushApprovalScreen from './screens/Push/PushApproval';
import PushHistoryListScreen from './screens/Push/PushHistoryList';
import PushAcceptableListScreen from './screens/Push/PushAcceptableList';
import PushAcceptableScreen from './screens/Push/PushAcceptable';

import PushManifestingListScreen from './screens/Push/PushManifestingList';
import PushManifestedScreen from './screens/Push/PushManifested';

import PushPackingListScreen from './screens/Push/PushPackingList';
import PushTryPackingScreen from './screens/Push/PushTryPacking';
import PushPackingScreen from './screens/Push/PushPacking';
import PushPrePackingScreen from './screens/Push/PushPrePacking';
import PushPrePackingGetQRScreen from './screens/Push/PushPrePackingGetQR';
import PushPackedListScreen from './screens/Push/PushPackedList';
import PushPackedScreen from './screens/Push/PushPacked';

import PushExecListScreen from './screens/Push/PushExecList';
import PushExecScreen from './screens/Push/PushExec';

import PushStoreListScreen from './screens/Push/PushStoreList';
import PushStoreScreen from './screens/Push/PushStore';
import PushGetPINScreen from './screens/Push/PushGetPIN';
import PushAbortListScreen from './screens/Push/PushAbortList';
import PushAbortScreen from './screens/Push/PushAbort';

import PushCancelListScreen from './screens/Push/PushCancelList';
import PushCancelScreen from './screens/Push/PushCancel';
import ScanQRScreen from './screens/Push/ScanQR';

import PushDocumentAddScreen from './screens/Push/DocumentAdd.1';

import formPullScreen from './screens/formPull';
import DisposeScreen from './screens/formDispose';
import ChekInScreen from './screens/formCheckIn';
import CheckOutScreen from './screens/formCheckOut';



import PaymentEvidenceScreen from './screens/PaymentEvidence';
import WelcomeScreen from './screens/Welcome';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import FavoritesScreen from './screens/Favorites';
import SettingsScreen from './screens/Settings';
import LogoutScreen from './screens/Logout';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import AppCamera from './screens/Camera';
import CameraPage from './screens/CameraPage';

const AppMainTab = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Sweet home',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={23} color={tintColor} />
      ),
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Sweet Home',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
    })
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Favorites',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="heartbeat" size={23} color={tintColor} />
      ),
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="heartbeat" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Favorites',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={23} color={tintColor} />
      ),
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Profile',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
      headerRight: <SettingsIcon onPress={() => navigation.navigate('Settings')} />,
    })
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.WHITE,
    inactiveTintColor: colors.BLUE_50,
    inactiveBackgroundColor: colors.BLUE_100,
    activeBackgroundColor: colors.BLUE_100,
    showIcon: true,
    showLabel: Platform.OS === 'ios',
    indicatorStyle: {
      backgroundColor: colors.BLUE_300,
    },
    style: {
      backgroundColor: colors.BLUE_100,
    },
    upperCaseLabel: false,
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
});

const AppMainStack = StackNavigator({
  Home: { screen: AppMainTab },
  RegisterRequest: { 
    screen: RegisterRequestScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register Request',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-calculator" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register Request',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   RegisterApprovalList: { 
    screen: RegisterApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   RegisterApproval: { 
    screen: RegisterApprovalScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register Approval',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register Approval',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   RegisterHistoryList: { 
    screen: RegisterHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
  FormPush: { 
    screen: formPushScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushApprovalList: { 
    screen: PushApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushApproval: { 
    screen: PushApprovalScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Approval',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Approval',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushHistoryList: { 
    screen: PushHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAcceptableList: { 
    screen: PushAcceptableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Acceptable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Acceptable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAcceptable: { 
    screen: PushAcceptableScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Acceptable',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Acceptable',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushManifestingList: { 
    screen: PushManifestingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Manifesting List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Manifesting List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushManifested: { 
    screen: PushManifestedScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Manifested',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Manifested',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushPackingList: { 
    screen: PushPackingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packing List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packing List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushPrePacking: { 
    screen: PushPrePackingScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Pre Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Pre Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushPrePackingGetQR: { 
    screen: PushPrePackingGetQRScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Pre Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Pre Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushTryPacking: { 
    screen: PushTryPackingScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Try Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Try Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushPacking: { 
    screen: PushPackingScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },  
   PushPackedList: { 
    screen: PushPackedListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packed List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packed List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushPacked: { 
    screen: PushPackedScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packed',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packed',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
  //  PushExecList: { 
  //   screen: PushExecListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Exec List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Exec List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushExec: { 
  //   screen: PushExecScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Exec',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Exec',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
  //   }),
  //  },
   PushStoreList: { 
    screen: PushStoreListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Store List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Store List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushStore: { 
    screen: PushStoreScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Store',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Store',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushGetPIN: { 
    screen: PushGetPINScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Get PIN',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Get PIN',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   
   PushCancelList: { 
    screen: PushCancelListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Cancel List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Cancel List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushCancel: { 
    screen: PushCancelScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Cancel',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Cancel',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushAbortList: { 
    screen: PushAbortListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Abort List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Abort List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAbort: { 
    screen: PushAbortScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Abort',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Abort',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushAddDocument: { 
    screen: PushDocumentAddScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Add Document',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Add Document',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormPull:{
     screen: formPullScreen,
     navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormDispose: { 
    screen: DisposeScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Dispose',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-trash" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Dispose',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormCheckIn: { 
    screen: ChekInScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Check In',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Check In',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
  },
    FormCheckOut: { 
      screen: CheckOutScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Check Out',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-log-out" size={23} color={tintColor} />
        ),
        headerStyle: {
          backgroundColor: colors.BLUE_100,
        },
        headerTitle: 'Check Out',
        headerTitleStyle: {
          color: colors.WHITE,
        },
        headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
      }),
   },
   FormScanQR: { 
    screen: ScanQRScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'ScanQR',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'ScanQR',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
 }, 
   FormCamera: { 
    screen: CameraPage,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Camera',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Camera',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
 }, 
 Settings: {
  screen: SettingsScreen,
  navigationOptions: ({ navigation }) => ({
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="md-settings" size={23} color={tintColor} />
    ),
    headerStyle: {
      backgroundColor: colors.BLUE_100,
    },
    headerTitle: 'Settings',
    headerTitleStyle: {
      color: colors.WHITE,
    },
    headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
  }),
},
}, {
  cardStyle: {
    backgroundColor: colors.BLUE_50,
  },
  mode: 'modal',
});

const AppDrawer = DrawerNavigator({
  Home: {
    screen: AppMainStack,
  },
  RegisterRequest: { 
    screen: RegisterRequestScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register Request',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-calculator" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register Request',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   RegisterApprovalList: { 
    screen: RegisterApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   RegisterHistoryList: { 
    screen: RegisterHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Register History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Register History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
  FormPush: { 
    screen: formPushScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushApprovalList: { 
    screen: PushApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushHistoryList: { 
    screen: PushHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAcceptableList: { 
    screen: PushAcceptableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Acceptable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Acceptable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushManifestingList: { 
    screen: PushManifestingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Manifesting List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Manifesting List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushPackingList: { 
    screen: PushPackingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packing List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packing List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushPrePackingGetQR: { 
    screen: PushPrePackingGetQRScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Pre Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Pre Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushTryPacking: { 
    screen: PushTryPackingScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Try Packing',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Try Packing',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
  //  PushPacking: { 
  //   screen: PushPackingScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },  
   PushPackedList: { 
    screen: PushPackedListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Packed List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Packed List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
  //  PushExecList: { 
  //   screen: PushExecListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Exec List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Exec List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
   PushStoreList: { 
    screen: PushStoreListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Store List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Store List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushGetPIN: { 
    screen: PushGetPINScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Get PIN',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Get PIN',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },   
   PushCancelList: { 
    screen: PushCancelListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Cancel List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Cancel List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAbortList: { 
    screen: PushAbortListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Abort List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Abort List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },   
   PushAddDocument: { 
    screen: PushDocumentAddScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Add Document',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Add Document',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormPull: { 
    screen: formPullScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormDispose: { 
    screen: DisposeScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Dispose',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-trash" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Dispose',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   FormCheckIn: { 
    screen: ChekInScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Check In',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Check In',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
  },
    FormCheckOut: { 
      screen: CheckOutScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Check Out',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-log-out" size={23} color={tintColor} />
        ),
        headerStyle: {
          backgroundColor: colors.BLUE_100,
        },
        headerTitle: 'Check Out',
        headerTitleStyle: {
          color: colors.WHITE,
        },
        headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
      }),
   },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
		}),
  },
}, {
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
		/>),
  contentOptions: {
    activeBackgroundColor: colors.BLUE_100,
    activeTintColor: colors.WHITE,
		inactiveTintColor: colors.BLUE_200,
  },
});

const Navigator = TabNavigator({
  Login: { screen: LoginScreen },
  Welcome: { screen: WelcomeScreen },
  Main: { screen: AppDrawer },
  Logout: { screen: LogoutScreen }
}, {
  navigationOptions: {
    tabBarVisible: false,
  },
  swipeEnabled: false,
});

export default Navigator;
