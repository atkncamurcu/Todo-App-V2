import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { LoginButton } from "../components";
import {DoTextInput} from "../components";
import {IMAGES} from "../assets";

import { connect } from "react-redux";
import { OnRegisterEmailChange,OnRegisterRequest,OnRegisterPasswordChange,OnRegisterNameChange} from "../actions";
import LinearGradient from "react-native-linear-gradient";

export class _RegisterScreen extends React.Component{

    _onRegisterPress = () => {
        this.props.OnRegisterRequest(this.props.register.register_email, this.props.register.register_pass);
    }

    render(){
        return(
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
                <LinearGradient colors={['#ef32d9', '#9491ff', '#00c4ff','#00e7ff','#89fffd']} style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}> 
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, width: '100%' }}>
                        <View style={{ height: 150, paddingVertical: 20, marginBottom: 20, paddingHorizontal: 50, width: '100%' }}>
                            <Image source={ IMAGES.checkmark } style={{ width: '100%', resizeMode: 'contain', height: '100%' }} />
                        </View>
                        <DoTextInput
                            color='black'
                            KeyboardType='email-address'
                            leftIcon={IMAGES.email} 
                            placeholder='E-Mail' 
                            autoCapitalize='none' 
                            value={this.props.register.register_email}
                            onChangeText={e => this.props.OnRegisterEmailChange(e)}
                        /> 
                        <DoTextInput 
                            color='black'
                            leftIcon={IMAGES.password} 
                            placeholder='Password' 
                            autoCapitalize='none' 
                            secureTextEntry
                            value={this.props.register.register_pass}
                            onChangeText={e => this.props.OnRegisterPasswordChange(e)}

                        />
                        <DoTextInput 
                            color='black'
                            leftIcon={IMAGES.profile} 
                            placeholder='Name' 
                            autoCapitalize='none' 
                            value={this.props.register.register_name}
                            onChangeText={e => this.props.OnRegisterNameChange(e)}

                        />
                        
                        <TouchableOpacity style={{width:'100%',height:70,borderRadius:90,marginTop:50,backgroundColor:'rgba(0, 0, 0, 0.1)',justifyContent:'center'}} onPress={this.onRegisterPress} >
                            <Text style = {{textAlign:'center',fontSize:25,color:'black'}}> Create Account </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const mapStoreToProps = ({ register }) => {
    return { register: register };
}

export const RegisterScreen = connect(mapStoreToProps, { OnRegisterEmailChange, OnRegisterRequest, OnRegisterPasswordChange, OnRegisterNameChange })(_RegisterScreen);
