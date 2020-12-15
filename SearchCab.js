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
export default class SearchCab extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            selectedTab:0,
            cabs :[],
            km:'',

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

    detail= (itemData) => {
        GLOBAL.cab = itemData.item
        this.props.navigation.navigate('CabDetail')
    }

    renderRowItem1 = (itemData) => {
        return (
            <TouchableOpacity

                              onPress={() => this.detail(itemData)}>
            <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width - 26,marginLeft:13, borderRadius:6,shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,
                marginTop:14}}>
                <View style={{width:'100%',flexDirection:'row',marginLeft:8,justifyContent:'space-between'}}>

                <Image
                    style={{width: 100,height: 70,resizeMode:'contain' }}
                    source={{uri: itemData.item.car_image}}
                />

                <View style = {{marginRight:20,backgroundColor:'#eeb829',marginTop:28,width:40,height:18,borderRadius:4}}>
                    <Text style={{ color: 'white', fontFamily:GLOBAL.heavy,fontSize: 12,fontWeight:'bold',marginTop:4,textAlign:'center',alignSelf:'center' }}>4/5</Text>

                </View>


                </View>





 <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
     <Text style={{ marginLeft:12,color: 'black', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:4,width:'70%' }}>{itemData.item.car_type}</Text>

     <Text style={{ marginRight:8,color: 'black', fontFamily:GLOBAL.heavy,fontSize: 18,marginTop:4 }}>Rs {itemData.item.airport.base_price}</Text>

 </View>

                <View style={{flexDirection:'row',width:'100%',marginBottom:3}}>
                    <Text style={{ marginLeft:12,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:2,width:'74%' }}>{itemData.item.feature}</Text>

                    <Text style={{ color: '#767676', fontFamily:GLOBAL.roman,fontSize: 7,marginTop:2 }}>Inc of all Toll and Taxes</Text>

                </View>

            </View>
            </TouchableOpacity>

        )
    }
    componentDidMount(){
        var a = this.props.navigation.state.params
        this.setState({cabs:a})
        this.setState({lat:GLOBAL.lat})
        this.setState({long:GLOBAL.long})
       this.setState({km:a[0].distance})
       GLOBAL.km = a[0].distance

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

        return (
            <View  style = {{backgroundColor:Colors.background}} >

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
                                {GLOBAL.date} {GLOBAL.time} | {this.state.km} Km

                            </Text>



                        </View>





                    </View>

                </View>



                <MaterialTabs
                    items={['All', 'Sedan', 'SUV']}
                    scrollable = {false}
                    barColor = {'#FBD303'}
                    selectedIndex={this.state.selectedTab}
                    indicatorColor = 'white'
                    activeTextColor = 'white'
                    inactiveTextColor = 'white'
                    allowFontScaling ={true}
                    textStyle ={ {fontSize:15,width:92,textAlign:'center'}}


                    onChange={index =>

                        this.setSelectedTab(index)
                    }
                />

                <FlatList style = {{width:window.width,height:window.height - 120}}
                          data={this.state.cabs}
                          keyExtractor={this._keyExtractorss}
                          horizontal={false}
                          renderItem={this.renderRowItem1}
                          numColumns={1}
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
