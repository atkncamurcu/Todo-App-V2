import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface LoginButtonProps {
    label?: string,
    onPress?: Function
}



export class LoginButton extends React.Component <LoginButtonProps>{

    static defaultProps = {
        onPress: () => null,
    }
    
    render(){
        return(
            <TouchableOpacity style = {this.style.loginButton} 
              onPress={this.props.onPress}> 
                <Text style = {{textAlign:'center',fontSize:25}}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
    style={
        loginButton: {
            backgroundColor:'#ef32d9',
            marginTop:15,
            height:80,
            justifyContent:'center',
            width:'100%'
        }
    }
}
