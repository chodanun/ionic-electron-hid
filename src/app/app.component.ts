import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// BARCODE READER
// declare var HID: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      this.init();
      
    });

    }

    init(){
      this.getData();
    }

    getData(){
      let device = getDevice();
      let productId = device.productId;
      let vendorId = device.vendorId;
      let barcode_reader = new HID.HID(vendorId,productId);

      barcode_reader.on("data", (data) => {
        // console.log(data);
        // console.log(data.toString('hex'));
        let string_data = this.hexToString(data);
        console.log(string_data);
        console.log(string_data.length);
      });
    }

    getDevice(){
      let devices = HID.devices();
      let device = devices.filter( device => {
        return device.serialNumber == "17161B2BEE"
      })[0];
      console.log(device);
      return device;
    }

    hexToString (data) {
      let string = '';
      let i ; // start byte -> 10
      let h ;
      let hex = data.toString('hex')
      for (i=10; i < hex.length; i += 2) {
        h = parseInt(hex.substr(i,2), 16);
        if (h == 13){ // carriage return number
          return string ;
        }
        string += String.fromCharCode(h);
      }
      return string;
    }
}

