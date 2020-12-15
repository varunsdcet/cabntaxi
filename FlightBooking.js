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
import moment from 'moment';
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
export default class FlightBooking extends Component {
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
            detail:[],
            value:0,
            adult:[],
            child:[],
            infant:[],

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

handleuserData =() =>{
  const url = 'http://139.59.76.223/cab/webservices/get_members'

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
              alert(JSON.stringify(responseJson))
              this.setState({adult:responseJson.adult})
              this.setState({child:responseJson.child})
              this.setState({infant:responseJson.infant})

          }

      })
      .catch((error) => {
          console.error(error);
      });
}
    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.searchLocation})
        this.handleuserData()

    }

    handleClick = () =>{

      const url = 'http://139.59.76.223/cab/webservices/ticket_for_lcc'

      var ss = JSON.stringify({
          ResultIndex: this.props.navigation.state.params.ResultIndex,
          TokenId:GLOBAL.flighttoken,
          TraceId:GLOBAL.TraceId,
          user_id:GLOBAL.user_id


      })
      console.log(ss)

      fetch(url, {
          method: 'POST',
          headers: {
              'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
              'Content-Type': 'application/json',

          },
          body: JSON.stringify({
              ResultIndex: this.props.navigation.state.params.ResultIndex,
              TokenId:GLOBAL.flighttoken,
              TraceId:GLOBAL.TraceId,
              user_id:GLOBAL.user_id


          }),
      }).then((response) => response.json())
          .then((responseJson) => {
alert(JSON.stringify(responseJson))

              if (responseJson.status == true){


              }

          })
          .catch((error) => {
              console.error(error);
          });


        // GLOBAL.travellerusername = this.state.name
        // GLOBAL.travelleremail = this.state.email
        // GLOBAL.travellermobile = this.state.mobile
        // GLOBAL.baseAmount = GLOBAL.cab.airport.base_price
        //     GLOBAL.discount = this.state.discount
        // if (this.state.value == 0){
        //     GLOBAL.travellermobile = "Male"
        // }else{
        //     GLOBAL.travellermobile = "Female"
        // }

        // var values =  AsyncStorage.getItem('userID');
        // values.then((e)=>{
        //     if (e == '' || e == null ){
        //
        //         this.props.navigation.navigate('Register')
        //
        //     }else {
        //         GLOBAL.user_id = e;
        //         this.props.navigation.navigate('PaymentMode')
        //     }
        //
        // })



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
        this.handleuserData()
      console.log(JSON.stringify(this.props.navigation.state.params))
      this.setState({detail:this.props.navigation.state.params})
        this.setState({finalPrice:parseInt(this.props.navigation.state.params.Fare.PublishedFare)})

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
    changeIndexd = (index) => {

        let { adult } = this.state;
        for(let i = 0; i < adult.length; i++){
            adult[i].is_selected = '';
        }


        let targetPost = adult[index];

        // Flip the 'liked' property of the targetPost
        targetPost.is_selected = "Y";

        adult[index] = targetPost;


        const url = 'http://139.59.76.223/cab/webservices/toggle_select_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: targetPost.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true){
                this.handleuserData()

                }

            })
            .catch((error) => {
                console.error(error);
            });


            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property

            this.setState({ adult: adult})




    }
    changeIndexchild = (index) => {

        let { child } = this.state;
        for(let i = 0; i < child.length; i++){
            child[i].is_selected = '';
        }


        let targetPost = child[index];

        // Flip the 'liked' property of the targetPost
        targetPost.is_selected = "Y";

        child[index] = targetPost;

        const url = 'http://139.59.76.223/cab/webservices/toggle_select_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: targetPost.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true){
                this.handleuserData()

                }

            })
            .catch((error) => {
                console.error(error);
            });


            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property

            this.setState({ child: child})




    }
    changeIndexinfant = (index) => {

        let { infant } = this.state;
        for(let i = 0; i < infant.length; i++){
            infant[i].is_selected = '';
        }


        let targetPost = infant[index];

        // Flip the 'liked' property of the targetPost
        targetPost.is_selected = "Y";

        infant[index] = targetPost;


        const url = 'http://139.59.76.223/cab/webservices/toggle_select_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: targetPost.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true){
                this.handleuserData()

                }

            })
            .catch((error) => {
                console.error(error);
            });

            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property

            this.setState({ infant: infant})




    }
    renderRowItem10d = (itemData,index) => {
        return (

            <TouchableOpacity onPress={() => this.changeIndexd(itemData.index)}>

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
                            {itemData.item.firstname} -   {itemData.item.lastname}

                        </Text>



                    </View>



                </View>
            </TouchableOpacity>

        )
    }
    renderRowItem10dd = (itemData,index) => {
        return (

            <TouchableOpacity onPress={() => this.changeIndexchild(itemData.index)}>

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
                            {itemData.item.firstname} -   {itemData.item.lastname}

                        </Text>



                    </View>



                </View>
            </TouchableOpacity>

        )
    }
    renderRowItem10dds = (itemData,index) => {
        return (

            <TouchableOpacity onPress={() => this.changeIndexinfant(itemData.index)}>

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
                            {itemData.item.firstname} -   {itemData.item.lastname}

                        </Text>



                    </View>



                </View>
            </TouchableOpacity>

        )
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
    convertMinsToTime = (mins) => {
     let hours = Math.floor(mins / 60);
     let minutes = mins % 60;
     minutes = minutes < 10 ? '0' + minutes : minutes;
     return `${hours}hrs:${minutes}mins`;
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
      var fp = this.state.finalPrice
           var did = fp - parseInt(this.state.discount)

      var stop = []
      var d = ""
      var dt = ""
      var leng = 0
      var stp = ""
      var e = ""
      var es = ""
      var e1 = ""
      var es1 = ""
      var dte = ""

      if (this.state.detail != ""){
        stop = this.state.detail.Segments[0]
      for (var i = 0; i < stop.length;i++){
        d = stop[i].Destination.Airport.AirportCode
        dt = moment(stop[i].Destination.Airport.ArrTime).format('HH:mm:a')
        dte =  stop[i].Destination.Airport.AirportName
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
    }
     var t = parseInt(GLOBAL.flide.adultcount) +  parseInt(GLOBAL.flide.childcount) +  parseInt(GLOBAL.flide.infantcount)
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
                        {this.state.detail != "" && (
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'#09304B',marginTop:8,marginLeft:6,width:window.width-70}}>
                              {this.state.detail.Segments[0][0].Origin.Airport.AirportCode} - {this.state.detail.Segments[0][0].Destination.Airport.AirportCode}

                          </Text>
                        )}


                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#09304B',marginTop:2,marginLeft:6,width:window.width-70}}>
                          {moment(GLOBAL.flide.departure_date).format('DD-MMM')} {t} Travellers | {GLOBAL.flide.FlightCabinClass}

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
                   {this.state.detail != "" && (
                     <View style={{width:'100%',marginLeft:8,justifyContent:'space-between'}}>

                     <View style  = {{flexDirection:'row'}}>
                     {this.state.detail.Segments[0][0].Airline.AirlineName == "SpiceJet" && (
                       <Image source={require('./spice.png')}
                               style  = {{width:30, height:30,marginLeft:4,marginTop:3,resizeMode:'contain'
                               }}

                        />
                     )}
                     {this.state.detail.Segments[0][0].Airline.AirlineName == "Vistara" && (
                       <Image source={require('./vistara.png')}
                               style  = {{width:30, height:30,marginLeft:4,marginTop:3,resizeMode:'contain'
                               }}

                        />
                     )}
                     {this.state.detail.Segments[0][0].Airline.AirlineName == "Indigo" && (
                       <Image source={require('./indi.png')}
                               style  = {{width:30, height:30,marginLeft:4,marginTop:3,resizeMode:'contain'
                               }}

                        />
                     )}
                     {this.state.detail.Segments[0][0].Airline.AirlineName == "Air India" && (
                       <Image source={require('./airindia.png')}
                               style  = {{width:30, height:30,marginLeft:4,marginTop:3,resizeMode:'contain'
                               }}

                        />
                     )}
                     {this.state.detail.Segments[0][0].Airline.AirlineName == "GoAir" && (
                       <Image source={require('./goair.png')}
                               style  = {{width:30, height:30,marginLeft:4,marginTop:3,resizeMode:'contain'
                               }}

                        />
                     )}
                     <Text style={{ color: '#09304B', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:4,marginTop:12 }}>
                     {this.state.detail.Segments[0][0].Airline.AirlineName}
                     </Text>
                     </View>
                     <View style = {{marginTop:8,height:1,backgroundColor:'grey',width:'95%',marginTop:12,marginBottom:4}}>

                     </View>
                     <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                      <View style = {{}}>
                      <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,marginLeft:2 }}>
                      {this.state.detail.Segments[0][0].Origin.Airport.AirportCode}
                      </Text>
                      <Text style={{ color: 'orange', fontFamily:GLOBAL.roman, fontSize: 12,marginLeft:2 }}>
                     {moment(this.state.detail.Segments[0][0].Origin.DepTime).format('HH:mm:a')}
                      </Text>
                      <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 12,marginLeft:2,width:100 }}>
                      {this.state.detail.Segments[0][0].Origin.Airport.AirportName}
                      </Text>
                      <View>



                     </View>
                      </View>
                     <View>
                     <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 17,textAlign:'center',alignSelf:'center' }}>
                     {this.convertMinsToTime(this.state.detail.Segments[0][0].Duration)}
                     </Text>
                      <Image source={require('./cad.png')}
                             style  = {{width:100, height:20,marginLeft:0,marginTop:7,resizeMode:'contain'
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
                      <Text style={{ color: '#8396A4', fontFamily:GLOBAL.roman, fontSize: 12,marginLeft:7 }}>
                     {dte}
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



                        </View>

                   )}
                   <View style = {{marginTop:3,height:1,backgroundColor:'grey',width:'95%',marginTop:3,marginBottom:4,alignSelf:'center'}}>

                   </View>
                   <Text style={{ color: '#09304B', fontFamily:GLOBAL.heavy, fontSize: 12,marginLeft:7,marginTop:7 }}>
                   Fare Type | Ecnomy Basic
                   </Text>
                   {this.state.detail != "" && (
                     <View>
                     <Text style={{ color: '#8396A4', fontFamily:GLOBAL.heavy, fontSize: 12,marginLeft:7,marginTop:7 }}>
                    .Baggage - {this.state.detail.Segments[0][0].Baggage}
                     </Text>
                     <Text style={{ color: '#8396A4', fontFamily:GLOBAL.heavy, fontSize: 12,marginLeft:7,marginTop:7 }}>
                    .Cabin Baggage - {this.state.detail.Segments[0][0].CabinBaggage}
                     </Text>
                     <Text style={{ color: '#8396A4', fontFamily:GLOBAL.heavy, fontSize: 12,marginLeft:7,marginTop:7 }}>
                    .Base Fare - {this.state.detail.Fare.BaseFare}
                     </Text>
                     <Text style={{ color: '#8396A4', fontFamily:GLOBAL.heavy, fontSize: 12,marginLeft:7,marginTop:7 }}>
                    .Tax - {this.state.detail.Fare.Tax}
                     </Text>
                     </View>
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
                              Traveller Details

                          </Text>
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'#09304B',marginTop:12,marginLeft:16,width:window.width-140}}>
                              Adult (12 yrs +)

                          </Text>

                          <FlatList style = {{width:window.width}}
                                    data={this.state.adult}
                                    keyExtractor={this._keyExtractorss}
                                    horizontal={false}
                                    renderItem={this.renderRowItem10d}
                                    numColumns={1}
                          />
<TouchableOpacity onPress={() =>this.props.navigation.navigate('AddTravel',"1")}>
                          <View style = {{height:50,borderRadius:12,width:'90%',alignSelf:'center'}}>
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:12,color:'#09304B',marginTop:12,marginLeft:16,textAlign:'center',backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 1,
    shadowOpacity: 1.0}}>
                              + ADD ADULT TRAVELLER

                          </Text>

                          </View>
</TouchableOpacity>
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'#09304B',marginTop:12,marginLeft:16,width:window.width-140}}>
                              CHILD (2 - 12 Yrs)

                          </Text>

                          <FlatList style = {{width:window.width}}
                                    data={this.state.child}
                                    keyExtractor={this._keyExtractorss}
                                    horizontal={false}
                                    renderItem={this.renderRowItem10dd}
                                    numColumns={1}
                          />
<TouchableOpacity onPress={() =>this.props.navigation.navigate('AddTravel',"2")}>
                          <View style = {{height:50,borderRadius:12,width:'90%',alignSelf:'center'}}>
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:12,color:'#09304B',marginTop:12,marginLeft:16,textAlign:'center',backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 1,
    shadowOpacity: 1.0}}>
                              + ADD CHILD TRAVELLER

                          </Text>

                          </View>
                          </TouchableOpacity>


                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:17,color:'#09304B',marginTop:12,marginLeft:16,width:window.width-140}}>
                              INFANT (2 Yrs)

                          </Text>

                          <FlatList style = {{width:window.width}}
                                    data={this.state.infant}
                                    keyExtractor={this._keyExtractorss}
                                    horizontal={false}
                                    renderItem={this.renderRowItem10dds}
                                    numColumns={1}
                          />
<TouchableOpacity onPress={() =>this.props.navigation.navigate('AddTravel',"3")}>
                          <View style = {{height:50,borderRadius:12,width:'90%',alignSelf:'center'}}>
                          <Text style = {{fontFamily:GLOBAL.heavy,fontSize:12,color:'#09304B',marginTop:12,marginLeft:16,textAlign:'center',backgroundColor: 'white',
                          borderRadius: 10,
                          padding: 12,
                          shadowColor: '#000000',
                          shadowOffset: {
                          width: 0,
                          height: 3
                          },
                          shadowRadius: 1,
                          shadowOpacity: 1.0}}>
                              + ADD INFANT TRAVELLER

                          </Text>

                          </View>
                          </TouchableOpacity>


                      </View>


                                           <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,height:150, borderRadius:6,marginTop:20,shadowColor: '#000',
                                              shadowOffset: { width: 0, height: 1 },
                                              shadowOpacity: 0.6,
                                              shadowRadius: 2,
                                              elevation: 5 }}>

                                               <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                                                        Price

                                                   </Text>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#FBD303',marginTop:12,marginRight:16}}>
                                                     RS  {fp}

                                                   </Text>

                                               </View>

                                               <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                                                       Discount

                                                   </Text>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:12,marginRight:16}}>
                                                       RS  {this.state.discount}

                                                   </Text>

                                               </View>

                                               <View style={{width:'100%',backgroundColor:'#efefe4',height:1,marginTop:4}}>

                                               </View>

                                               <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                                                    Total   Price

                                                   </Text>

                                                   <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'black',marginTop:12,marginRight:16}}>
                                                       RS  {did}

                                                   </Text>

                                               </View>

                                          </View>




                                        <Text style = {{height:150}}>

                                        </Text>
               </KeyboardAwareScrollView>

               <View style = {{position:'absolute',bottom:100,height:100,backgroundColor:'#FBD303',width:'100%'}}>

                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                       <View>

                           <Text style = {{fontFamily:GLOBAL.heavy,fontSize:24,color:'#09304B',marginTop:18,marginLeft:16,width:window.width-140}}>
                               Rs {did}

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
