import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    Dimensions,
    AsyncStorage,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');

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
export default class Login extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            selectedTab:0,
            price:false,
            extra:false,
            important:false,
            mobile:'',
            password:'',

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

    renderTabBar(props) {

        return (<TabBar
                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'white', borderBottomWidth: 2.5, height:50}}
                labelStyle={{color: 'grey', fontSize: 10, fontFamily: GLOBAL.roman}}

                {...props}
                indicatorStyle={{backgroundColor: Colors.blue, height: 2.5}}
            />
        );
    }

    handleClick = () =>{
      if (this.state.mobile == ''){
            alert('Please enter Mobile.')
        } else if (this.state.password == ''){
            alert('Please enter Password')
        }else{
            const url = 'http://139.59.76.223/cab/webservices/signin'

            fetch(url, {
                method: 'POST',
                headers: {
                    'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    mobile: this.state.mobile,
                    device_id:'',
                    device_token:'',
                    device_type:'iOS',
                    password:this.state.password


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                   //  alert(JSON.stringify(responseJson))

                    if (responseJson.status == true){

                        AsyncStorage.setItem('userID', responseJson.user_id.toString());
                       GLOBAL.user_id = responseJson.user_id
                        this.props.navigation.navigate('PaymentMode')
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }


    }

    render() {

        return (
            <View style={{backgroundColor:'#FBD303',height:window.height}}  >

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

                    <Text style={{ color: 'black', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 32,marginTop:30,marginLeft:20,width:200 }}>Verify phone Number </Text>
                    <Text style={{ color: '#333a4d', fontFamily:GLOBAL.roman, fontSize: 14,marginLeft:20,width:200,marginTop:20 }}>We'll send a code to verify your phone</Text>


                    <View style={{marginTop:40}}>





                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({mobile:text})}
                                placeholder="Mobile"
                                value = {this.state.mobile}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.heavy, color: 'black',fontSize:23 }}

                            />



                        </View>




                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({password:text})}
                                placeholder="Password "
                                secureTextEntry={true}
                                value = {this.state.password}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.heavy, color: 'black',fontSize:23 }}

                            />



                        </View>



                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('Forgot')}>

                        <Text style={{ alignSelf:'flex-end',color: '#09304B', fontFamily:GLOBAL.medium,fontSize: 12,marginTop:4,marginRight:20 }}>Forgot Password</Text>

                        </TouchableOpacity>

                        <Button buttonStyle={{backgroundColor:'#09304B',width:width-40,borderRadius:10,alignSelf:'center',marginTop:40,marginLeft:20}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                title="Next"
                                onPress={this.handleClick}
                        />


                        <Text style={{ alignSelf:'center',color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:30 }}>Didn't have an account</Text>


                        <Text style={{ alignSelf:'center',color: '#09304B', fontFamily:GLOBAL.medium,fontSize: 12,marginTop:4 }}>Register</Text>

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
    }
});
