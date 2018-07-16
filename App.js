import firebase  from "firebase";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";

import RegisterScreens from "./src/screens";
import { store } from "./src/store";
import { LoadInitialTodos } from "./src/actions";

const StartApp = () => {

  const firebaseConf = {
    apiKey: "AIzaSyBTKdQZXxqL0BZBRDaMO5_LHYZYHfAmSjg",
    authDomain: "deneme-9d15f.firebaseapp.com",
    databaseURL: "https://deneme-9d15f.firebaseio.com",
    projectId: "deneme-9d15f",
    storageBucket: "deneme-9d15f.appspot.com",
    messagingSenderId: "593153011764"
  };
  firebase.initializeApp(firebaseConf);

  RegisterScreens(store, Provider);

  firebase.auth().onAuthStateChanged(user => {

    if(user){
      Navigation.startSingleScreenApp({
        screen:{
          screen: 'App.Application.HomeScreen'
        },
        appStyle:{
          navBarHidden: true
        }
      });
      store.dispatch(LoadInitialTodos());
    }else{
      Navigation.startSingleScreenApp({
        screen:{
          screen: 'App.Auth.LoginScreen'
        },
        appStyle:{
          navBarHidden: true
        }
      });
    }
  })

}

export default StartApp;