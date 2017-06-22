import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage'
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-fb-login',
  templateUrl: 'src/pages/fbLogin/fbLogin.html'
})
export class FbLoginPage {
  FB_APP_ID: number = 882709248425470;

  constructor(public navCtrl: NavController, private NativeStorage: NativeStorage) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        Facebook.api("/me?fields=name,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            /*NativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender,
                picture: user.picture
              })
              .then(function(){
                nav.push(UserPage);
              }, function (error) {
                console.log(error);
              })*/
          })
      }, function(error){
        console.log(error);
      });
  }
}
