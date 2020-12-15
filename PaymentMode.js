import React, {Component} from 'react';
import {StyleSheet, View,TouchableOpacity, Image, Text,Dimensions, ImageBackground, StatusBar,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Airport from "./Airport";
import {NavigationActions,StackActions, } from 'react-navigation';
import Splash from "./Splash";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');

import Dialog, {DialogContent} from "react-native-popup-dialog";

const { width, height } = Dimensions.get('window');
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {Button} from "react-native-elements";
type Props = {};
export default class PaymentMode extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            lat:'',
            long:'',
            visible:false,
            checked:false,
            partial:false,
            full:false,
            debit:false,
            credit:false,
            wallet:false,
            walletAmount:'',
            gstAmount:'',
            booking:'',


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

    handleClick =() =>{

        if (this.state.partial == false && this.state.full == false){
            alert('Please select payment option')
            return
        }

      //  this.setState({visible:true})


        var www = '1'
        if (this.state.partial == true){
            www = "2"
        }


        var s =  parseInt(GLOBAL.baseAmount) - parseInt(GLOBAL.discount) + this.state.gstAmount

        var d ;

        if (this.state.checked == true){
            d = s - parseInt(this.state.walletAmount)
        }else{
            d = s ;
        }

        var e = parseInt(d) * 15/100;



if (GLOBAL.type == "Airport"){


if( GLOBAL.myi == "0") {
    const url = 'http://139.59.76.223/cab/webservices/cab_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.type,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: '',
            child_quantity: '',
            senior_quantity: '',
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            package_id: '',
            payment_status: www,
            flight_details: '',
            picup_address: GLOBAL.airportLocation,
            picup_lat: GLOBAL.airportLatiude,
            picup_lon: GLOBAL.airportLongitude,
            drop_address: GLOBAL.toLocation,
            drop_lat: GLOBAL.searchLatiude,
            drop_lon: GLOBAL.searchLongitude,
            direction_type_id: GLOBAL.aid,
            cab_category_id: GLOBAL.cab.id,
            traveller_name: GLOBAL.travellerusername,
            traveller_email: GLOBAL.travelleremail,
            traveller_mobile: GLOBAL.travellermobile,
            traveller_gender: GLOBAL.travellergender,
            traval_date: GLOBAL.date,
            traval_time: GLOBAL.time,
            booking_for:'1',
            city_id:'',
            rental_id:''


        }),
    }).then((response) => response.json())
        .then((responseJson) => {

          //  //  alert(JSON.stringify(responseJson))


            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
}else if (GLOBAL.myi == "1"){
    const url = 'http://139.59.76.223/cab/webservices/cab_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.type,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: '',
            child_quantity: '',
            senior_quantity: '',
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            package_id: '',
            payment_status: www,
            flight_details: '',
            picup_address: GLOBAL.toLocation,
            picup_lat: GLOBAL.searchLatiude,
            picup_lon: GLOBAL.searchLongitude,
            drop_address: GLOBAL.airportLocation,
            drop_lat: GLOBAL.airportLatiude,
            drop_lon: GLOBAL.airportLongitude,
            direction_type_id: GLOBAL.aid,
            cab_category_id: GLOBAL.cab.id,
            traveller_name: GLOBAL.travellerusername,
            traveller_email: GLOBAL.travelleremail,
            traveller_mobile: GLOBAL.travellermobile,
            traveller_gender: GLOBAL.travellergender,
            traval_date: GLOBAL.date,
            traval_time: GLOBAL.time,
            booking_for:'1',
            city_id:'',
            rental_id:''


        }),
    }).then((response) => response.json())
        .then((responseJson) => {

          //  //  alert(JSON.stringify(responseJson))


            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
}else{
    const url = 'http://139.59.76.223/cab/webservices/cab_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.type,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: '',
            child_quantity: '',
            senior_quantity: '',
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            package_id: '',
            payment_status: www,
            flight_details: '',
            picup_address: GLOBAL.toLocation,
            picup_lat: GLOBAL.searchLatiude,
            picup_lon: GLOBAL.searchLongitude,
            drop_address: GLOBAL.searchLocations,
            drop_lat: GLOBAL.searchLatiudes,
            drop_lon: GLOBAL.searchLongitudes,
            direction_type_id: GLOBAL.aid,
            cab_category_id: GLOBAL.cab.id,
            traveller_name: GLOBAL.travellerusername,
            traveller_email: GLOBAL.travelleremail,
            traveller_mobile: GLOBAL.travellermobile,
            traveller_gender: GLOBAL.travellergender,
            traval_date: GLOBAL.date,
            traval_time: GLOBAL.time,
            booking_for:'1',
            city_id:'',
            rental_id:''


        }),
    }).then((response) => response.json())
        .then((responseJson) => {

          //  //  alert(JSON.stringify(responseJson))


            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
}

} else if (GLOBAL.type == "Outstation"){
    const url = 'http://139.59.76.223/cab/webservices/cab_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.round,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: '',
            child_quantity: '',
            senior_quantity: '',
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            package_id: '',
            payment_status: www,
            flight_details: '',
            picup_address: GLOBAL.toLocation,
            picup_lat: GLOBAL.mylat,
            picup_lon: GLOBAL.mylong,
            drop_address: GLOBAL.searchLocations,
            drop_lat: GLOBAL.searchLatiudes,
            drop_lon: GLOBAL.searchLongitudes,
            direction_type_id: GLOBAL.aid,
            cab_category_id: GLOBAL.cab.id,
            traveller_name: GLOBAL.travellerusername,
            traveller_email: GLOBAL.travelleremail,
            traveller_mobile: GLOBAL.travellermobile,
            traveller_gender: GLOBAL.travellergender,
            traval_date: GLOBAL.date,
            traval_time: GLOBAL.time,
            booking_for:'3',
            city_id:GLOBAL.cityid,
            rental_id:''


        }),
    }).then((response) => response.json())
        .then((responseJson) => {

          //  //  alert(JSON.stringify(responseJson))


            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
}

else if (GLOBAL.type == "CarRental"){
    const url = 'http://139.59.76.223/cab/webservices/cab_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.round,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: '',
            child_quantity: '',
            senior_quantity: '',
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            package_id: '',
            payment_status: www,
            flight_details: '',
            picup_address: GLOBAL.toLocation,
            picup_lat: GLOBAL.mylat,
            picup_lon: GLOBAL.mylong,
            drop_address: '',
            drop_lat: '',
            drop_lon: '',
            direction_type_id: '',
            cab_category_id: GLOBAL.cab.id,
            traveller_name: GLOBAL.travellerusername,
            traveller_email: GLOBAL.travelleremail,
            traveller_mobile: GLOBAL.travellermobile,
            traveller_gender: GLOBAL.travellergender,
            traval_date: GLOBAL.date,
            traval_time: GLOBAL.time,
            booking_for:'4',
            rental_id:GLOBAL.did,
            city_id:'',



        }),
    }).then((response) => response.json())
        .then((responseJson) => {

   


            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
}



else {
    const url = 'http://139.59.76.223/cab/webservices/package_booking'

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
            'Content-Type': 'application/json',
        },


        body: JSON.stringify({
            user_id: GLOBAL.user_id,
            total_amount: d,
            coupan_code: GLOBAL.couponCode,
            coupan_id: GLOBAL.couponid,
            booking_way: GLOBAL.package,
            booking_km: '',
            transaction_mode: "Cod",
            adult_quantity: GLOBAL.adult,
            child_quantity: GLOBAL.child,
            senior_quantity: GLOBAL.senior,
            tax_amount: this.state.gstAmount,
            wallet_amount: this.state.walletAmount,
            traval_date: GLOBAL.date,
            picup_address: GLOBAL.searchLocation,
            picup_lat: GLOBAL.searchLatiude,
            picup_lon: GLOBAL.searchLongitude,
            payment_status: www,
            package_id: GLOBAL.package.package_id,
            booking_for:'2'

        }),
    }).then((response) => response.json())
        .then((responseJson) => {

          //  //  alert(JSON.stringify(responseJson))
// //  //  alert(JSON.stringify(responseJson))

            if (responseJson.status == true) {
                this.setState({visible: true})
                this.setState({booking: responseJson.transaction_id})


            } else {
                this.setState({results: []})
            }
        })
        .catch((error) => {
            console.error(error);

        });
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

    hide = () => {
    this.props
.navigation
.dispatch(StackActions.reset({
                                 index: 0,
                                 actions: [
                                     NavigationActions.navigate({
                                         routeName: 'DrawerNavigator',
                                         params: { someParams: 'parameters goes here...' },
                                     }),
                                 ],


                             }))
        this.props.navigation.navigate('History')
}
    handleClickssss =  () =>{
        this.setState({visible:false})



        setTimeout(() => this.hide(), 400)


    }
    getlog =  () =>{




        const url = 'http://139.59.76.223/cab/webservices/get_gst'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                user_id: GLOBAL.user_id,






            }),
        }).then((response) => response.json())
            .then((responseJson) => {

              //  //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    var a = responseJson.wallet
                    var b = responseJson.gst[0].value
                    this.setState({walletAmount:parseInt(a)})


                    var d = parseInt(GLOBAL.baseAmount) * b /100

                    this.setState({gstAmount:parseInt(d)})


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
    componentDidMount(){
     this.getlog()

        this.props.navigation.addListener('willFocus', this._handleStateChange);
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
    handleCheckBox = () => this.setState({ checked: !this.state.checked })


    render() {


        var s =  parseInt(GLOBAL.baseAmount) - parseInt(GLOBAL.discount) + this.state.gstAmount

        var d ;

        if (this.state.checked == true){
            d = s - parseInt(this.state.walletAmount)
        }else{
            d = s ;
        }

        var e = parseInt(d) * 15/100;

        return (
            <View style={{backgroundColor:Colors.background}}>

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <View style={{width:window.width,height:70,backgroundColor:Colors.blue}}>

                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8,marginLeft:6,width:window.width-140}}>
                           Select payment mode

                        </Text>

                    </View>

                </View>



<KeyboardAwareScrollView >

                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,height:230, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                       Payment Summary

                    </Text>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>

                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:4,marginLeft:16}}>
                            Base Fare

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:4,marginLeft:4,marginRight:20}}>
                           Rs {GLOBAL.baseAmount}

                        </Text>

                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>

                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:4,marginLeft:16}}>
                            Discount

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {GLOBAL.discount}

                        </Text>

                    </View>


                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>

                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:4,marginLeft:16}}>
                            GST/Taxes

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {this.state.gstAmount}

                        </Text>

                    </View>


                    <View style={{backgroundColor:'#f8f8f8',height:1,width:'100%',marginTop:4}}>
                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:6}}>

                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'black',marginTop:4,marginLeft:16}}>
                           Total

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:Colors.blue,marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {s}

                        </Text>

                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:-10}}>

                        <View style={{width:'50%'}}>
                    <CheckBox

                        title= 'Redeem points'
                        containerStyle = {{backgroundColor:'white',borderWidth:0}}
                        checked={this.state.checked}
                        onPress={this.handleCheckBox}
                    />
                        </View>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'black',marginTop:20,marginLeft:16,marginRight:20}}>
                            Rs {this.state.walletAmount}

                        </Text>

                    </View>

                    <View style={{backgroundColor:'#f8f8f8',height:1,width:'100%',marginTop:1}}>
                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:4}}>

                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:4,marginLeft:16}}>
                            Balance Payable

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:Colors.blue,marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {d}

                        </Text>

                    </View>


                </View>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,height:150, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                        Payment Option

                    </Text>
                    <TouchableOpacity onPress={() =>this.setState({partial:!this.state.partial})}>
                    <View style={{flexDirection:'row',width:'100%'}}>


                        {this.state.partial == false && (


                        <Image source={require('./radio.png')}
                               style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'}}


                        />

                        )  }

                        {this.state.partial == true && (


                            <Image source={require('./radios.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />

                        )}


                        <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:10,marginLeft:16}}>
                            15% now  to confirm booking

                        </Text>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {e}

                        </Text>

                    </View>

                    </TouchableOpacity>

                    <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:14,color:'#8a8a8f',marginTop:2,marginLeft:44}}>
                        ( remaining to paid Driver)

                    </Text>

                    <TouchableOpacity onPress={() =>this.setState({full:!this.state.full})}>
                    <View style={{flexDirection:'row',width:'100%'}}>


                        {this.state.full == false && (


                            <Image source={require('./radio.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'}}


                            />

                        )  }

                        {this.state.full == true && (


                            <Image source={require('./radios.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />

                        )}


                        <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:10,marginLeft:16}}>
                           Full Payment

                        </Text>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:4,marginLeft:16,marginRight:20}}>
                            Rs {d}

                        </Text>

                    </View>
                    </TouchableOpacity>


                </View>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,height:150, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                        Payment Mode

                    </Text>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                        <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:10,marginLeft:16}}>
                           Debit Card

                        </Text>
                        <View style={{marginRight:20}}>

                        {this.state.debit == false && (


                            <Image source={require('./radio.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'}}


                            />

                        )  }

                        {this.state.debit == true && (


                            <Image source={require('./radios.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />

                        )}

                        </View>



                    </View>


                    <View style={{backgroundColor:'#f8f8f8',height:1,width:'100%',marginTop:4}}>
                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                        <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:10,marginLeft:16}}>
                            Credit Card

                        </Text>
                        <View style={{marginRight:20}}>

                            {this.state.credit == false && (


                                <Image source={require('./radio.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'}}


                                />

                            )  }

                            {this.state.credit == true && (


                                <Image source={require('./radios.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />

                            )}

                        </View>



                    </View>


                    <View style={{backgroundColor:'#f8f8f8',height:1,width:'100%',marginTop:4}}>
                    </View>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                        <Text style = {{width:'60%',fontFamily:GLOBAL.medium,fontSize:17,color:'#8a8a8f',marginTop:10,marginLeft:16}}>
                           Wallet

                        </Text>
                        <View style={{marginRight:20}}>

                            {this.state.wallet == false && (


                                <Image source={require('./radio.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'}}


                                />

                            )  }

                            {this.state.wallet == true && (


                                <Image source={require('./radios.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />

                            )}

                        </View>



                    </View>
                </View>


    <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {
            this.setState({ visible: false });
        }}
    >
        <DialogContent>

            <View style={{width:window.width-100}}>

                <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                       source={require('./check.png')}/>

                <Text style = {{margin:10,textAlign: 'center',color:'black',fontSize: 18,marginTop: 12,fontFamily:GLOBAL.heavy}}>
                   Booking Successfull

                </Text>

                <Text style = {{margin:10,textAlign: 'center',color:'#8a8a8f',fontSize: 12,marginTop: 16,fontFamily:GLOBAL.roman}}>
                    Booking Reference number

                </Text>
                <Text style = {{margin:10,textAlign: 'center',color:'black',fontSize: 18,marginTop: -8,fontFamily:GLOBAL.heavy}}>
                   #{this.state.booking}

                </Text>

                <Text style = {{margin:10,textAlign: 'center',color:'#8a8a8f',fontSize: 12,marginTop: 16,fontFamily:GLOBAL.roman}}>
                    Your booking has been confirmed.Driver detail will be shared up to 1 hr prior to departure

                </Text>


                <View style={{backgroundColor:'#f8f8f8',height:1,width:'100%',marginTop:10}}>
                </View>

                <Button buttonStyle={{backgroundColor:'white',alignSelf:'center',marginTop:20}}
                        titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20,color:'#51e270'}}
                        onPress={this.handleClickssss}
                        title="Done"
                />



            </View>
        </DialogContent>
    </Dialog>

    <Button buttonStyle={{backgroundColor:Colors.blue,width:window.width -20,marginLeft:10,borderRadius:10,alignSelf:'center',marginTop:40}}
            titleStyle={{fontFamily:GLOBAL.medium,fontSize:20}}
            onPress={this.handleClick}
            title="Continue"
    />

    <View style = {{height :100}}>

    </View>

</KeyboardAwareScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.background,
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
