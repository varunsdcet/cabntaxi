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
type Props = {};
export default class Notification extends Component {
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
            <View style={{marginTop:8,width:width,flexDirection:'row',backgroundColor:'white'}}>

                <View>

                {itemData.item.type == 1 && (
                    <Image source={require('./system.png')}
                           style  = {{width:50, height:50,marginLeft:20,marginTop:16,resizeMode:'contain'
                           }}

                    />
                )}

                {itemData.item.type == 2 && (
                    <Image source={require('./cross.png')}
                           style  = {{width:50, height:50,marginLeft:20,marginTop:16,resizeMode:'contain'
                           }}

                    />
                )}

                {itemData.item.type == 3 && (
                    <Image source={require('./systems.png')}
                           style  = {{width:50, height:50,marginLeft:20,marginTop:16,resizeMode:'contain'
                           }}

                    />
                )}
                {itemData.item.type == 4 && (
                    <Image source={require('./promotion.png')}
                           style  = {{width:50, height:50,marginLeft:20,marginTop:16,resizeMode:'contain'
                           }}

                    />
                )}
                </View>



                <View>
                    {itemData.item.type == 4 && (
                <Text style={{color:'#242e42',marginLeft:15,fontFamily:GLOBAL.heavy,fontSize:20,marginTop:20,}}>
                    Promotion

                </Text>
                    )}

                    {itemData.item.type != 4 && (
                        <Text style={{color:'#242e42',marginLeft:15,fontFamily:GLOBAL.heavy,fontSize:20,marginTop:20,}}>
                           System

                        </Text>
                    )}

                    <Text style={{color:'#bec2ce',marginLeft:15,fontFamily:GLOBAL.roman,fontSize:13,marginBottom:7,width:width-100,marginTop:4,}}>
                        {itemData.item.description}

                    </Text>


                </View>




            </View>
        )
    }
    componentDidMount(){
        alert(GLOBAL.user_id)
        const url = 'http://139.59.76.223/cab/webservices/notification'

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

              //  alert(JSON.stringify(responseJson))



                if (responseJson.status == true){


                    this.setState({eventLists:responseJson.data})




                }

            })
            .catch((error) => {
                console.error(error);
            });


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

            alert(s)

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

                            fontFamily:GLOBAL.heavy,marginTop: 8,marginLeft:10,color:Colors.blue,fontSize:16}}>
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

    packageDetail = (get) => {
        this.props.navigation.navigate('About',get)

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
        var radio_props = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        var s = this.state.finalPrice - parseInt(this.state.discount)

        return (
            <View  style = {{backgroundColor:Colors.background,height:height,flexDirection:'column'}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />


                <View style={{width:window.width,height:60,backgroundColor:Colors.blue}}>

                    <View style = {{flexDirection:'row',marginTop:20,width:'100%'}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                        <Text style={{color:'white',textAlign:'center',fontFamily:GLOBAL.heavy,fontSize:20,alignSelf:'center',marginTop:8,width:width - 80}}>
                            Notification

                        </Text>





                    </View>

                </View>


                <FlatList style = {{width:window.width,}}
                          data={this.state.eventLists}
                          keyExtractor={this._keyExtractorss}
                          horizontal={false}
                          renderItem={this.renderRowItem1}

                />


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
