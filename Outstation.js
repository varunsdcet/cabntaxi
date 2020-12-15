import React, {Component} from 'react';
import {StyleSheet, View, Image, Text,ImageBackground, TouchableOpacity,Dimensions,StatusBar,FlatList} from 'react-native';
const window = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card,Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
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
const GLOBAL = require('./Global');
var customDatesStyles = [];
import TimePicker from 'react-native-simple-time-picker';
import CalendarStrip from "react-native-calendar-strip";
import Geolocation from "react-native-geolocation-service";

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class Outstation extends Component {
    constructor(props) {

        super(props)
        this.state = {
            detail:'',
            package:[],
            blog:[],
            value :0,
            direction:[],
            from:GLOBAL.searchLocations,
            date:'',
            time:'',
            aid:'',
            airport:GLOBAL.airportLocation,
            toLocation:GLOBAL.toLocation,
            index:0,
            eventLists :["1","2"],
            selectedHours: 0,
            isShown : false,
            //initial Hours
            selectedMinutes: 0,

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
        this.setState({index:index})
        this.setState({aid:this.state.direction[index].id})



    }

    _handleStateChange = (state) =>{

        // alert(GLOBAL.airportLocation)
        this.setState({airport:GLOBAL.airportLocation})
        this.setState({toLocation:GLOBAL.toLocation})
        this.setState({from:GLOBAL.searchLocations})
//toLocation




        Geolocation.getCurrentPosition(
            (position) => {
                //   this.getlog(position)

                // alert(JSON.stringify(position))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }


    packageDetail =  (itemData) => {
        GLOBAL.package = itemData
        this.props.navigation.navigate('PackageDetail',itemData)
    }
    componentDidMount(){

        const url = 'http://139.59.76.223/cab/webservices/getoffer'

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



                if (responseJson.status == true){


                    this.setState({package:responseJson.offer})

                }

            })
            .catch((error) => {
                console.error(error);
            });


        this.props.navigation.addListener('willFocus', this._handleStateChange);


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
    handleClickTime  = () => {
        GLOBAL.time = this.state.selectedHours + ':' + this.state.selectedMinutes
        this.setState({date:GLOBAL.date})
        this.setState({time:GLOBAL.time})
        this.setState({isShown:false})

    }

    renderRowItem1 = (itemData) => {
        return (
            <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 70,marginLeft:13, borderRadius:6,shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,marginBottom:10 }}>

                <Image
                    style={{width: width-70,height: 150,borderRadius:6 }}
                    source={{uri: itemData.item.image}}
                />



                <View style={{backgroundColor:'#ffcc01',position:'absolute',top:40,alignSelf:'center',borderRadius:4}}>

                    <Text style={{ color: 'black', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 16,marginLeft:10 ,height:20}}>{itemData.item.description}</Text>
                </View>

                <View style={{backgroundColor:'white',position:'absolute',top:60,alignSelf:'center',borderRadius:4}}>

                    <Text style={{ color: 'black', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 16,marginLeft:10,width:100,textAlign:'center' }}>{itemData.item.promocode}</Text>
                </View>

                <Text style={{ color: '#353535', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 16,marginLeft:10 }}>{itemData.item.description}</Text>

                <Text style={{ color: '#777777', fontFamily:GLOBAL.heavy, fontSize: 10,marginBottom:20,marginLeft:10 }}>Limited Period Offer</Text>





            </View>
        )
    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s

    }
    handleClick = () => {

        if (this.state.toLocation == ''){
            alert('Please enter to Location')
            return
        }

        if (this.state.from == ''){
            alert('Please enter From Location')
            return
        }

        if (GLOBAL.date == '' || GLOBAL.time == ''){
            alert('Please select date and time')
            return
        }

        GLOBAL.type = 'Outstation'
        GLOBAL.aid = this.state.aid
        GLOBAL.flight = this.state.detail

     var type = "0";
        if (this.state.value == 0){
            type = "1"
        }else{
            type = "2"
        }
        GLOBAL.round = type
        alert(GLOBAL.searchLatiudes)
alert(GLOBAL.searchLatiude)

            const url = 'http://139.59.76.223/cab/webservices/get_cab_categories_outstation'

            fetch(url, {
                method: 'POST',
                headers: {
                    'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    to_lat: GLOBAL.mylat,
                    to_lon: GLOBAL.mylong,
                    from_lat: GLOBAL.searchLatiude,
                    from_lon: GLOBAL.searchLongitude,
                    to_city:GLOBAL.cityid,
                    trip_type:type

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                   //  alert(JSON.stringify(responseJson))


                    if (responseJson.status == true) {
                        var data = responseJson.data

                        this.props.navigation.navigate('SearchCab', data)


                    }

                })
                .catch((error) => {
                    console.error(error);
                });



        //  this.props.navigation.navigate('SearchCab')
    }


    blog = (itemData) => {
        GLOBAL.blog = itemData
        this.props.navigation.navigate('BlogDescription')


    }

    renderRowItem2 = (itemData) => {
        return (

            <TouchableOpacity
                onPress={() => this.blog(itemData.item)}
                activeOpacity={.99} >


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,width : width/2 +60,marginLeft:13, borderRadius:6,shadowColor: '#000',
                    shadowOffset: { width: 2, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5,marginBottom:10 }}>

                    <Image
                        style={{width: width/2 +60,height: 150,borderRadius:6 }}
                        source={{uri: itemData.item.image}}
                    />




                    <Text style={{ color: '#333a4d', fontFamily:GLOBAL.heavy, fontSize: 16,textAlign:'center',alignSelf:'center' }}>{itemData.item.title} </Text>





                </View>
            </TouchableOpacity>


        )
    }
    render() {

        var radio_props = [
            {label: ' One Way ', value: 0 },
            {label: ' Round Way', value: 1 }
        ];

        let { detail } = this.state;
        let { airport } = this.state;
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
                <KeyboardAwareScrollView>
                    <View style={{backgroundColor:'white',shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        height:265,
                        width:'90%',margin:'6%',marginLeft:'5%',borderRadius:18
                    }}>
                        <View style = {{width:'90%',marginLeft:'5%',marginTop:20}}>


                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={true}
                                buttonSize = {10}
                                labelHorizontal={true}
                                buttonOuterColor = {Colors.blue}
                                buttonInnerColor = {Colors.blue}
                                animation={true}
                                labelStyle={{fontSize: 16,paddingRight:40,paddingTop:2, color: 'black',fontFamily:GLOBAL.roman}}
                                onPress={(value) => {this.setState({value:value})}}
                            />




                                <View style = {{flexDirection:'row',width:'100%'}}>
                                    <TouchableOpacity style = {{width:'44%'}}

                                                      onPress={() => this.props.navigation.navigate('MapViewController')}>
                                        <View >


                                            <TextField
                                                label={'From Location'}
                                                defaultValue={this.state.toLocation}
                                                tintColor = 'grey'
                                                editable={false}


                                            />

                                        </View>

                                    </TouchableOpacity>

                                    <TouchableOpacity style = {{width:'44%',marginLeft:'10%'}}

                                                      onPress={() => this.props.navigation.navigate('City')}>
                                        <View >

                                            <TextField
                                                label={'To Location'}
                                                defaultValue={this.state.from}
                                                tintColor = 'grey'
                                                editable={false}

                                            />



                                        </View>
                                    </TouchableOpacity>


                                </View>



                            <TouchableOpacity   onPress={() => this.setState({isShown:true})}

                            >
                                <View style = {{flexDirection:'row'}}>

                                    <View style = {{width:'44%'}}>

                                        <TextField
                                            label={'Pickup Date'}
                                            defaultValue={this.state.date}
                                            editable={false}
                                            tintColor = 'grey'

                                        />

                                    </View>


                                    <View style = {{width:'44%',marginLeft:'10%'}}>

                                        <TextField
                                            label={'Pickup Time'}
                                            defaultValue={this.state.time}
                                            editable={false}
                                            tintColor = 'grey'

                                        />

                                    </View>


                                </View>

                            </TouchableOpacity>




                        </View>


                        <Button buttonStyle={{backgroundColor:Colors.blue,width:200,borderRadius:20,alignSelf:'center',marginTop:40}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                onPress={this.handleClick}
                                title="Search"
                        />
                    </View>

                    <View style={{flexDirection:'row',margin:10,width:'100%',justifyContent:'space-between'}}>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:26,color:'black'}}>
                           Offers


                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:14,color:'#333a4d',alignSelf:'flex-end',marginRight:20}}>



                        </Text>



                    </View>


                    <FlatList style = {{width:window.width,}}
                              data={this.state.package}
                              keyExtractor={this._keyExtractorss}
                              horizontal={true}
                              renderItem={this.renderRowItem1}
                    />





                </KeyboardAwareScrollView>

                {this.state.isShown == true && (
                    <View style={{position:'absolute',width:window.width,height:500,bottom:0,backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>



                        <TouchableOpacity   onPress={() => this.setState({isShown:false})}

                        >
                            <View style={{flexDirection:'row'}}>
                                <Image source={require('./cross-black.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:13,resizeMode:'contain'
                                       }}

                                />

                                <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:16,color:'black',margin:20,marginTop:15}}>
                                    Select date and time


                                </Text>


                            </View>
                        </TouchableOpacity>

                        <View style = {{width:window.width,height:1,backgroundColor:'#333a4d'}}>

                        </View>
                        <CalendarStrip

                            calendarAnimation={{type: 'sequence', duration: 30}}
                            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                            style={{height:120, paddingTop: 15}}
                            calendarHeaderStyle={{color: 'black'}}
                            calendarColor={'white'}
                            highlightDateNameStyle={{color:'white'}}
                            highlightDateNumberStyle ={{color:'white'}}

                            dateContainerStyle = {{

                                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,backgroundColor: 'white' }}

                            iconContainer={{flex: 0.1}}
                            onDateSelected={(date)=> this.dates(date)}
                        />

                        <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:16,color:'black',margin:7,alignSelf:'center',marginTop:2}}>
                            Time


                        </Text>

                        <TimePicker style = {{height:100}}
                                    selectedHours={this.state.selectedHours}
                            //initial Hourse value
                                    selectedMinutes={this.state.selectedMinutes}
                            //initial Minutes value
                                    onChange={(hours, minutes) => this.setState({
                                        selectedHours: hours, selectedMinutes: minutes
                                    })}
                        />

                        <Button buttonStyle={{backgroundColor:Colors.blue,width:window.width - 40,borderRadius:20,alignSelf:'center',marginTop:10}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                title="CONFIRM"
                                onPress={this.handleClickTime}
                        />

                    </View>
                )}





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
