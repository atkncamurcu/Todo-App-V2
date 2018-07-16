import React from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";

import { LoginButton,DoTextInput } from "../components";
import {IMAGES} from "../assets";

import { connect } from "react-redux";
import { OnEmailChange,OnLoginRequest,OnPasswordChange} from "../actions";
import LinearGradient from "react-native-linear-gradient";


class _LoginScreen extends React.Component{


    _onPress = () => {
        this.props.OnLoginRequest(this.props.login.login_email, this.props.login.login_pass);
    }

    sendRegister = () => {
        this.props.navigator.push({
            screen: 'App.Auth.RegisterScreen'
        });
    }


   


    render(){
        return(
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
                <LinearGradient colors={['#ef32d9', '#9491ff', '#00c4ff','#00e7ff','#89fffd']}style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}> 
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, width: '100%' }}>
                        <View style={{ height: 150, paddingVertical: 20, marginBottom: 25, paddingHorizontal: 50, width: '100%' }}>
                            <Image source={ IMAGES.checkmark } style={{ width: '100%', resizeMode: 'contain', height: '100%' }} />
                        </View>
                        <DoTextInput
                            color='black'
                            leftIcon={IMAGES.email} 
                            placeholder='E-Mail' 
                            autoCapitalize='none' 
                            value={this.props.login.login_email}
                            onChangeText={e => this.props.OnEmailChange(e)}
                        /> 
                        <DoTextInput
                            color='black'
                            leftIcon={IMAGES.password} 
                            placeholder='Şifre' 
                            autoCapitalize='none' 
                            secureTextEntry
                            value={this.props.login.login_pass}
                            onChangeText={e => this.props.OnPasswordChange(e)}

                        /> 
                        <TouchableOpacity style={{width:'100%',height:70,borderRadius:90,marginTop:50,backgroundColor:'rgba(0, 0, 0, 0.1)',justifyContent:'center'}} onPress={this._onPress} >
                            <Text style = {{textAlign:'center',fontSize:25,color:'black'}}> Sign In </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{justifyContent:'center',marginTop:50}} onPress={this.sendRegister}>
                            <Text style = {{textAlign:'center',fontSize:12}}> Dont have an account? Register now!  </Text>>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}


const mapStoreToProps = ({ login }) => {
    return { login: login };
}
export const LoginScreen = connect(mapStoreToProps, { OnEmailChange, OnLoginRequest, OnPasswordChange })(_LoginScreen);


