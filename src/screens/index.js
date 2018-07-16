import { Navigation } from "react-native-navigation";

import { LoginScreen } from "./LoginScreen";
import { HomeScreen } from "./HomeScreen";
import { RegisterScreen } from "./RegisterScreen";
import { AddTodoScreen } from "./AddTodoScreen";

const RegisterScreens = (store, provider) => {
    Navigation.registerComponent('App.Auth.LoginScreen', () => LoginScreen, store, provider);
    Navigation.registerComponent('App.Application.HomeScreen', () => HomeScreen, store, provider);
    Navigation.registerComponent('App.Auth.RegisterScreen', () => RegisterScreen, store,provider);
    Navigation.registerComponent('App.Application.AddTodoScreen', () => AddTodoScreen,store,provider);
} 

export default RegisterScreens;