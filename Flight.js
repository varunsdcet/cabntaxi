import React, {Component} from 'react';
import {StyleSheet, View, Image, Text,ImageBackground, TouchableOpacity,Dimensions,StatusBar,FlatList} from 'react-native';
const window = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card,Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import SegmentedControl from '@react-native-community/segmented-control';
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
export default class Flight extends Component {
    constructor(props) {

        super(props)
        this.state = {
            detail:'',
            package:[],
            blog:[],
            click:'0',
            pick:'0',
            token:'',
            adult:'0',
            child:'0',
            infant:'0',
            FlightCabinClass:'',
            classflight:'',

            direction:["1","2","3","4","5","6","7","8","9","10"],
            from:GLOBAL.searchLocations,
            date:'',
            dropdate:'',
            time:'',
            aid:'',
            airport:'',
            toLocation:'',
            index:0,
            eventLists :["1","2"],
            selectedHours: 0,
            isShown : false,
            //initial Hours
            selectedMinutes: 0,
            selectedIndex:0,

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
        = (index,value) => {
this.setState({classflight:value})
        this.setState({index:index})
        this.setState({FlightCabinClass:String(index + 1)})



    }

    _handleStateChange = (state) =>{

if (this.state.click == "0"){
this.setState({airport:GLOBAL.inflight.code})
}
if (this.state.click == "1"){
  this.setState({toLocation:GLOBAL.inflight.code})
//toLocation
}
        // alert(GLOBAL.airportLocation)

    }


    packageDetail =  (itemData) => {
        GLOBAL.package = itemData
        this.props.navigation.navigate('PackageDetail',itemData)
    }
    componentDidMount(){
      //http://139.59.76.223/cab/webservices/get_flight_tokenId


      const url =  GLOBAL.BASE_URL  + 'get_flight_tokenId'

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },


      }).then((response) => response.json())
          .then((responseJson) => {




              if (responseJson.status == true) {
      this.setState({token:responseJson.TokenId})
      GLOBAL.flighttoken = responseJson.TokenId

              }else{
                  this.setState({results:[]})
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
            <TouchableOpacity

                onPress={() => this.packageDetail(itemData.item)}>

            <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width/2- 20,marginLeft:13, borderRadius:6,shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 5,marginBottom:18 }}>

                <Image
                    style={{width: width/2- 20,height: 150,borderRadius:6 }}
                    source={{uri: itemData.item.image}}
                />

                <View style = {{backgroundColor:'#09304B',marginLeft:width/2- 120,width:100,borderTopLeftRadius:22,height:30,position:'absolute',top:20}}>
                    <Text style={{ color: 'white', fontFamily:GLOBAL.heavy, marginTop:6,fontSize: 18,fontWeight:'bold',marginLeft:4 }}>₹ {itemData.item.price}</Text>

                </View>

                <Text style={{ color: '#242e43', fontFamily:GLOBAL.heavy,fontWeight:'bold', fontSize: 16,marginLeft:12,marginTop:10 }}>{itemData.item.title}</Text>

                <Text style={{ color: '#8a8a8a', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:12 }}>{itemData.item.package_count} Places</Text>

          <View style={{height:8}}>

          </View>



            </View>
            </TouchableOpacity>
        )
    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        if (this.state.pick == "0"){
        this.setState({date:s})
      }
      if (this.state.pick == "1"){
      this.setState({dropdate:s})
    }

        this.setState({isShown:false})

    }
    handleClick = () => {


      var directflight = true
      if (this.state.selectedIndex == 2){
        directflight = false
      }

var journeyType = "1"
if (this.state.selectedIndex == 0){
  journeyType = "1"
}
else if (this.state.selectedIndex == 1){
  journeyType = "2"
}else{
    journeyType = "3"
}

var dd = {
    TokenId: this.state.token,
    journeyType: journeyType,
    adultcount: this.state.adult,
    childcount: this.state.child,
    infantcount: this.state.infant,
    flight_from: this.state.airport,
    flight_to: this.state.toLocation,
    FlightCabinClass: this.state.classflight,
    departure_date:this.state.date,
     arrival_date:this.state.dropdate,
    direct_flight:directflight

}
GLOBAL.flide = dd
console.log(dd)

        // GLOBAL.type = 'Airport'
        // GLOBAL.aid = this.state.aid
        //     GLOBAL.flight = this.state.detail
        //
        // if  (this.state.aid == ''){
        //     alert('Please Select Direction')
        //     return
        // }
        //
        // if  (GLOBAL.date == '' || GLOBAL.time == ''){
        //     alert('Please Select Date and Time')
        //     return
        // }
        //
        //
        // if (this.state.index == 0) {
        //
        //     if  (this.state.airport == ''){
        //         alert('Please Select From Location')
        //         return
        //     }
        //
        //     if  (this.state.toLocation == ''){
        //         alert('Please Select To Location')
        //         return
        //     }

            const url = GLOBAL.BASE_URL + 'search_flights'

            fetch(url, {
                method: 'POST',
                headers: {
                    'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    TokenId: this.state.token,
                    journeyType: journeyType,
                    adultcount: this.state.adult,
                    childcount: this.state.child,
                    infantcount: this.state.infant,
                    flight_from: this.state.airport,
                    flight_to: this.state.toLocation,
                    FlightCabinClass: this.state.FlightCabinClass,
                    departure_date:this.state.date,
                     arrival_date:this.state.dropdate,
                    direct_flight:directflight

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(JSON.stringify(responseJson))

alert(JSON.stringify(responseJson))

                    if (responseJson.status == true) {

this.props.navigation.navigate('FlightDetail',responseJson)

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
                <Text style={{ color: '#242e42', fontFamily:GLOBAL.roman,marginTop:4, fontSize: 16,marginBottom:10,marginLeft:8 }}>{itemData.item.title} </Text>
                <View style={{height:5}}>

                </View>

            </View>
        </TouchableOpacity>


        )
    }

    adult = (value,index) =>{
      this.setState({adult:value})
    }
    child = (value,index) =>{
      this.setState({child:value})
    }
    infant = (value,index) =>{
      this.setState({infant:value})
    }
returnDate = () =>{
  this.setState({selectedIndex:1})
    this.setState({pick:'1'})
  this.setState({isShown:true})
}
pickdate = () =>{
  this.setState({pick:'0'})
  this.setState({isShown:true})
}
    from = () =>{
      this.setState({click:'0'})
      this.props.navigation.navigate('FromAirport')
    }
    to = () =>{
      this.setState({click:'1'})
      this.props.navigation.navigate('FromAirport')
    }
    render() {

        var timeColor;
        if (this.state.time == ""){
            timeColor = "grey"
        }else{
            timeColor = 'black'
        }

        var dateColor;
        if (this.state.date == ""){
            dateColor = "grey"
        }else{
            dateColor = 'black'
        }


        var to;
        if (this.state.toLocation == ""){
            to = "grey"
        }else{
            to = 'black'
        }

        var airports;
        if (this.state.airport == ""){
            airports = "grey"
        }else{
            airports = 'black'
        }

        var sdd;
        if (this.state.detail == ""){
            sdd = "grey"
        }else{
            sdd = 'black'
        }

        var dire;
        if (this.state.detail == ""){
            dire = "grey"
        }else{
            dire = 'black'
        }

        let { detail } = this.state;
        let { airport } = this.state;


        let classe = [{
            value: 'All',
        },
        {
            value: 'Economy',
        },
         {
            value: 'PremiumEconomy',
        },
        {
            value: 'Business',
        },
        {
            value: 'Premium Business',
        },
        {
            value: 'First',
        },

      ];
        let data = [{
            value: '1 ',
        },
        {
            value: '2',
        },
         {
            value: '3',
        },
        {
            value: '4',
        },
        {
            value: '5',
        },
        {
            value: '6',
        },
        {
            value: '7',
        },
        {
            value: '8',
        }
      ];
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
                    height:480,
               width:'90%',margin:'6%',marginLeft:'5%',borderRadius:18
               }}>
               <View style = {{marginTop:20,width:window.width- 50,alignSelf:'center',marginBottom:12}}>
               <SegmentedControl
    values={['One Way', 'Round Trip',"Multi City"]}
    selectedIndex={this.state.selectedIndex}
    onChange={(event) => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    }}
  />
  </View>
                   <View style = {{width:'90%',marginLeft:'5%'}}>




                   <View style = {{flexDirection:'row',width:'100%'}}>
                       <TouchableOpacity style = {{width:'100%'}}

                           onPress={() => this.from()}>
                       <View >


                           <TextField
                               label={'From'}
                               defaultValue={this.state.airport}
                               tintColor = 'grey'
                               editable={false}
                               baseColor={airports}


                           />

                       </View>

                       </TouchableOpacity>




                   </View>



                   <View style = {{flexDirection:'row',width:'100%'}}>
                       <TouchableOpacity style = {{width:'100%'}}

                           onPress={() => this.to()}>
                       <View >


                           <TextField
                               label={'To'}
                               defaultValue={this.state.toLocation}
                               tintColor = 'grey'
                               editable={false}
                               baseColor={airports}


                           />

                       </View>

                       </TouchableOpacity>




                   </View>




<View style = {{flexDirection:'row'}}>


<TouchableOpacity  style = {{width:'44%'}} onPress={() => this.pickdate()}

>

                           <View >

                               <TextField
                                   label={'Pickup Date'}
                                   defaultValue={this.state.date}
                                   editable={false}
                                   tintColor = 'grey'
                                   baseColor = {dateColor}

                               />

                           </View>

</TouchableOpacity>









<TouchableOpacity  style = {{width:'44%'}} onPress={() => this.returnDate()}

>
                           <View style = {{marginLeft:10}}>

                               <TextField
                                   label={'Return Date'}
                                   defaultValue={this.state.dropdate}
                                   editable={false}
                                   tintColor = 'grey'
                                   baseColor = {dateColor}

                               />

                           </View>
</TouchableOpacity>







     </View>
                       <View style = {{width:'90%',marginLeft:'0%'}}>

                       <Dropdown
                           rippleOpacity = {0.54}
                           dropdownPosition = {-4.2}
                           onChangeText ={ (value,index) => this.getIndex(index,value) }
                           itemTextStyle = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'red'}}
                           label='Travel Class'
                           data={classe}
                       />

                       </View>
<Text style = {{color:'grey',marginTop:20}}>
Number of Travellers
</Text>

<View style = {{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
<View style = {{width:'30%'}}>

<Dropdown
    rippleOpacity = {0.54}
    dropdownPosition = {-4.2}
    onChangeText ={ (value,index) => this.adult(value,index) }
    itemTextStyle = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'red'}}
    label='Adult'
    data={data}
/>
</View>

<View style = {{width:'30%'}}>

<Dropdown
    rippleOpacity = {0.54}
    dropdownPosition = {-4.2}
    onChangeText ={ (value,index) => this.child(value,index) }
    itemTextStyle = {{fontFamily:GLOBAL.heavy,fontSize:16,color:{dire}}}
    label='Child'
    data={data}
/>
</View>
<View style = {{width:'30%'}}>

<Dropdown
    rippleOpacity = {0.54}
    dropdownPosition = {-4.2}
        onChangeText ={ (value,index) => this.infant(value,index) }
    itemTextStyle = {{fontFamily:GLOBAL.heavy,fontSize:16,color:{dire}}}
    label='Infant'
    data={data}
/>
</View>



</View>

                   </View>


                   <Button buttonStyle={{backgroundColor:'#09304B',width:200,borderRadius:20,alignSelf:'center',marginTop:3}}
                           titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                           onPress={this.handleClick}
                       title="Search"
                   />
               </View>

                    <View style={{flexDirection:'row',margin:10,width:'100%',justifyContent:'space-between',marginTop:30}}>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:26,color:'black'}}>
                            Trending Tours


                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:14,color:'#333a4d',marginRight:20,marginTop:6}}>
                            View All


                        </Text>



                    </View>


                    <FlatList style = {{width:window.width,marginTop:8}}
                              data={this.state.package}
                              keyExtractor={this._keyExtractorss}
                              horizontal={true}
                              renderItem={this.renderRowItem1}
                    />

                    <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:26,color:'black',margin:20}}>
                        Blog


                    </Text>

                    <FlatList style = {{width:window.width,}}
                              data={this.state.blog}
                              keyExtractor={this._keyExtractorss}
                              horizontal={true}
                              renderItem={this.renderRowItem2}
                    />

                </KeyboardAwareScrollView>

                {this.state.isShown == true && (

                    <View style={{position:'absolute',backgroundColor:'rgba(0,0,0,0.7)',width:width,height:height}}>



                    <View style={{position:'absolute',width:window.width,height:620,bottom:0,backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>



                        <TouchableOpacity   onPress={() => this.setState({isShown:false})}

                        >
                        <View style={{flexDirection:'row',marginTop:16}}>
                            <Image source={require('./cross-black.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:13,resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.heavy,fontWeight:'bold',fontSize:18,color:'black',margin:20,marginTop:15}}>
                                Select date and time


                            </Text>


                        </View>
                        </TouchableOpacity>

                        <View style = {{width:window.width,height:1,backgroundColor:'#eaecef'}}>

                        </View>
                        <CalendarStrip

                            calendarAnimation={{type: 'sequence', duration: 30}}
                            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#51e270'}}
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



                    </View>
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
