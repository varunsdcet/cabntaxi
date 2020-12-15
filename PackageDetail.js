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
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
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
export default class PackageDetail extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            selectedTab:0,

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
    handleClick =() =>{

        this.props.navigation.navigate('BookingOption',GLOBAL.package)
    }
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
        // if (GLOBAL.searchLocation != "") {
        //     this.setState({lat: GLOBAL.searchLatiude})
        //     this.setState({long: GLOBAL.searchLongitude})
        //
        //     this.mapView.animateToRegion({
        //         latitude: GLOBAL.searchLatiude,
        //         longitude: GLOBAL.searchLongitude
        //     }, 1000)
        // }
    }

    renderRowItem1 = (itemData) => {
        return (

           <View>
               <Text style={{ color: '#8a8a8f', fontFamily:GLOBAL.heavy,fontSize: 12,marginTop:4,marginLeft:20 }}>. {itemData.item}</Text>
           </View>

        )
    }
    componentDidMount(){
      var s =   this.props.navigation.state.params
        GLOBAL.package = s
      //  alert(JSON.stringify(s))
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

    render() {

        return (
            <View  style = {{backgroundColor:Colors.background}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'#09304B' }} />

<KeyboardAwareScrollView style={{height:window.height}}>

                <ImageBackground
                    source={{uri: GLOBAL.package.image}}
                    style={{width: '100%', height: 260}}
                >

                    <View style = {{position:'absolute',top:0,width:'100%',height:260,backgroundColor:'rgba(0,0,0,0.6)'}}>


                    </View>
                    <View style = {{flexDirection:'row',marginTop:48}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                    </View>

                    <View style={{marginTop:80,marginLeft:20}}>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8,marginLeft:6,width:window.width-140}}>
                            {GLOBAL.package.title}

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'white',marginTop:1,marginLeft:6,width:window.width-140}}>
                            {GLOBAL.package.package_count} places

                        </Text>


                    </View>

                    <View style={{justifyContent:'space-between',flexDirection:'row',height:50,marginLeft:26,marginTop:-14,width:'100%'}}>


                    <StarRatingBar
                        score={parseFloat(GLOBAL.package.rating)}
                        dontShowScore={true} // true: not show the score text view
                        allowsHalfStars={true}
                        accurateHalfStars={true}
                    />


                        <Text style = {{marginRight:50,fontFamily:GLOBAL.heavy,fontSize:22,fontWeight:'bold',color:'white',marginTop:10}}>
                           RS {GLOBAL.package.price}

                        </Text>

                    </View>

                </ImageBackground>



    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
        <View  style = {{marginLeft:18}}>
            <Image source={require('./img.png')}
                   style  = {{width:60, height: 60,marginTop:7,resizeMode:'contain'
                   }}

            />

            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:12,color:'black',marginTop:20,width:70,textAlign:'center'}}>
               Flexible Package

            </Text>


        </View>


        <View >
            <Image source={require('./img.png')}
                   style  = {{marginLeft:20,width:60, height: 60,marginTop:7,resizeMode:'contain'
                   }}

            />

            <Text style = {{marginLeft:28,fontFamily:GLOBAL.heavy,fontSize:12,color:'black',marginTop:20,width:70}}>
                Multiple Stops

            </Text>


        </View>


        <View style={{marginRight:8}}>
            <Image source={require('./img.png')}
                   style  = {{width:60, height: 60,marginTop:7,resizeMode:'contain'
                   }}

            />

            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:12,color:'black',marginTop:20,width:80,marginRight:10}}>
                Unlimited wait time

            </Text>


        </View>

    </View>

    <View style={{width:'100%',backgroundColor:'#efefe4',height:1,marginTop:4}}>

    </View>

    <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'black',marginTop:20,marginLeft:20}}>
       Place List {GLOBAL.package.package_count}

    </Text>









                <FlatList style = {{width:window.width}}
                          data={GLOBAL.package.places}
                          keyExtractor={this._keyExtractorss}
                          horizontal={false}
                          renderItem={this.renderRowItem1}
                          numColumns={1}
                />

    <Button buttonStyle={{backgroundColor:'#09304B',width:window.width -20,marginLeft:10,borderRadius:10,alignSelf:'center',marginTop:40}}
            titleStyle={{fontFamily:GLOBAL.medium,fontSize:20}}
            onPress={this.handleClick}
            title="Book Now"
    />
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
