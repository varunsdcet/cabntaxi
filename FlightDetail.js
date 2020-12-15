import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    AsyncStorage,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');
import moment from 'moment';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Airport from "./Airport";
import Splash from "./Splash";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');

const { width, height } = Dimensions.get('window');
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {Button} from "react-native-elements";
import CalendarStrip from "react-native-calendar-strip";
import TimePicker from "react-native-simple-time-picker";
var aprice = 0;
var bprice = 0;
var cprice = 0;
type Props = {};
export default class FlightDetail extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            lat:'',
            long:'',
            date:'',
            discount:0,
            flight:[],
            checked:false,
            partial:false,
            full:false,
            offer:[],
            debit:false,
            credit:false,
            wallet:false,
            isShown:false,
            finalPrice:0,
            detail:[],


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
     convertMinsToTime = (mins) => {
      let hours = Math.floor(mins / 60);
      let minutes = mins % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}hrs:${minutes}mins`;
    }
    changeIndex = (index) => {

        var discount = this.state.offer[index].type
        if (discount == "Fixed"){
            this.setState({discount:this.state.offer[index].amount })
        }else{
            var fp = this.state.finalPrice + parseInt(GLOBAL.package.price)
            var amount = parseInt(this.state.offer[index].amount)
            var s = fp * amount/100

            if(s > parseInt(this.state.offer[index].upto_amount)){
                this.setState({discount:this.state.offer[index].upto_amount })
            }else{
                var k = parseInt(this.state.offer[index].upto_amount) - s

                this.setState({discount:this.state.offer[index].k })
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

    renderRowItem1 = (itemData,index) => {


var stop = itemData.item.Segments[0]
var d = ""
var dt = ""
var leng = 0
var stp = ""
var e = ""
var es = ""
var e1 = ""
var es1 = ""
for (var i = 0; i < stop.length;i++){
  d = stop[i].Destination.Airport.AirportCode
  dt = moment(stop[i].Destination.Airport.ArrTime).format('HH:mm:a')
     if (stop[i].hasOwnProperty("Destination")){
       leng = leng + 1
     }


}

if (leng == 2){
    e = stop[0].Destination.Airport.AirportCode
    es = moment(stop[0].Destination.Airport.ArrTime).format('HH:mm:a')
}
if (leng == 3){
    e = stop[0].Destination.Airport.AirportCode
    es = moment(stop[0].Destination.Airport.ArrTime).format('HH:mm:a')
}

leng = leng - 1



        return (
  <TouchableOpacity onPress={() =>this.props.navigation.navigate('FlightBooking',itemData.item)}>
            <View style = {{width:'100%',marginTop:10}}>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
 <View style = {{}}>
 <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:12 }}>
 {itemData.item.Segments[0][0].Origin.Airport.AirportCode}
 </Text>
 <Text style={{ color: 'orange', fontFamily:GLOBAL.roman, fontSize: 12,marginLeft:12 }}>
{moment(itemData.item.Segments[0][0].Origin.DepTime).format('HH:mm:a')}
 </Text>
 <View>



</View>
 </View>
<View>
<Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,textAlign:'center',alignSelf:'center' }}>
{this.convertMinsToTime(itemData.item.Segments[0][0].Duration)}
</Text>
 <Image source={require('./cad.png')}
        style  = {{width:140, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
        }}

 />

 </View>
 <View style = {{}}>

 <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:7 }}>
 {d}
 </Text>
 <Text style={{ color: 'orange', fontFamily:GLOBAL.roman, fontSize: 12,marginLeft:7 }}>
{dt}
 </Text>
 <View>



</View>
 </View>

 </View>
 {leng != 0 && (
   <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:7,alignSelf:'center',textAlign:'center' }}>
   {leng} Stops
   </Text>
 )}
 {leng == 0 && (
   <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:7,alignSelf:'center',textAlign:'center' }}>
   NonStops
   </Text>
 )}

 {e != "" && (
<View style = {{alignSelf:'center'}}>
<Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:7,alignSelf:'center',textAlign:'center' }}>
{e}
</Text>

</View>
)}
{e1 != "" && (
<View style = {{alignSelf:'center'}}>
<Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:7,alignSelf:'center',textAlign:'center' }}>
{e1} at {es1}
</Text>

</View>
)}
 <View style = {{marginTop:8,height:1,backgroundColor:'#f1f1f1',width:'100%'}}>

 </View>


<View style = {{marginTop:12,flexDirection:'row',justifyContent:'space-between'}}>
<View style  = {{flexDirection:'row'}}>
{itemData.item.Segments[0][0].Airline.AirlineName == "SpiceJet" && (
  <Image source={require('./spice.png')}
          style  = {{width:20, height:20,marginLeft:20,marginTop:0,resizeMode:'contain'
          }}

   />
)}
{itemData.item.Segments[0][0].Airline.AirlineName == "Vistara" && (
  <Image source={require('./vistara.png')}
          style  = {{width:20, height:20,marginLeft:20,marginTop:0,resizeMode:'contain'
          }}

   />
)}
{itemData.item.Segments[0][0].Airline.AirlineName == "Indigo" && (
  <Image source={require('./indi.png')}
          style  = {{width:20, height:20,marginLeft:20,marginTop:0,resizeMode:'contain'
          }}

   />
)}
{itemData.item.Segments[0][0].Airline.AirlineName == "Air India" && (
  <Image source={require('./airindia.png')}
          style  = {{width:20, height:20,marginLeft:20,marginTop:0,resizeMode:'contain'
          }}

   />
)}
{itemData.item.Segments[0][0].Airline.AirlineName == "GoAir" && (
  <Image source={require('./goair.png')}
          style  = {{width:20, height:20,marginLeft:20,marginTop:0,resizeMode:'contain'
          }}

   />
)}
<Text style={{ color: '#09304B', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:4,marginTop:3 }}>
{itemData.item.Segments[0][0].Airline.AirlineName}
</Text>
</View>
<Text style={{ color: 'black', fontFamily:GLOBAL.roman, fontSize: 17,marginRight:12 }}>
₹{itemData.item.Fare.PublishedFare}
</Text>

</View>

<View style = {{marginTop:8,height:1,backgroundColor:'black',width:'100%'}}>

</View>


            </View>
</TouchableOpacity>
        )
    }

    handleClick= () => {

        if (GLOBAL.searchLocation == ''){
            alert('Please enter Pickup location')
            return
        }

        if (GLOBAL.date == ''){
            alert('Please Select Date')
            return
        }


        GLOBAL.discount = this.state.discount
        GLOBAL.adult = this.state.adult
        GLOBAL.child = this.state.child
        GLOBAL.senior = this.state.senior
        var fp = this.state.finalPrice + parseInt(GLOBAL.package.price)

        GLOBAL.baseAmount = fp
    GLOBAL.type = "Package"
        GLOBAL.package_id = GLOBAL.package.package_id

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

    pay = () => {
        var ad = parseInt(GLOBAL.package.adults)

        var a = this.state.adult - parseInt(GLOBAL.package.adults)
        var b = this.state.child - parseInt(GLOBAL.package.childs)
        var c = this.state.senior - parseInt(GLOBAL.package.seniors)


        if (a > 0){
            aprice = parseInt(GLOBAL.package.base_price_adult) * a

        }

        if (b > 0){
            bprice = parseInt(GLOBAL.package.base_price_child) * b
        }

        if (c > 0){
            cprice = parseInt(GLOBAL.package.base_price_senior) * c
        }

        var fin = aprice + bprice + cprice
        this.setState({finalPrice:fin})
    }

    change = (minus,type ) => {

        if (type == "adult"){
            if  (minus == "minus"){
                if (this.state.adult == 0){

                }else{

                    var a = this.state.adult - 1
                    this.setState({adult:a})

                }

            }else{
                var a = this.state.adult + 1
                this.setState({adult:a})

            }

        }else if  (type == "child"){
            if  (minus == "minus"){
                if (this.state.child == 0){


                }else{
                    var a = this.state.child - 1
                    this.setState({child:a})

                }

            }else{
                var a = this.state.child + 1
                this.setState({child:a})

            }

        }else{
            if  (minus == "minus"){
                if (this.state.senior == 0){


                }else{
                    var a = this.state.senior - 1
                    this.setState({senior:a})

                }

            }else{
                var a = this.state.senior + 1
                this.setState({senior:a})

            }
        }

        this.timeoutCheck = setTimeout(() => {
            this.pay();
        }, 200);

    }

    handleClickss= () => {
        this.setState({isShown:false})
        this.setState({date:GLOBAL.date})
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
                   // this.setState({location:responseJson.address})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);

            });

    }

    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.toLocation})

    }

    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s

    }
    componentDidMount(){
    //alert(JSON.stringify(this.props.navigation.state.params.TraceId))
      GLOBAL.TraceId = this.props.navigation.state.params.TraceId
    this.setState({detail:this.props.navigation.state.params})
    this.setState({flight:this.props.navigation.state.params.Results[0]})




      //  this.props.navigation.addListener('willFocus', this._handleStateChange);
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
var fp = this.state.finalPrice + parseInt(GLOBAL.package.price)
     var did = fp - parseInt(this.state.discount)
     var t = parseInt(GLOBAL.flide.adultcount) +  parseInt(GLOBAL.flide.childcount) +  parseInt(GLOBAL.flide.infantcount)


        return (
            <View style={{backgroundColor:Colors.background}}>

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'#FBD303'}} />

                <View style={{width:window.width,height:70,backgroundColor:'#FBD303'}}>

                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>
<View >
                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:18,color:'#09304B',marginTop:2,marginLeft:6,width:window.width-70}}>
                            {this.state.detail.Origin} -   {this.state.detail.Destination}

                        </Text>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#09304B',marginTop:2,marginLeft:6,width:window.width-70}}>
                          {moment(GLOBAL.flide.departure_date).format('DD-MMM')} {t} Travellers | {GLOBAL.flide.FlightCabinClass}

                        </Text>

                        </View>


                    </View>

                </View>



                <FlatList style = {{width:window.width}}
                          data={this.state.flight}
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
