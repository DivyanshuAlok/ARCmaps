import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert,Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
//import FlipView from 'react-native-flip-view';
//import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';
//import OptionGroup from 'react-native-optiongroup';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';
import notify from './notify';
import p50 from './pot50.png';
 
const GOOGLE_API_KEY = 'AIzaSyBpzF25xBS9YvMv5qWt9GFIREInf7dPdFM';
const USE_METHODS = false;

export default class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            origin: {latitude: 0, longitude: 0},
            destination: ' ',
            makArray: []
        }
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        var markArray = new Array();
            c = 0;
            var data = firebase.database().ref('/markers/').once('value', (snapshot) => {
            var stores = snapshot.val();
            //console.log(stores['count']['c']);
            var i=0;
            for(i=0; i < stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                //p = stores['m' + i]['obj']['pothole']
                //if(p == true){

                    markArray.push(<Marker coordinate = {loc} image={p50} key={i}/>);
                //}
            }
            this.setState({makArray : markArray})
        })
    }

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        return this.state.origin;
    }

        renderMarkers(){
            var markArray = new Array();
            //var locations = new Array();
            c = 0;
            var data = firebase.database().ref('/markers/').once('value', (snapshot) => {
            var stores = snapshot.val();
            //console.log(stores['count']['c']);
            var i=0;
            for(i=1; i <= stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                ///<MapView.Marker coordinate = {{latitude:loc.latitude,longitude:loc.longitude}}/>
                ///p = stores['m' + i]['obj']['pothole']
                //if(p == true){
                    markArray.push(<Marker coordinate = {loc}/>);
                //}
            }
            //Alert.alert('New pothole at:'+ loc.latitude)
            Alert.alert('New pothole at:'+JSON.stringify(loc.latitude)+','+JSON.stringify(loc.longitude) );

        })
        return markArray;
    }
    
    render()
    {
      return (
          <View style={Styles.appContainer}>
              {this.state.isNavigation ? null : (
                  <View style={Styles.appHeader}>
                      <Text style={Styles.inputLabel}>Where do you want to go?</Text>
                      <View style={Styles.inputContainer}>
                          <TextInput style={Styles.input} underlineColorAndroid="transparent" onChangeText={destination => {this.setState({destination}); this.setState({displayPath:false})}} value={this.state.destination}/>  
                          <TouchableOpacity style={Styles.button} onPress={()=>{this.setState({displayPath:true})}}>
                                <Image 
                                    style={Styles.logo1}
                                    source={require('./nav.png')}
                                />
                          </TouchableOpacity>
                            <View>
                            <TouchableOpacity onPress={()=> Actions.notify()}>
                                <Image
                                    style={Styles.logo}
                                    source={require('./notif.png')}
                                /> 
                                <Badge
                                    status="primary"
                                    containerStyle={{ top:-37,right:-10}}
                                />
                            </TouchableOpacity>
                            </View>
                      </View>
                  </View>
                )}
                <View style={{flex:1}}>
                    <MapView
                        ref={ref => this.refMap = ref}
                        provider={PROVIDER_GOOGLE}
                        style={Styles.map}
                        customMapStyle={MapStyles}
                        initialRegion={{
                            latitude: this.state.origin.latitude,
                            longitude: this.state.origin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        followUserLocation={true}                    
                    >
                        {this.renderMarkers()}
                        {this.state.displayPath ?<MapViewDirections
                            origin={this.getCurrentLocation()}
                            destination={this.state.destination}
                            strokeWidth={10}
                            strokeColor="royalblue"
                            apikey={"AIzaSyBpzF25xBS9YvMv5qWt9GFIREInf7dPdFM"}
                        />
                         : null }
                         {this.state.makArray}
                    </MapView>
                </View>
          </View>
        )
    }
}