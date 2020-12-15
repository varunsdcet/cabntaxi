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
    SafeAreaView,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');
var validator = require("email-validator");
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
export default class Register extends Component {
    constructor(props) {

        super(props)
        this.state = {
          name :'',
            email:'',
            mobile:'',
            address:'',
            city:'',
            states:'',
            password:'',
            confirmPassword:'',
            referal:'',
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


    handleClicks = () =>{
        if (this.state.referal == ''){
            alert('Please enter Referaal Code.')
        }  else{
            const url = 'http://139.59.76.223/cab/webservices/checkReferral'

            fetch(url, {
                method: 'POST',
                headers: {
                    'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    referral_code: this.state.referal,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == true){
                        GLOBAL.referal_user_id = responseJson.referral_user_id

                        alert('Successfully Applied')

                    }else{
                        alert('Invalid Referal Code')
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }


    }

    handleClick = () =>{
        if (this.state.name == ''){
            alert('Please enter Name.')
        }  else if (this.state.email == ''){
            alert('Please enter Email.')
        }
        else if (validator.validate(this.state.email) == false){
            alert('Please enter valid Email.')
        } else if (this.state.mobile == ''){
            alert('Please enter Mobile.')
        } else if (this.state.city == ''){
            alert('Please enter City.')
        }else if (this.state.state == ''){
            alert('Please enter State.')
        }else if (this.state.password == ''){
            alert('Please enter Password.')
        }else if (this.state.confirmPassword == ''){
            alert('Please enter Confirm Password.')
        }else if (this.state.confirmPassword != this.state.password){
            alert('Password not match')
        }else{
            const url = 'http://139.59.76.223/cab/webservices/otp'

            fetch(url, {
                method: 'POST',
                headers: {
                    'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    mobile: this.state.mobile,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                   //  alert(JSON.stringify(responseJson))

                    if (responseJson.status == true){
                        GLOBAL.mytype = "2"
                        GLOBAL.otps = responseJson.otp
                        GLOBAL.name = this.state.name
                        GLOBAL.email = this.state.email
                        GLOBAL.mobile = this.state.mobile
                        GLOBAL.address = this.state.address
                        GLOBAL.city = this.state.city
                        GLOBAL.state = this.state.states
                        GLOBAL.password = this.state.password


                       alert('Your One time Password send your register Mobile Number')
                        this.props.navigation.navigate('Otp')
                    }else{
                        alert('User already Registerd')
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }


    }

    render() {

        return (
            <View style={{backgroundColor:'#FBD303'}}  >

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

                    <Text style={{ color: 'black', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 32,marginTop:30,marginLeft:20,width:200 }}>Create your account</Text>
                    <Text style={{ color: '#333a4d', fontFamily:GLOBAL.roman, fontSize: 14,marginLeft:20,width:200,marginTop:10 }}>Enter your details</Text>


                    <View style={{marginTop:40}}>

                        <View style={{margin:20,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({name:text})}
                                placeholder="Name"
                                value = {this.state.name}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>

                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({email:text})}
                                placeholder="Email"
                                value = {this.state.email}

                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>

                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({mobile:text})}
                                placeholder="Mobile"
                                value = {this.state.mobile}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>

                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({address:text})}
                                placeholder="Address (Optional) "
                                value = {this.state.address}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{margin:20,marginTop:5,width:width/2 - 50,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                                <TextInput
                                    style={{ marginLeft:20,height: 40, width:width-30,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                    onChangeText={text => this.setState({city:text})}
                                    placeholder="City"
                                    value = {this.state.city}
                                    placeholderTextColor={'black'}
                                    placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                                />



                            </View>


                            <View style={{margin:20,marginTop:5,width:width/2 - 30,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                                <TextInput
                                    style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                    onChangeText={text => this.setState({states:text})}
                                    placeholder="State"
                                    value = {this.state.states}
                                    placeholderTextColor={'black'}
                                    placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                                />



                            </View>

                        </View>



                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({password:text})}
                                placeholder="Password "
                                 secureTextEntry={true}
                                value = {this.state.password}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>


                        <View style={{margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-70,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({confirmPassword:text})}
                                placeholder="Confirm Password "
                                secureTextEntry={true}
                                value = {this.state.confirmPassword}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />



                        </View>


                        <View style={{flexDirection:'row',margin:20,marginTop:5,width:width-40,height:40,backgroundColor:'#f1f2f6',borderWidth:1,borderColor:'#eaecef'}}>

                            <TextInput
                                style={{ marginLeft:20,height: 40, width:width-130,fontFamily: GLOBAL.heavy ,color:'black',fontSize:20}}
                                onChangeText={text => this.setState({referal:text})}
                                placeholder="Referral Code"
                                value = {this.state.referal}
                                placeholderTextColor={'black'}
                                placeholderStyle={{ fontFamily:  GLOBAL.roman, color: 'black',fontSize:20 }}

                            />




                            <Button buttonStyle={{marginRight:100,borderColor:'#09304B',borderWidth:1,width:70,marginTop:4,backgroundColor:'white',height:30}}
                                    titleStyle={{fontFamily:GLOBAL.roman,fontSize:12,color:'#09304B'}}
                                    onPress={this.handleClicks}
                                    title="Validate"
                            />


                        </View>


                        <Button buttonStyle={{backgroundColor:'#09304B',width:width-40,borderRadius:10,alignSelf:'center',marginTop:40,marginLeft:20}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                onPress={this.handleClick}
                                title="Submit"
                        />


                        <Text style={{ alignSelf:'center',color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:30 }}>Already have an account</Text>

                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('Login')}>
                        <Text style={{ alignSelf:'center',color: Colors.blue, fontFamily:GLOBAL.medium,fontSize: 12,marginTop:4 }}>Login</Text>
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
    }
});
