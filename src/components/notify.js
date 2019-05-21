import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';

 
const GOOGLE_API_KEY = 'AIzaSyAdf-ZOJMrnQtZt-VPP7ZhEPvIi3pU16NM';
const USE_METHODS = false;


export default class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arr: [],
            arr2:[]
        }
    }

    componentWillMount(){
            var markArray = new Array();
            var latit = new Array();
            var longi=new Array();
            c = 0;
            var data = firebase.database().ref('/markers/').once('value', (snapshot) => {
            var stores = snapshot.val();
            //console.log(stores['count']['c']);
            var i=0;
            for(i=1; i <= stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                latit.push(JSON.stringify(loc.latitude));
                latit.push(',');
                latit.push(JSON.stringify(loc.longitude));
                latit.push('                                                    ');
            }
            this.setState({arr: latit})
            //this.setState({arr2: longi})
            //return this.state.arr;
            console.log(arr);
            //Alert.alert('New pothole at:'+JSON.stringify(loc.latitude)+','+JSON.stringify(loc.longitude) );

        })
    }

    render()
    {   var com=new Array();
        //var com1=new Array();
        //var i=0;
        com=this.state.arr;
        //com1=this.state.arr2;
      return (  
          <View>
              <Text>{com}</Text>

             
          </View>
        )

    }
}


