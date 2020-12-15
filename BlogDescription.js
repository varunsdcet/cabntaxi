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
import HTML from 'react-native-render-html';
import moment from 'moment';
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
export default class BlogDescription extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            image:'',
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

        this.props.navigation.navigate('PaymentMode')
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

    }

    renderRowItem1 = (itemData) => {
        return (

            <View>
                <Text style={{ color: '#8a8a8f', fontFamily:GLOBAL.heavy,fontSize: 12,marginTop:4,marginLeft:20 }}>. Basically Bom Jesus</Text>
            </View>

        )
    }
    componentDidMount(){

        this.setState({image:GLOBAL.blog.image})
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
            <View  style = {{backgroundColor:'white'}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'#09304B'}} />

                <KeyboardAwareScrollView style={{height:window.height}}>

                    <ImageBackground
                        source={{uri: GLOBAL.blog.image}}
                        style={{width: '100%', height: 260}}
                    >
                        <View style = {{flexDirection:'row',marginTop:20}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>

                        </View>



                    </ImageBackground>


                    <Text style = {{fontFamily:GLOBAL.heavy,fontSize:24,color:'black',margin:8}}>
                        {GLOBAL.blog.title}


                    </Text>


                    <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'#8a8a8f',marginLeft:7}}>
                        {GLOBAL.blog.date}


                    </Text>


                    <View style={{width:'100%',backgroundColor:'#efefe4',height:1,marginTop:4}}>

                    </View>




                    <HTML containerStyle ={{margin:8}}
                        html={GLOBAL.blog.description} imagesMaxWidth={Dimensions.get('window').width} />







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
