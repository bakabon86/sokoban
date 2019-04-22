import React from 'react';
import { Platform } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/Login';
//Register
import RegisterRequestScreen from './screens/Register/RegisterRequest';
import RegisterApprovalListScreen from './screens//Register/RegisterApprovalList';
import RegisterApprovalScreen from './screens/Register/RegisterApproval';
import RegisterHistoryListScreen from './screens/Register/RegisterHistoryList';

//Push
import formPushScreen from './screens/Push/formPush';
import PushUnRequestListScreen from './screens/Push/PushUnRequestList';
import PushUnRequestScreen from './screens/Push/PushUnRequest';
import PushApprovalListScreen from './screens/Push/PushApprovalList';
import PushApprovalScreen from './screens/Push/PushApproval';
import PushHistoryListScreen from './screens/Push/PushHistoryList';
import PushHistoryScreen from './screens/Push/PushHistory'; 
import PushAcceptableListScreen from './screens/Push/PushAcceptableList';
import PushAcceptableScreen from './screens/Push/PushAcceptable';

import PushManifestingListScreen from './screens/Push/PushManifestingList';
import PushManifestedScreen from './screens/Push/PushManifested';
import PushManifestScreen from './screens/Push/PushManifest';

import PushSealedVerifyScreen from './screens/Push/PushSealedVerify';

import PushPackingListScreen from './screens/Push/PushPackingList';
import PushCreatePINScreen from './screens/Push/PushCreatePIN';
import PushTryPackingScreen from './screens/Push/PushTryPacking';
import PushPackingScreen from './screens/Push/PushPacking';
import PushPrePackingScreen from './screens/Push/PushPrePacking';
import PushPrePackingGetQRScreen from './screens/Push/PushPrePackingGetQR';

import PushSealableListScreen from './screens/Push/PushSealableList';
import PushSealScreen from './screens/Push/PushSeal';

import PushVerifiedListScreen from './screens/Push/PushVerifiedList';

import PushPackedListScreen from './screens/Push/PushPackedList';
import PushPackedScreen from './screens/Push/PushPacked';


import PushStoreListScreen from './screens/Push/PushStoreList';
import PushStoreScreen from './screens/Push/PushStore';
import PushGetPINScreen from './screens/Push/PushGetPIN';
import PushAbortListScreen from './screens/Push/PushAbortList';
import PushAbortScreen from './screens/Push/PushAbort';

import PushCancelListScreen from './screens/Push/PushCancelList';
import PushCancelScreen from './screens/Push/PushCancel';
import PushDisposableListScreen from './screens/Push/PushDisposableList';
import PushDisposeScreen from './screens/Push/PushDispose';
import ScanQRScreen from './screens/Push/ScanQR';

//import PushDocumentAddScreen from './screens/Push/DocumentAdd';

//Pull
import formPullScreen from './screens/Pull/formPull';
import PullUnSealableListScreen from './screens/Pull/PullUnSealableList';
import PullUnSealScreen from './screens/Pull/PullUnSeal';
import PullDropableListScreen from './screens/Pull/PullDropableList';
import PullDropableScreen from './screens/Pull/PullDropable';
import PullManifestingListScreen from './screens/Pull/PullManifestingList';
import PullManifestedScreen from './screens/Pull/PullManifested';
import PullManifestScreen from './screens/Pull/PullManifest';

import DisposeScreen from './screens/formDispose';
import ChekInScreen from './screens/formCheckIn';
import CheckOutScreen from './screens/formCheckOut';

//Verification
import TwoWayVerificationInitiatorScreen from './screens/TwoWayVerificationInitiator';
import VerificationInitiatorScreen from './screens/VerificationInitiator';

import UnverifiedRepoListScreen from './screens/UnverifiedRepoList';

import VerificationCounterpartScreen from './screens/VerificationCounterpart';

import TransactionViewerScreen from './screens/TransactionViewer';
import RepoReaderScreen from './screens/RepoReader';
import TransactionReaderScreen from './screens/TransactionReader';

//CheckIn
import formCheckInScreen from './screens/CheckIn/formCheckIn';
import CheckInPickingListScreen from './screens/CheckIn/CheckInPickingList';
import CheckInPickingScreen from './screens/CheckIn/CheckInPicking';
import CheckInRestoringListScreen from './screens/CheckIn/CheckInRestoringList';
import CheckInRestoringScreen from './screens/CheckIn/CheckInRestoring';

//Dispose
import formDisposeScreen from './screens/Dispose/formDispose';
import DisposeBurnableListScreen from './screens/Dispose/DisposeBurnableList';
import DisposeBurn from './screens/Dispose/DisposeBurnable';

import WelcomeScreen from './screens/Welcome';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import FavoritesScreen from './screens/Favorites';
import SettingsScreen from './screens/Settings';
import LogoutScreen from './screens/Logout';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import Back from './components/icons/Back';
import DrawerMenu from './components/DrawerItemComponents';
import AppCamera from './screens/Camera';
import CameraPage from './screens/CameraPage';

import MainDrawer from './drawers/MainDrawer';
import screenMapping from './screenMapping';
import { evaluateChildDrawerTitle, singleDrawerTitle } from './utils';
import * as Register from './screens/Register';

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
      drawerLabel: 'Penyimpanan',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Penyimpanan',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushUnRequestList: { 
    screen: PushUnRequestListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'UnRequest List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'UnRequest List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushUnRequest: { 
    screen: PushUnRequestScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'UnRequest',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'UnRequest',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushApprovalList: { 
    screen: PushApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushApproval: { 
    screen: PushApprovalScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Approval',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Approval',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushHistoryList: { 
    screen: PushHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Transaction List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Transaction List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushHistory: { 
    screen: PushHistoryScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'History List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'History List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushAcceptableList: { 
    screen: PushAcceptableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Acceptable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Acceptable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAcceptable: { 
    screen: PushAcceptableScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Acceptance',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Acceptance',
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
      headerLeft: <BackIcon onPress={() => navigation.navigate('PushManifestingList') } />,
    }),
   },
   PushManifest: { 
    screen: PushManifestScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Manifest',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Manifest',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.navigate('PushManifested') } />,
    }),
   },
   PushSealableList:{    
    screen: PushSealableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Sealable List' ,
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Sealable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop()} />,
    }),
   },
   PushSeal:{    
    screen: PushSealScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Seal' ,
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Seal',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    }),
   },
   PushSealedVerify: {
     screen: PushSealedVerifyScreen,
     navigationOptions: ({ navigation }) => ({
       drawerLabel: 'Push Sealed Verify' ,
       drawerIcon: ({ tintColor }) => (
         <Ionicons name="md-cloud-download" size={23} color={tintColor} />
       ),
       headerStyle: {
         backgroundColor: colors.BLUE_100,
       },
       headerTitle: 'Push Sealed Verify',
       headerTitleStyle: {
         color: colors.WHITE,
       },
       headerLeft: <BackIcon onPress={() => navigation.popToTop()} />,
     }),
   },
  //  PushPackingList: { 
  //   screen: PushPackingListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Packing List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Packing List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushPrePacking: { 
  //   screen: PushPrePackingScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Pre Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Pre Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
  //   }),
  //  },
  //  PushPrePackingGetQR: { 
  //   screen: PushPrePackingGetQRScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Pre Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Pre Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushCreatePIN: { 
  //   screen: PushCreatePINScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Create PIN',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Create PIN',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushTryPacking: { 
  //   screen: PushTryPackingScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Try Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Try Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
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
  //  PushPackedList: { 
  //   screen: PushPackedListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Packed List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Packed List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
   TwoWayVerificationInitiator: {
     screen: TwoWayVerificationInitiatorScreen,
     navigationOptions: ({navigation}) => ({
       drawerLabel: '2 Way Verification Initiator',
       drawerIcon: ({ tintColor }) => (
         <Ionicons name="md-checkbox" size={23} color={tintColor} />
       ),
       headerStyle: {
         backgroundColor: colors.BLUE_100,
       },
       headerTitle: '2 Way Verification Initiator',
       headerTitleStyle: {
         color: colors.WHITE,
       },
       headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
     }),
   },
   VerificationInitiator: {
    screen: VerificationInitiatorScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Verification Initiator',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Verification Initiator',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
 TransactionViewer: {
    screen: TransactionViewerScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Transaction Viewer',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-pricetags" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Transaction Viewer',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  VerificationCounterpart: {
    screen: VerificationCounterpartScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Verification Counterpart',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Verification Counterpart',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  CameraPage: {
    screen: CameraPage,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Camera Page',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Camera Page',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  BeginVerification: {
    screen: RepoReaderScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Begin Verification',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Begin Verification',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  TransactionReader: {
    screen: TransactionReaderScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Begin Verification',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Begin Verification',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  UnverifiedRepoList: {
    screen: UnverifiedRepoListScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Unverified Repo List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Unverified Repo List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.goBack()} />,
    }),
  },
  //  PushVerifiedList: { 
  //   screen: PushVerifiedListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Verified List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Verified List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
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
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
 
   
   PushCancelList: { 
    screen: PushCancelListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Cancellable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Cancellable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushCancel: { 
    screen: PushCancelScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Cancel',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Cancel',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushAbortList: { 
    screen: PushAbortListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Abortable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Abortable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAbort: { 
    screen: PushAbortScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Abort',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Abort',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PushDisposableList: { 
    screen: PushDisposableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Disposable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Disposable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushDispose: { 
    screen: PushDisposeScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Dispose',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Dispose',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
  
   // =========> Pull
   FormPull:{
     screen: formPullScreen,
     navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Penarikan',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Penarikan',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PullUnsealList:{
    screen: PullUnSealableListScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull UnSeal List',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull UnSeal List',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
   }),
  },
  PullUnseal:{
    screen: PullUnSealScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull UnSeal',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull UnSeal',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
   }),
  },
  PullDropableList:{
    screen: PullDropableListScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull Dropable List',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull Dropable List',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
   }),
  },
  PullDropable:{
    screen: PullDropableScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull Dropable',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull Dropable',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
   }),
  },

  PullManifestingList: { 
    screen: PullManifestingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull Manifesting List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull Manifesting List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PullManifested: { 
    screen: PullManifestedScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull Manifested',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull Manifested',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },
   PullManifest: { 
    screen: PullManifestScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull Manifest',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull Manifest',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
   },

   //CheckIn
   FormCheckIn: { 
    screen: formCheckInScreen,
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
  CheckInPickingList: { 
    screen: CheckInPickingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Picking List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Picking List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
  },
  CheckInPicking: { 
    screen: CheckInPickingScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Picking',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Picking',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
    }),
  },
  CheckInRestoringList: { 
    screen: CheckInRestoringListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Restoring List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Restoring List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
  },
  CheckInRestoring: { 
    screen: CheckInRestoringScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Restoring',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-log-in" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Restoring',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
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

   //Dispose
   FormDispose: { 
    screen: formDisposeScreen,
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
   DisposeBurnableList: { 
    screen: DisposeBurnableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Burnable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-trash" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Burnable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   DisposeBurn: { 
    screen: DisposeBurn,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Burn',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-trash" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Burn',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
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
//    FormCamera: { 
//     screen: CameraPage,
//     navigationOptions: ({ navigation }) => ({
//       drawerLabel: 'Camera',
//       drawerIcon: ({ tintColor }) => (
//         <Ionicons name="md-camera" size={23} color={tintColor} />
//       ),
//       headerStyle: {
//         backgroundColor: colors.BLUE_100,
//       },
//       headerTitle: 'Camera',
//       headerTitleStyle: {
//         color: colors.WHITE,
//       },
//       headerLeft: <BackIcon onPress={() => navigation.goBack() } />,
//     }),
//  }, 
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
      drawerLabel: 'Penyimpanan',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Penyimpanan',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushUnRequestList: { 
    screen: PushUnRequestListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'UnRequest List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'UnRequest List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushHistoryList: { 
    screen: PushHistoryListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Transaction List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Transaction List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },

   PushApprovalList: { 
    screen: PushApprovalListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Approval List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Approval List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   
   PushAcceptableList: { 
    screen: PushAcceptableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Acceptable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Acceptable List',
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
   PushSealableList:{    
    screen: PushSealableListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Push Sealable List' ,
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Push Sealable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop()} />,
    }),
   },
  //  PushSealedVerify: {
  //   screen: PushSealedVerifyScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Sealed Verify' ,
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Sealed Verify',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop()} />,
  //   }),
  // },
  
  //  PushPackingList: { 
  //   screen: PushPackingListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Packing List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Packing List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushPrePackingGetQR: { 
  //   screen: PushPrePackingGetQRScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Pre Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Pre Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushCreatePIN: { 
  //   screen: PushCreatePINScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Create PIN',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Create PIN',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushTryPacking: { 
  //   screen: PushTryPackingScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Try Packing',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Try Packing',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  
  //  PushPackedList: { 
  //   screen: PushPackedListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Packed List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Packed List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  //  PushManifested: { 
  //   screen: PushManifestedScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Manifested',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Manifested',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
   TwoWayVerificationInitiator: {
    screen: TwoWayVerificationInitiatorScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: '2 Way Verification Initiator',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: '2 Way Verification Initiator',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  VerificationInitiator: {
    screen: VerificationInitiatorScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Verification Initiator',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Verification Initiator',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  TransactionViewer: {
    screen: TransactionViewerScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Transaction Viewer',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-pricetags" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Transaction Viewer',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  BeginVerification: {
    screen: RepoReaderScreen,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Begin Verification',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-checkbox" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Begin Verification',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={()=> navigation.popToTop()} />,
    }),
  },
  //  PushVerifiedList: { 
  //   screen: PushVerifiedListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Verified List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Verified List',
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
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
 
   PushCancelList: { 
    screen: PushCancelListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Cancellable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Cancellable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PushAbortList: { 
    screen: PushAbortListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Abortable List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-download" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Abortable List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },   
  //  PushDisposableList: { 
  //   screen: PushDisposableListScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     drawerLabel: 'Push Disposable List',
  //     drawerIcon: ({ tintColor }) => (
  //       <Ionicons name="md-cloud-download" size={23} color={tintColor} />
  //     ),
  //     headerStyle: {
  //       backgroundColor: colors.BLUE_100,
  //     },
  //     headerTitle: 'Push Disposable List',
  //     headerTitleStyle: {
  //       color: colors.WHITE,
  //     },
  //     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
  //   }),
  //  },
  
   //==========> Pull
   FormPull: { 
    screen: formPullScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pengambilan',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pengambilan',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },
   PullDropableList:{
    screen: PullDropableListScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull Dropable List',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull Dropable List',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
   }),
  },
   PullUnsealList:{
    screen: PullUnSealableListScreen,
    navigationOptions: ({ navigation }) => ({
     drawerLabel: 'Pull UnSeal List',
     drawerIcon: ({ tintColor }) => (
       <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
     ),
     headerStyle: {
       backgroundColor: colors.BLUE_100,
     },
     headerTitle: 'Pull UnSeal List',
     headerTitleStyle: {
       color: colors.WHITE,
     },
     headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
   }),
  },
 
  PullManifestingList: { 
    screen: PullManifestingListScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Pull Manifesting List',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-cloud-upload" size={23} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: colors.BLUE_100,
      },
      headerTitle: 'Pull Manifesting List',
      headerTitleStyle: {
        color: colors.WHITE,
      },
      headerLeft: <BackIcon onPress={() => navigation.popToTop() } />,
    }),
   },   
   
   //CheckIn
   FormCheckIn: { 
    screen: formCheckInScreen,
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

   //Dispose
   FormDispose: { 
    screen: formDisposeScreen,
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
    evaluateChildDrawerTitle,
  },
  //Register
  Register_Request:{
    screen: RegisterRequestScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  // 'Register_Approval List':{
  //   screen: RegisterApprovalListScreen,
  //   navigationOptions: evaluateChildDrawerTitle,
  // },
  'Register_History List':{
    screen: RegisterHistoryListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //Push
  'Penyimpanan_Request':{
    screen: formPushScreen,
    navigationOptions: evaluateChildDrawerTitle,
  }, 
  'Penyimpanan_Manifesting List':{
    screen: PushManifestingListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Penyimpanan_Sealable List':{
    screen: PushSealableListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Penyimpanan_Storable List':{
    screen: PushStoreListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Penyimpanan_Store Finalize':{
    screen: PushStoreScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //Pull
  'Penarikan_Request':{
    screen: formPullScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Penarikan_Dropable List':{
    screen: PullDropableListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Penarikan_UnSealable List':{
    screen: PullUnSealableListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //CheckIn
  'Peminjaman_Request':{
    screen: formCheckInScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Peminjaman_Picking':{
    screen: CheckInPickingListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Peminjaman_Restoring':{
    screen: CheckInRestoringListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //Dispose
  'Pemusnahan_Request':{
    screen: formDisposeScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  // 'Pemusnahan_Dropable List':{
  //   screen: PullDropableListScreen,
  //   navigationOptions: evaluateChildDrawerTitle,
  // },
  // 'Pemusnahan_UnSealable List':{
  //   screen: PullUnSealableListScreen,
  //   navigationOptions: evaluateChildDrawerTitle,
  // },
  'Pemusnahan_Burnable List':{
    screen: DisposeBurnableListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //Verification
  'Mutual Verification_Initiator':{
    screen: TwoWayVerificationInitiatorScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Mutual Verification_Partner':{
    screen: VerificationInitiatorScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },  
  'Manifest Verification_Transactions Viewer':{
    screen: TransactionViewerScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Manifest Verification_Begin Verification':{
    screen: TransactionReaderScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  //Approval  
  'Approval/Acceptance_Approval List':{
    screen: PushApprovalListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Approval/Acceptance_Register Approval List':{
    screen: RegisterApprovalListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Approval/Acceptance_Acceptable List':{
    screen: PushAcceptableListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  // 'Approval/Acceptance_Acceptable':{
  //   screen: PushAcceptableScreen,
  //   navigationOptions: evaluateChildDrawerTitle,
  // },
  //Transaction
  'Transaction_History List':{
    screen: PushHistoryListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  }, 
  'Transaction_UnRequest':{
    screen: PushUnRequestListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Transaction_Cancelable List':{
    screen: PushCancelListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
  'Transaction_Abortable List':{
    screen: PushAbortListScreen,
    navigationOptions: evaluateChildDrawerTitle,
  },
}, 
  
{
    //  contentComponent: props =>
    //    (<CustomDrawerContent
    //      {...props}
    //    />),
    contentComponent: MainDrawer,
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
