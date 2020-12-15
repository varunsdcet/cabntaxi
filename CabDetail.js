import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,

    ImageBackground,
    StatusBar,
    SafeAreaView,
    FlatList, TextInput, AsyncStorage
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextField} from "react-native-material-textfield";
type Props = {};
export default class CabDetail extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :[],
            lat:'',
            long:'',
            selectedTab:0,
            offer:[],
            discount:0,
            finalPrice:0,
            price:true,
            extra:true,
            important:true,
            name:'',
            email:'',
            mobile:'',
            value:0,

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

    handleClick = () =>{

        GLOBAL.travellerusername = this.state.name
        GLOBAL.travelleremail = this.state.email
        GLOBAL.travellermobile = this.state.mobile
        GLOBAL.baseAmount = GLOBAL.cab.airport.base_price
            GLOBAL.discount = this.state.discount
        if (this.state.value == 0){
            GLOBAL.travellermobile = "Male"
        }else{
            GLOBAL.travellermobile = "Female"
        }

        var values =  AsyncStorage.getItem('userID');
        values.then((e)=>{
            if (e == '' || e == null ){

                this.props.navigation.navigate('Register')

            }else {
                GLOBAL.user_id = e;
                this.props.navigation.navigate('PaymentMode')
            }

        })



    }

    renderRowItem2 = (itemData) => {
        return (
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <Text style={{ marginLeft:12,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:4 }}>{itemData.item.title}</Text>

                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:4 }}>{itemData.item.price}</Text>

            </View>
        )
    }

    renderRowItem3 = (itemData) => {
        return (
            <View >


                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.medium,fontSize: 14,marginTop:4,marginLeft:14 }}>. {itemData.item} </Text>

            </View>
        )
    }

    renderRowItem1 = (itemData) => {
        return (
            <View style={{marginLeft:16,marginTop:6}}>
                <Text style={{ color: 'black', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:3 }}>{itemData.item.title}</Text>

            </View>
        )
    }
    componentDidMount(){
        this.setState({finalPrice:parseInt(GLOBAL.cab.airport.base_price)})

        const url = 'http://139.59.76.223/cab/webservices/getoffer'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                type: '2',


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true){
                    this.setState({offer:responseJson.offer})

                }

            })
            .catch((error) => {
                console.error(error);
            });



        var fe = GLOBAL.cab.airport.include_features
        this.setState({eventLists:fe})


        this.setState({lat:GLOBAL.lat})
        this.setState({long:GLOBAL.long})

        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    setSelectedTab = (index) =>{
        this.setState({selectedTab:index})

    }

    changeIndex = (index) => {

        var discount = this.state.offer[index].type
        if (discount == "Fixed"){
            this.setState({discount:this.state.offer[index].amount })
        }else{
            var fp = this.state.finalPrice
            var amount = parseInt(this.state.offer[index].amount)
            var s = fp * amount/100



            if(s > parseInt(this.state.offer[index].upto_amount)){
                this.setState({discount:this.state.offer[index].upto_amount })
            }else{


                this.setState({discount:s })
            }

        }


//   GLOBAL.language = item.code;
        let { offer } = this.state;
        for(let i = 0; i < offer.length; i++){
            offer[i].is_selected = '';
        }


        let targetPost = offer[index];

        // Flip the 'liked' property of the targetPost
        targetPost.is_selected = "Y";

        offer[index] = targetPost;


        GLOBAL.couponCode =targetPost.promocode,
            GLOBAL.couponid = targetPost.id,

            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property

            this.setState({ offer: offer})




    }
    renderRowItem10 = (itemData,index) => {
        return (

            <TouchableOpacity onPress={() => this.changeIndex(itemData.index)}>

                <View style={{flexDirection:'row'}}>

                    {itemData.item.is_selected == '' &&(

                        <Image source={require('./radio.png')}
                               style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                               }}

                        />
                    )
                    }

                    {itemData.item.is_selected != '' &&(

                        <Image source={require('./radios.png')}
                               style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                               }}

                        />
                    )
                    }


                    <View>
                        <Text style={{

                            fontFamily:GLOBAL.heavy,marginTop: 8,marginLeft:10,color:'#FBD303',fontSize:16}}>
                            {itemData.item.promocode}

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#8a8a8f',marginTop:4,marginLeft:12,width:window.width-20}}>
                            {itemData.item.description}

                        </Text>

                    </View>



                </View>
            </TouchableOpacity>

        )
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

        var a = ""

        if (GLOBAL.type == "Airport") {

            if (GLOBAL.myi == "0") {
                a = GLOBAL.airportLocation + '-' + GLOBAL.toLocation
            } else if (GLOBAL.myi == "1") {
                a = GLOBAL.toLocation + '-' + GLOBAL.airportLocation
            } else if (GLOBAL.myi == "2") {
                a = GLOBAL.toLocation + '-' + GLOBAL.searchLocations
            }
        }
        else if (GLOBAL.type == "Outstation"){
            a = GLOBAL.toLocation + '-' + GLOBAL.searchLocations
        }
        else if (GLOBAL.type == "CarRental"){
            a = GLOBAL.toLocation
        }

        var radio_props = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
var s = this.state.finalPrice - parseInt(this.state.discount)

        return (
            <View  style = {{backgroundColor:Colors.background,flexDirection:'column'}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'#FBD303'}} />


                <View style={{width:window.width,height:80,backgroundColor:'#FBD303'}}>

                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                        <View>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'#09304B',marginTop:8,marginLeft:6,width:window.width-70}}>
                                {a}

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:10,color:'#09304B',marginTop:2,marginLeft:6,width:window.width-140}}>
                                {GLOBAL.date} {GLOBAL.time} | {GLOBAL.km} Km

                            </Text>




                        </View>





                    </View>

                </View>


               < KeyboardAwareScrollView>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width - 26,marginLeft:13, borderRadius:6,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5,
                    marginTop:14}}>
                    <View style={{width:'100%',flexDirection:'row',marginLeft:8,justifyContent:'space-between'}}>

                        <Image
                            style={{width: 100,height: 70,resizeMode:'contain' }}
                            source={{uri: GLOBAL.cab.car_image}}
                        />

                        <View style = {{backgroundColor:'#eeb829',marginRight:40,marginTop:20,width:40,height:18,borderRadius:4}}>
                            <Text style={{ color: 'white', fontFamily:GLOBAL.heavy,fontSize: 12,fontWeight:'bold',marginTop:4,textAlign:'center',alignSelf:'center' }}>4/5</Text>

                        </View>


                    </View>





                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                        <Text style={{ marginLeft:12,color: 'black', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:4,width:'70%' }}>{ GLOBAL.cab.car_type}</Text>

                        <Text style={{ marginRight:20,color: 'black', fontFamily:GLOBAL.heavy,fontSize: 18,marginTop:4 }}>Rs { GLOBAL.cab.airport.base_price}</Text>

                    </View>

                    <View style={{flexDirection:'row',width:'100%',marginBottom:3}}>
                        <Text style={{ marginLeft:12,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:2,width:'74%' }}>{ GLOBAL.cab.feature}</Text>

                        <Text style={{ marginRight:20,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 7,marginTop:2 }}>Inc of all Toll and Taxes</Text>

                    </View>

                    <View style={{backgroundColor:'#09304B',height:1,width:'100%',marginTop:4}}>
                    </View>




                    <View style={{flexDirection:'row',width:'100%',marginTop:10,justifyContent:'space-between'}}>

                        <View>
                        <Text style={{ marginLeft:12,color: 'black', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:2,width:'90%' }}>INCLUDED IN THE PRICE </Text>

                        <View style={{marginLeft:12,backgroundColor:'#09304B',height:1,width:181}}>

                        </View>

                        </View>

                        {this.state.price == false && (
                            <TouchableOpacity

                                onPress={() => this.setState({price:!this.state.price})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./rightarrow.png')}
                                />
                            </TouchableOpacity>
                        )}
                        {this.state.price == true && (
                            <TouchableOpacity

                                onPress={() => this.setState({price:!this.state.price})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./downarrowblue.png')}
                                />
                            </TouchableOpacity>
                        )}

                    </View>

                    {this.state.price == true && (
                        <FlatList style = {{width:window.width,marginTop:4}}
                                  data={this.state.eventLists}
                                  keyExtractor={this._keyExtractorss}
                                  horizontal={false}
                                  renderItem={this.renderRowItem1}
                                  numColumns={1}
                        />

                    )}

                    <View style={{flexDirection:'row',width:'100%',marginTop:10,justifyContent:'space-between'}}>

                       <View>
                        <Text style={{ marginLeft:12,color: 'black', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:2,width:'90%' }}>EXTRA CHARGES </Text>

                        <View style={{marginLeft:12,backgroundColor:'#09304B',height:1,width:131}}>

                        </View>
                       </View>

                        {this.state.extra == false && (
                            <TouchableOpacity

                                onPress={() => this.setState({extra:!this.state.extra})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./rightarrow.png')}
                                />
                            </TouchableOpacity>
                        )}
                        {this.state.extra == true && (
                            <TouchableOpacity

                                onPress={() => this.setState({extra:!this.state.extra})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./downarrowblue.png')}
                                />
                            </TouchableOpacity>
                        )}

                    </View>

                    {this.state.extra == true && (
                        <FlatList style = {{width:window.width,marginTop:4}}
                                  data={GLOBAL.cab.airport.extra_features}
                                  keyExtractor={this._keyExtractorss}
                                  horizontal={false}
                                  renderItem={this.renderRowItem2}
                                  numColumns={1}
                        />

                    )}

                    <View style={{flexDirection:'row',width:'100%',marginTop:10,justifyContent:'space-between'}}>

                       <View>
                        <Text style={{ marginLeft:12,color: 'black', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:2,width:'90%' }}>IMPORTANT INFO </Text>
                        <View style={{marginLeft:12,backgroundColor:'#09304B',height:1,width:130}}>

                        </View>
                       </View>
                        {this.state.important == false && (
                            <TouchableOpacity

                                onPress={() => this.setState({important:!this.state.important})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./rightarrow.png')}
                                />
                            </TouchableOpacity>
                        )}
                        {this.state.important == true && (
                            <TouchableOpacity

                                onPress={() => this.setState({important:!this.state.important})}>
                                <Image
                                    style={{width: 12,height: 12,resizeMode:'contain',marginRight:10 }}
                                    source={require('./downarrowblue.png')}
                                />
                            </TouchableOpacity>
                        )}

                    </View>

                    {this.state.important == true && (
                        <FlatList style = {{width:window.width,marginTop:4}}
                                  data={GLOBAL.cab.airport.description   }
                                  keyExtractor={this._keyExtractorss}
                                  horizontal={false}
                                  renderItem={this.renderRowItem3}
                                  numColumns={1}
                        />

                    )}

                </View>



                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>



                    <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                        Discount Applied

                    </Text>


                    <FlatList style = {{width:window.width}}
                              data={this.state.offer}
                              keyExtractor={this._keyExtractorss}
                              horizontal={false}
                              renderItem={this.renderRowItem10}
                              numColumns={1}
                    />



                </View>

                   <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                       shadowOffset: { width: 0, height: 1 },
                       shadowOpacity: 0.6,
                       shadowRadius: 2,
                       elevation: 5 }}>



                       <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                          Traveller Information

                       </Text>


                       <View style={{marginLeft:10,width:width - 40}}>

                       <TextField
                           label={'Name'}
                           onChangeText={text => this.setState({name:text})}
                           tintColor = 'grey'


                       />

                       <TextField
                       label={'Email'}
                       onChangeText={text => this.setState({email:text})}
                       tintColor = 'grey'


                   />


                       <TextField
                           label={'Mobile'}
                           onChangeText={text => this.setState({mobile:text})}
                           tintColor = 'grey'


                       />


</View>


                       <View style = {{margin:20,marginTop:20}}>
                           <Text style={{color:'#8f8f8f',fontFamily:GLOBAL.roman,fontSize:16}}>
                               Gender

                           </Text>
                           <RadioForm
                               radio_props={radio_props}
                               initial={0}
                               buttonSize = {10}
                               formHorizontal={true}
                               labelHorizontal={true}
                               buttonOuterColor = {'black'}
                               buttonInnerColor = {'#09304B'}
                               animation={true}
                               labelStyle={{fontSize: 18,paddingRight:18, color: 'black',fontFamily:GLOBAL.medium}}
                               onPress={(value) => {this.setState({value:value})}}
                           />


                       </View>


                   </View>

                   <View style = {{height:180}}>

                   </View>

               </KeyboardAwareScrollView>
                <View style = {{position:'absolute',bottom:100,height:100,backgroundColor:'#FBD303',width:'100%'}}>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                        <View>

                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:24,color:'#09304B',marginTop:18,marginLeft:16,width:window.width-140}}>
                                Rs {s}

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#09304B',marginTop:4,marginLeft:16,width:window.width-140}}>
                                All inclusive price

                            </Text>

                        </View>

                        <Button buttonStyle={{backgroundColor:'#09304B',width:100,borderRadius:20,alignSelf:'center',marginTop:22,marginRight:10}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                onPress={this.handleClick}
                                title="Pay Now"
                        />


                    </View>

                </View>




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
