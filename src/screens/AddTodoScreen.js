import React from "react";

import { View,TouchableOpacity,Image } from "react-native";
import { LoginButton,DoTextInput} from "../components";
import { AddTodo, OnAddTodoChange, OnChangeNewTodoDate } from "../actions";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {Calendar} from "react-native-calendars";
import {IMAGES} from "../assets";

import { styledDate } from "../helpers";


export class _AddTodoScreen extends React.Component{

    
    _onAddPress = () => {
        this.props.AddTodo({ text: this.props.todo.new_todo, label: '', date: this.props.todo.new_date});
        this.props.navigator.push({
            screen: 'App.Application.HomeScreen'
        });
    }

    _onBackPress = () => {
        this.props.navigator.push({
            screen:'App.Application.HomeScreen'
        })
    }

  
    _onDayPress = (day) => {
        this.props.OnChangeNewTodoDate(day.timestamp);
    }

    render(){

        
        const markedDays = {};
        markedDays[styledDate(this.props.todo.new_date)] = {
            selected: true,
            selectedColor: 'red'
        }
        
        console.log(this.props.todo.new_date)

        return(
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
                <LinearGradient  colors={['#ef32d9', '#9491ff', '#00c4ff','#00e7ff','#89fffd']}  style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}> 
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 15, width: '100%' }}>
                        <View style = {{alignItems: 'center',justifyContent:'center',flex:1,paddingHorizontal:15,width:'100%'}}>

                            <Calendar
                                onDayPress={(day) => { this._onDayPress(day) }}
                                markedDates={markedDays}
                            />
                        </View>
                        <DoTextInput
                            color='black'
                            placeholder='Enter Todo' 
                            autoCapitalize='none' 
                            value={this.props.todo.new_todo}
                            onChangeText={e => this.props.OnAddTodoChange(e)}
                        />
                        <LoginButton label='Add Todo' onPress={this._onAddPress}/>
                        <TouchableOpacity style={{position:'absolute',marginTop:20,backgroundColor:'transparent',width:30,height:30,alignItems:'center',justifyContent:'center',right:10,top:10}} onPress={this._onBackPress}>
                         <Image style={{ height: 30, resizeMode: 'contain', width: 30 }} source={IMAGES.close} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const mapStoreToProps = ({ todo }) => {
    return { todo: todo };
}
export const AddTodoScreen = connect(mapStoreToProps, { AddTodo, OnAddTodoChange, OnChangeNewTodoDate })(_AddTodoScreen);

