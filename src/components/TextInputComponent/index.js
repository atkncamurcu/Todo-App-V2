import React from "react";
import { Image, TextInput, View } from 'react-native';

interface DoTextProps {
    autoCapitalize?: 'none' | 'words' | 'sentences',
    autoCorrect?: boolean,
    color?: string,
    KeyboardType?: string,
    label?: string,
    leftIcon?: object,
    onChangeText?: Function,
    placeholder?: string,
    returnKeyType?: string,
    secureTextEntry?: boolean,
    value?: string,
}

export class DoTextInput extends React.Component<DoTextProps>{

    static defaultProps = {
        color: 'rgb(255, 255, 255)',
        autoCorrect: false,
        KeyboardType: undefined,
        label: undefined,
        onChangeText: () => null,
        placeholder: 'Password',
        returnKeyType: 'send',
        value: null,
    }

    render(){
        return(
            <View style={{ alignItems: 'stretch', width: '100%' }}>
                {this.props.label &&
                    <View>
                        <Text>{this.props.label}</Text>
                    </View>
                }
                <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                    { this.props.leftIcon && <Image source={this.props.leftIcon} style={{ height: 20, marginRight: 20, resizeMode: 'contain', width: 20 }}/>}
                    <TextInput
                        KeyboardType = {this.props.KeyboardType}
                        autoCapitalize={this.props.autoCapitalize}
                        autoCorrect={this.props.autoCorrect}
                        onChangeText={e => this.props.onChangeText(e)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#ef32d9'
                        returnKeyType={this.props.returnKeyType}
                        secureTextEntry={this.props.secureTextEntry}
                        value={this.props.value}
                        style={this.style.textInput}
                    />
                </View>
                <View style={{ backgroundColor: 'white', height: 1, width: '100%' }}/>
            </View>
        );
    }
    style={
        textInput: {
            color: this.props.color,
            flex: 1,
            height: 40,
            backgroundColor: 'transparent',
            paddingHorizontal: 5,
            marginVertical: 10,
            width: '100%'
        }
    }
}