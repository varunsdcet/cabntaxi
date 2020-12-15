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
export default class BookingOption extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            lat:'',
            long:'',
            date:'',
            discount:0,
            checked:false,
            partial:false,
            full:false,
            offer:[],
            debit:false,
            credit:false,
            wallet:false,
            isShown:false,
            finalPrice:0,
            adult:parseInt(GLOBAL.package.adults),
            child:parseInt(GLOBAL.package.childs),
            senior:parseInt(GLOBAL.package.seniors)


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


        const url = 'http://139.59.76.223/cab/webservices/getoffer'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                type: '1',


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                 //  alert(JSON.stringify(responseJson))

                if (responseJson.status == true){
                    this.setState({offer:responseJson.offer})

                }

            })
            .catch((error) => {
                console.error(error);
            });


        var s =   this.props.navigation.state.params
     //   alert(JSON.stringify(s))
        this.setState({lat:GLOBAL.lat})
        this.setState({long:GLOBAL.long})

        this.props.navigation.addListener('willFocus', this._handleStateChange);
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

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8,marginLeft:6,width:window.width-70}}>
                            Booking Options

                        </Text>

                    </View>

                </View>



                <KeyboardAwareScrollView >

                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,marginBottom:1, borderRadius:6,marginTop:20,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.6,
                        shadowRadius: 2,
                        elevation: 5 }}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                            Pickup Location

                        </Text>

                        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>

                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'black',marginTop:4,marginLeft:16}}>
                                {this.state.location}

                            </Text>



                        </View>
                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('MapViewController')}>
                        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>

                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:17,color:'#FBD303',marginTop:4,marginLeft:16}}>
                                Edit

                            </Text>



                        </View>

                        </TouchableOpacity>
















                    </View>

                    <TouchableOpacity onPress={() =>this.setState({isShown:!this.state.isShown})}>
                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.6,
                        shadowRadius: 2,
                        elevation: 5 }}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                           Select  Date

                        </Text>

                        <View style={{flexDirection:'row',width:'100%'}}>




                            <Text style = {{width:'70%',fontFamily:GLOBAL.medium,fontSize:17,color:'black',marginTop:10,marginLeft:16}}>
                                {this.state.date}

                            </Text>


                        </View>







                    </View>
                    </TouchableOpacity>


                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10,height:200, borderRadius:6,marginTop:20,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.6,
                        shadowRadius: 2,
                        elevation: 5 }}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                           Select Quantity

                        </Text>


                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View>

                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                                   Adult

                                </Text>
                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:3,marginLeft:16,width:window.width-140}}>
                                    Rs {GLOBAL.package.base_price_adult}

                                </Text>

                            </View>


                            <View style = {{flexDirection:'row',marginRight:30,marginTop:20}}>

                                <TouchableOpacity onPress={() =>this.change('minus','adult')}>
                                    <Image source={require('./minus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>

                                <Text style = {{marginLeft:5,marginRight:5,fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:5}}>
                                    {this.state.adult}

                                </Text>

                                <TouchableOpacity onPress={() =>this.change('plus','adult')}>
                                    <Image source={require('./plus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View>

                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                                    Child (4-12)

                                </Text>
                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:3,marginLeft:16,width:window.width-140}}>
                                    Rs {GLOBAL.package.base_price_child}

                                </Text>

                            </View>


                            <View style = {{flexDirection:'row',marginRight:30,marginTop:20}}>

                                <TouchableOpacity onPress={() =>this.change('minus','child')}>
                                    <Image source={require('./minus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>

                                <Text style = {{marginLeft:5,marginRight:5,fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:5}}>
                                    {this.state.child}

                                </Text>

                                <TouchableOpacity onPress={() =>this.change('plus','child')}>
                                    <Image source={require('./plus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View>

                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:12,marginLeft:16,width:window.width-140}}>
                                    Senior (60+)

                                </Text>
                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:3,marginLeft:16,width:window.width-140}}>
                                    Rs {GLOBAL.package.base_price_senior}

                                </Text>

                            </View>


                            <View style = {{flexDirection:'row',marginRight:30,marginTop:20}}>

                                <TouchableOpacity onPress={() =>this.change('minus','senior')}>
                                    <Image source={require('./minus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>

                                <Text style = {{marginLeft:5,marginRight:5,fontFamily:GLOBAL.roman,fontSize:15,color:'black',marginTop:5}}>
                                    {this.state.senior}

                                </Text>

                                <TouchableOpacity onPress={() =>this.change('plus','senior')}>
                                    <Image source={require('./plus.png')}
                                           style  = {{width:20, height:20,marginTop:2,resizeMode:'contain'
                                           }}

                                    />
                                </TouchableOpacity>
                            </View>




                        </View>



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
                                  renderItem={this.renderRowItem1}
                                  numColumns={1}
                        />



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




                    <Button buttonStyle={{backgroundColor:'#FBD303',width:window.width -20,marginLeft:10,borderRadius:10,alignSelf:'center',marginTop:40}}
                            titleStyle={{fontFamily:GLOBAL.medium,fontSize:20}}
                            onPress={this.handleClick}
                            title="Pay"
                    />

                    <View style = {{height :100}}>

                    </View>



                </KeyboardAwareScrollView>
                {this.state.isShown == true && (
                    <View style={{position:'absolute',width:window.width,height:400,bottom:0,backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>



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

                        <View style = {{width:window.width,height:1,backgroundColor:'#333a4d'}}>

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



                        <Button buttonStyle={{backgroundColor:'#FBD303',width:window.width - 40,borderRadius:20,alignSelf:'center',marginTop:10}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                onPress={this.handleClickss}
                                title="CONFIRM"
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
    scene: {
        flex: 1,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
