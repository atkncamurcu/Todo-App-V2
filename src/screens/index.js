import { Navigation } from "react-native-navigation";

import { LoginScreen } from "./LoginScreen";
import { TodoScreen } from "./TodoScreen";
import { RegisterScreen } from "./RegisterScreen";
import { AddTodoScreen } from "./AddTodoScreen";
import { HomeScreen } from "./HomeScreen";

const RegisterScreens = (store, provider) => {
    Navigation.registerComponent('App.Auth.LoginScreen', () => LoginScreen, store, provider);
    Navigation.registerComponent('App.Application.TodoScreen', () => TodoScreen, store, provider);
    Navigation.registerComponent('App.Auth.RegisterScreen', () => RegisterScreen, store,provider);
    Navigation.registerComponent('App.Application.AddTodoScreen', () => AddTodoScreen,store,provider);
    Navigation.registerComponent('App.Application.HomeScreen', () => HomeScreen,store,provider);
} 

export default RegisterScreens;