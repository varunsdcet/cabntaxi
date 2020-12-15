import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    Dimensions,
    ImageBackground,
    StatusBar,
    Platform,
    SafeAreaView,
    FlatList, AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
import OTPInputView from '@twotalltotems/react-native-otp-input'

const { width, height } = Dimensions.get('window');
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Airport from "./Airport";
import Splash from "./Splash";
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');
import MapView  from 'react-native-maps';
import MaterialTabs from 'react-native-material-tabs';

var _mapView: MapView;
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {Button} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
type Props = {};
export default class Otp extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            code:'',
            selectedTab:0,
            price:false,
            extra:false,
            important:false,

        }



    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    _renderScene = ({ route }) => {

        switch (route.key) {

            case 'first':
                return <Airport/>
            case 'second':
                return <View/>
            case 'third':
                return <View/>
            default:
                return null;
        }
    };

    getlog =  (position) =>{
        var s  = position.coords.latitude
        var e  = position.coords.longitude

        GLOBAL.lat = s.toString()
        GLOBAL.long = e.toString()

        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "latitude": GLOBAL.lat,
                "longitude":GLOBAL.long,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {

               //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({location:responseJson.address})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);

            });

    }

    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.searchLocation})

    }

    renderRowItem2 = (itemData) => {
        return (
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <Text style={{ marginLeft:12,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:4 }}>Fare Beyond 26 KM</Text>

                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:4 }}>As Applicable</Text>

            </View>
        )
    }

    renderRowItem3 = (itemData) => {
        return (
            <View >


                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.medium,fontSize: 14,marginTop:4,marginLeft:14 }}>. As Applicable ajchhav i aicj aij  nnknvn </Text>

            </View>
        )
    }

    renderRowItem1 = (itemData) => {
        return (
            <View style={{marginLeft:16,marginTop:6}}>
                <Text style={{ color: 'black', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:3 }}>26 Km</Text>

            </View>
        )
    }
    componentDidMount(){
        this.setState({lat:GLOBAL.lat})
        this.setState({long:GLOBAL.long})

        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    setSelectedTab = (index) =>{
        this.setState({selectedTab:index})

    }

    handleClick = () => {



        if (this.state.code != GLOBAL.otps){
            alert('Please enter Valid Code')
        }else{

            if(GLOBAL.mytype == "1"){
                this.props.navigation.navigate('Password')
            }else {


                const url = 'http://139.59.76.223/cab/webservices/signup'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        name: GLOBAL.name,
                        email: GLOBAL.email,
                        mobile: GLOBAL.mobile,
                        address: GLOBAL.address,
                        city: GLOBAL.city,
                        state: GLOBAL.state,
                        password: GLOBAL.password,
                        device_id: '',
                        device_type: 'iOS',
                        device_token: '',
                        referral_user_id: GLOBAL.referal_user_id


                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        

                        if (responseJson.status == true) {
                            AsyncStorage.setItem('userID', responseJson.user_id.toString());
                            GLOBAL.user_id = responseJson.user_id
                            this.props.navigation.navigate('PaymentMode')


                            //  this.props.navigation.navigate('Payment')
                        }else{
                            alert('Unable to process your request.')
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }

    }

    valida = ()=> {
        alert('hi')
        const url = 'http://139.59.76.223/cab/webservices/otp'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
        mobile: GLOBAL.mobile,


    }),
}).then((response) => response.json())
    .then((responseJson) => {
       //  alert(JSON.stringify(responseJson))

        if (responseJson.status == true){
            GLOBAL.otps = responseJson.otp

            alert('Your One time Password send your register Mobile Number')

        }

    })
    .catch((error) => {
        console.error(error);
    });

}

    renderTabBar(props) {

        return (<TabBar
                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'white', borderBottomWidth: 2.5, height:50}}
                labelStyle={{color: 'grey', fontSize: 10, fontFamily: GLOBAL.roman}}

                {...props}
                indicatorStyle={{backgroundColor: Colors.blue, height: 2.5}}
            />
        );
    }

    render() {

        return (
            <View style={{backgroundColor:'#f8f8f8'}}  >

                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'white' }} />
                <KeyboardAwareScrollView>


                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./backicon.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                    </View>

                    <Text style={{ color: 'black', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 28,marginTop:30,marginLeft:20,width:width }}>Phone Verifications </Text>
                    <Text style={{ color: '#333a4d', fontFamily:GLOBAL.roman, fontSize: 14,marginLeft:20,width:200,marginTop:10 }}>Enter your OTP code here </Text>


                    <View style={{marginTop:0}}>

                        <OTPInputView
                            style={{width: '80%', height: 200,alignSelf:'center'}}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {(code => {
                                this.setState({code:code})
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                        />



                        <Button buttonStyle={{backgroundColor:Colors.blue,width:width-40,borderRadius:10,alignSelf:'center',marginTop:40,marginLeft:20}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                title="Verify Now"
                                onPress={this.handleClick}
                        />


                        <Text style={{ alignSelf:'center',color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:30 }}>Didn't you received any code ?</Text>

                        <TouchableOpacity onPress={() =>this.valida()}>
                        <Text style={{ alignSelf:'center',color: Colors.blue, fontFamily:GLOBAL.medium,fontSize: 12,marginTop:4 }}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{height:100}}>

                    </View>


                </KeyboardAwareScrollView>



            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },
    scene: {
        flex: 1,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 50,
        height: 45,
        borderWidth: 1,
        backgroundColor:'#f1f2f6',
        fontWeight: 'bold',
        fontSize:22,
    },

    underlineStyleHighLighted: {
        borderColor: "#eaecef",
    },
});
