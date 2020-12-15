import React, {Component} from 'react';
import {StyleSheet, View, Image, Text,ImageBackground, TouchableOpacity,Dimensions,StatusBar,FlatList} from 'react-native';
const window = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card,Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
const GLOBAL = require('./Global');
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window');
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
var customDatesStyles = [];
import TimePicker from 'react-native-simple-time-picker';
import CalendarStrip from "react-native-calendar-strip";
export default class Wallet extends Component {
    constructor(props) {

        super(props)
        this.state = {
            detail:'',
            eventLists :["1","2"],
            selectedHours: 0,
            isShown : false,
            //initial Hours
            selectedMinutes: 0,
            package:[],
            amount:'',

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

    getIndex
        = (index) => {


    }

    _handleStateChange = (state)=>{


    }
    componentDidMount(){

        const url = 'http://139.59.76.223/cab/webservices/get_wallet_history'

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
                    this.setState({amount:responseJson.amount})


                    this.setState({package:responseJson.data})

                }

            })
            .catch((error) => {
                console.error(error);
            });



        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

    }

    packageDetail =  (itemData) => {
        GLOBAL.package = itemData

        this.props.navigation.navigate('PackageDetail',itemData)
    }

    renderRowItem1 = (itemData) => {
        return (



            <View style={{backgroundColor:'white',justifyContent:'space-between',flexDirection:'row',color :'white',
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,marginBottom:10 }}>






                <Text style={{ color: '#242e42', fontFamily:GLOBAL.roman,fontWeight:'bold', fontSize: 16,marginLeft:10,width:80,marginBottom:8,marginTop:8 }}>{moment(itemData.item.created_at).format(' MMM Do, h:mm a')}</Text>

                <View  style={{marginTop:12}}>
                    <Text style={{ color: '#242e42', fontFamily:GLOBAL.roman,fontWeight:'bold', fontSize: 16,marginLeft:10,width:120, }}>Point Earned</Text>
                    <Text style={{ color: '#bec2ce', fontFamily:GLOBAL.roman, fontSize: 8,marginLeft:10,width:140 }}>Earned on registration</Text>
                </View>

                <Text style={{ color: 'green', fontFamily:GLOBAL.roman,fontWeight:'bold', fontSize: 16,marginRight:10,marginTop:15}}>+ {itemData.item.amount}</Text>



            </View>


        )
    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.calculateDay(s)
    }
    renderRowItem2 = (itemData) => {
        return (

            <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,width : width/2 +60,marginLeft:13, borderRadius:6,shadowColor: '#000',
                shadowOffset: { width: 2, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5 }}>

                <Image
                    style={{width: width/2 +60,height: 150,borderRadius:6 }}
                    source={require('./splash.png')}
                />




                <Text style={{ color: '#333a4d', fontFamily:GLOBAL.heavy, fontSize: 16,textAlign:'center',alignSelf:'center' }}>12 cjhcuwh c uwchuehcu w uh hwu hwu h uhw uhhw hw  hwh uwhiw </Text>





            </View>

        )
    }
    render() {
        let { detail } = this.state;
        let data = [{
            value: 'From the Airport ',
        }, {
            value: 'To the Airport',
        }, {
            value: 'Local Transfer',
        }];
        return (



            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />


                    <ImageBackground
                        source={require('./topheader.png')}
                        style={{width: '100%', height: 230}}
                    >

                        <View style = {{flexDirection:'row',marginTop:20,width:'100%'}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:20,color:'white',marginLeft:width/2 - 90,marginTop:8,alignSelf:'center'}}>
                                My Wallet

                            </Text>

                        </View>


                        <Text style={{alignSelf:'center',fontFamily:GLOBAL.heavy,fontSize:34,color:'white',marginTop:70}}>
                          Rs  {this.state.amount}


                        </Text>

                        <Text style={{alignSelf:'center',fontFamily:GLOBAL.roman,fontSize:22,color:'white',marginTop:3}}>
                           Total Balance


                        </Text>



                    </ImageBackground>



                <KeyboardAwareScrollView>

                    <Text style={{color:'grey',marginLeft:20,fontFamily:GLOBAL.medium,marginTop:20,fontSize:16}}>
                    Wallet Statement

                    </Text>

                    <FlatList style = {{width:window.width,marginTop:20}}
                              data={this.state.package}
                              keyExtractor={this._keyExtractorss}
                              horizontal={false}
                              renderItem={this.renderRowItem1}

                    />



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

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
