import React from "react";

import uuid from "uuid";

import { Modal, Text, View, ScrollView ,TouchableOpacity,Image} from "react-native";
import {DeleteTodo, AddTodo, EditTodo, OnAddTodoChange,OnChangeNewTodoDate} from "../actions";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { DoTextInput,LoginButton} from "../components";
import {IMAGES} from "../assets";
import {Calendar} from "react-native-calendars";
import firebase from 'firebase';
import RadialGradient from 'react-native-radial-gradient'

import { styledDate } from "../helpers";

export class ModalClass extends React.Component{

    state = {
        todo: {},
        visible: false
    }

    showModal(todo){
        this.setState({ todo: todo, visible: true });
    }

    closeModal(){
        this.setState({ todo: {} ,visible: false });
    }

    _onTextChange = (e) => {
        this.setState({ todo: { ...this.state.todo, text: e } });
    }

    onEditPress = () => {
        this.props.onEditPress({ id: this.state.todo.id, label: '', text: this.state.todo.text, date: this.state.todo.date });
        this.closeModal();
    }

    _onDayPress = (day) => {
        this.setState({ todo: {...this.state.todo, date: day.timestamp}})
    }

    render(){
        
        const markedDays = {};
        markedDays[styledDate(this.state.todo.date)] = {
            selected: true,
            selectedColor: 'red'
        }
        
        return(
            <Modal visible={this.state.visible} transparent>
            <View style = {{backgroundColor: this.props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.6)',flex:1,alignItems:'center',height:'100%'}}>
                <View style={{ alignItems: 'center', justifyContent:'center', flex:1, paddingHorizontal:15,width:'100%'}}>
                    <TouchableOpacity style={{position:'absolute',marginTop:20,backgroundColor:'transparent',width:30,height:30,alignItems:'center',justifyContent:'center',right:10,top:10}} onPress={this.closeModal.bind(this)}>
                    <Image style={{ height: 40, resizeMode: 'contain', width: 40, marginTop:50}} source={IMAGES.close} />
                    </TouchableOpacity>
                        <Calendar
                            onDayPress={(day) => {this._onDayPress(day) }}       
                            markedDates={markedDays}
                        />


                    <DoTextInput 
                        placeholder='Enter Todo' 
                        autoCapitalize='none' 
                        value={this.state.todo.text}
                        onChangeText={e => this._onTextChange(e)}
                    />
                   <TouchableOpacity style={{width:'100%',height:70,borderRadius:90,marginTop:50,justifyContent:'center'}} onPress={this.onEditPress} >
                   <LinearGradient colors={['#89fffd', '#00e7ff', '#00e7ff','#9491ff','#ef32d9']}style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>        
                            <Text style = {{textAlign:'center',fontSize:25,color:'black'}}> Edit Todo </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        );
    }
}

export class _HomeScreen extends React.Component{

    state = {
        isModalVisible: false,
        isDeleteModel: false
    };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    
    _goAdd = () => {
        this.props.navigator.push({
            screen: 'App.Application.AddTodoScreen'
        });
    }

    _signOut = () => {
        
        firebase.auth().signOut;
        this.props.navigator.push({
            screen: 'App.Auth.LoginScreen'
        });

    }

    _renderTodoItems = items => {
        const renderedItems = [];

        items.map(item => {

            const _onDeletePress = () => {
                this.props.DeleteTodo(item.id);
                this._toggleModal;
            }

            const _onEditPress = (item) => {
                this._editModal.showModal(item);
            };

            renderedItems.push(
                <View key={uuid()} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }} >
                        
                        <View style={{flex:1,width:'100%'}}>
                        <Text style={{ color: 'rgb(255, 255, 255)' , flex: 1, marginTop:20}}>
                            { item.text }
                        </Text>
                        <View style={{ backgroundColor: 'white',height:1, width: '100%',flex:1 }}/>
                        </View>
                        <Text style={{ color: 'rgb(255, 255, 255)' , flex: 1, marginTop:20,marginLeft:20}}>
                            { styledDate(item.date) }
                        </Text>
                        
                        <TouchableOpacity style={{position:'relative',marginTop:20,backgroundColor:'red',width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={this._toggleModal} > 
                            <Text style={{}}>D</Text>
                        </TouchableOpacity>
                        <Modal visible={this.state.isModalVisible} transparent> 
                            <View style = {{backgroundColor: this.props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity style={{position:'absolute',marginTop:20,backgroundColor:'white',width:30,height:30,alignItems:'center',justifyContent:'center',right:10,top:10}} onPress={this._toggleModal}>
                                <Image style={{ height: 30, resizeMode: 'contain', width: 30 }} source={IMAGES.close} />
                            </TouchableOpacity>

                                <Text style = {{flex:1,top:200,width:'100%',color:'white',textAlign:'center',fontSize:25}}>Are you sure about that ? </Text>
                                <TouchableOpacity style={{position:'absolute',flex:1}} onPress={_onDeletePress}>
                                    <Text style = {{fontSize:45,backgroundColor:'red'}}> Delete </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <TouchableOpacity style={{position:'relative',marginTop:20,backgroundColor:'blue',width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={() => _onEditPress(item)}> 
                            <Text style={{}}>E</Text>
                        </TouchableOpacity>

                </View>

            );
        });

        return renderedItems;
    }

    render(){
        return(
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
                <ModalClass 
                    onTodoChange={this.props.OnAddTodoChange}
                    onEditPress={this.props.EditTodo}
                    OnChangeNewTodoDate = {this.props.OnChangeNewTodoDate}
                    ref={c => this._editModal = c}
                />
            <LinearGradient colors={['#ef32d9', '#9491ff', '#00c4ff','#00e7ff','#89fffd']}  style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}> 
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 15, width: '100%' }}>
                    <ScrollView style={{ flex: 1, width: '100%',marginTop:75 }}> 
                        { this._renderTodoItems(this.props.todo.todoList) }
                    </ScrollView>
                   
                    <TouchableOpacity style={{position:'absolute',backgroundColor:'#FE2E64',height:90,width:90,borderRadius:90,marginLeft:250,right:15,bottom:15,justifyContent:'center'}} onPress={this._goAdd}>
                    <Text style = {{textAlign:'center',fontSize:25}}> + </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.3)',height:60,width:60,top:10,right:15,justifyContent:'center',flex:1,width:'100%',marginTop:15,}} onPress={this._signOut}>
                    <Text style = {{textAlign:'center',fontSize:25}}> SignOut </Text>

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
export const HomeScreen = connect(mapStoreToProps, {EditTodo, DeleteTodo})(_HomeScreen);

