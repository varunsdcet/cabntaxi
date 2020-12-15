
import { createAppContainer ,createBottomTabNavigator} from 'react-navigation';
import Splash from './Splash.js';
import Home from './Home.js';
import Drawer from './Drawer.js';
import AddTravel from './AddTravel.js';
import Airport from './Airport.js';
import MapViewController from './MapViewController.js';
import Location from './Location.js';
import FlightBooking from './FlightBooking.js';
import FlightDetail from './FlightDetail.js';
import FromAirport  from './FromAirport.js';
import Flight from './Flight.js';
import CarRental from './CarRental.js';
import Package from './Package.js';
import Outstation from './Outstation.js';
import SearchCab from './SearchCab.js';
import PackageDetail from './PackageDetail.js';
import PaymentMode from './PaymentMode.js';
import CabDetail from './CabDetail.js';
import Register from './Register.js';
import Otp from './Otp.js';
import Login from './Login.js';
import Password from './Password.js';
import Forgot from './Forgot.js';
import Invite from './Invite.js';
import History from './History.js';
import AirportMap from './AirportMap.js';
import BlogDescription from './BlogDescription.js';
import BookingOption from './BookingOption.js';
import HistoryDetail from './HistoryDetail.js';
import MyMap from './MyMap.js';
import Issue from './Issue.js';
import MyPackage from './MyPackage.js';
import Offer from './Offer.js';
import EditProfile from './EditProfile.js';
import Wallet from './Wallet.js';
import Rating from './Rating.js';
import Report from './Report.js';
import Setting from './Setting.js';
import About from './About.js';
import City from './City.js';
import Notification from './Notification.js';
import CompletedRide from './CompletedRide.js';
import { createDrawerNavigator } from 'react-navigation-drawer';



import { createStackNavigator } from 'react-navigation-stack';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'black',
                headerTintColor: '#ffffff',
                tintColor: {
                    color: '#ffffff'
                },
                headerTitleStyle: { color: 'black' }
            },

        }),
    }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 270
});

const StackNavigator = createStackNavigator({


    Splash: {screen: Splash},
    Register:{screen:Register},
    EditProfile:{screen:EditProfile},
    Location:{screen:Location},
    History:{screen:History},
    MapViewController:{screen:MapViewController},
    Package:{screen:Package},
    BookingOption:{screen:BookingOption},
    CarRental:{screen:CarRental},
    PaymentMode:{screen:PaymentMode},
    Outstation:{screen:Outstation},
    SearchCab:{screen:SearchCab},
    BlogDescription:{screen:BlogDescription},
    PackageDetail:{screen:PackageDetail},
    HistoryDetail: {screen: HistoryDetail},
    MyMap:{screen:MyMap},
    CabDetail:{screen:CabDetail},
    Invite:{screen:Invite},
    Forgot:{screen:Forgot},
    Password:{screen:Password},
    Login:{screen:Login},
    MyPackage:{screen:MyPackage},
    AirportMap:{screen:AirportMap},
    Otp:{screen:Otp},
    Flight:{screen:Flight},
    FromAirport:{screen:FromAirport},
    FlightDetail:{screen:FlightDetail},
    Issue:{screen:Issue},
    Setting:{screen:Setting},
    Offer:{screen:Offer},
    Wallet:{screen:Wallet},
    FlightBooking:{screen:FlightBooking},
    Rating:{screen:Rating},
    Report:{screen:Report},
    City:{screen:City},
    AddTravel:{screen:AddTravel},
    About:{screen:About},
    CompletedRide:{screen:CompletedRide},
    Notification:{screen:Notification},
    DrawerNavigator: {screen: DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
            header:null,
        }),},

    Airport: {screen: Airport,
        navigationOptions: ({ navigation }) => ({
            header:null,
        }),},

},{

    mode: 'card',
    navigationOptions: params => ({
        gesturesEnabled: false,


        gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return {opacity, transform: [{translateX: translateX}]};
        },
        headerTitleInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            return {
                opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [ 0, 1, 0],
                }),
                transform: [{
                    translateX: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [-50, 0, 50],
                    }),
                }]
            };
        },
    }),


});

export default createAppContainer(StackNavigator);
