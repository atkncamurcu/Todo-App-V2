import React from "react";
import uuid from 'uuid';
import { View,TouchableOpacity,Image,ScrollView,Text } from "react-native";
import { LoginButton,DoTextInput} from "../components";
import { OnTodoListChange, AddTodoList, DeleteTodoList, UpdateTodoList } from "../actions";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {IMAGES} from "../assets";
import Modal from "react-native-modal";

export class _HomeScreen extends React.Component{

    state = {
        isListModel: false
    };

    openListModal = () => {
        if(!this.state.isListModel){
            this.setState({ isListModel: true });
        }
    }
    closeListModal = () => {
        if(this.state.isListModel){
            this.setState({ isListModel: false });
        }
    }

    //_toggleListModal = () => this.setState({ isListModel: !this.state.isListModel });

    _onTodoPress = () => {
        this.props.AddTodoList({ title: this.props.todolist.list_title});
    }

    _goHome= () => {
        this.props.navigator.push({
            screen: 'App.Application.TodoScreen',
        });
        
    }


    _renderTodoListItems = lists => {
        const renderedLists = [];
        let i = 0;
        lists.forEach(list => {

            const itemID = list.id
            console.log(itemID);
            const _onDeleteList = () => {
                console.log(itemID);
                this.props.DeleteTodoList(itemID);this.closeListModal();
            }
            const _onUpdateList = () => {
                this.props.UpdateTodoList({id: list.id, title: list.title});
            }

            const  _onChangeCurrentList= () => {
                this.props.navigator.push({
                    screen: 'App.Application.TodoScreen',
                    passProps: { todoID: itemID }
                });
               
            } 



            renderedLists.push(
                <View key={uuid()} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15, width: '100%' }} >
                    <View style={{flex:1,width:'100%'}}>
                        <Text style={{ color: 'rgb(255, 255, 255)' , flex: 1, paddingTop: 10 }}>
                            { list.title }
                        </Text>
                    </View>
                    <TouchableOpacity style={{position:'relative', backgroundColor:'red', width:30, height:30, alignItems:'center',justifyContent:'center'}} onPress={_onDeleteList} > 
                        <Text>D</Text>
                    </TouchableOpacity>
                    <Modal visible={this.state.isListModel} transparent> 
                        <View style = {{backgroundColor: this.props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity style={{position:'absolute',marginTop:20,backgroundColor:'transparent',width:30,height:30,alignItems:'center',justifyContent:'center',right:10,top:10}} onPress={this.closeListModal}>
                                <Image style={{ height: 30, resizeMode: 'contain', width: 30 }} source={IMAGES.close} />
                            </TouchableOpacity>
                            <Text style = {{flex:1,top:200,width:'100%',color:'white',textAlign:'center',fontSize:25}}>Are you sure about that ? </Text>
                            <TouchableOpacity style={{position:'absolute',flex:1}} onPress={_onDeleteList}>
                                <Text style = {{fontSize:45,backgroundColor:'red'}}> Delete </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <TouchableOpacity style={{position:'relative', backgroundColor:'blue', width:30, height:30, alignItems:'center', justifyContent:'center'}} onPress={_onUpdateList}> 
                        <Text style={{}}>E</Text>
                    </TouchableOpacity> 
                    
                    <TouchableOpacity style={{position:'relative', backgroundColor:'yellow', width:30, height:30, alignItems:'center', justifyContent:'center'}} onPress={_onChangeCurrentList}> 
                        <Text style={{}}>C</Text>
                    </TouchableOpacity> 
                </View>
            );
            if(i != lists.length - 1){
                renderedLists.push(<View key={uuid()} style={{ backgroundColor: 'white', height:1, marginVertical: 8, marginHorizontal: 15, flex:1 }}/>)
            }
            i++;
        });
        
        return renderedLists;
    }



    render(){
        return(
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
                <LinearGradient  colors={['#ef32d9', '#9491ff', '#00c4ff','#00e7ff','#89fffd']}  style={{alignItems: 'center', flex: 1, justifyContent: 'center', width: '100%' }}> 
                <ScrollView style={{ flex: 1, width: '100%',marginTop:50 }}> 
                        { this._renderTodoListItems(this.props.todolist.todoLists) }
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 15, width: '100%' }}>
                        <View style = {{alignItems: 'center',justifyContent:'center',flex:1,paddingHorizontal:15,width:'100%'}}>
                        </View>
                        <DoTextInput
                            color='black'
                            placeholder='Enter List Name' 
                            autoCapitalize='none' 
                            value={this.props.todolist.list_title}
                            onChangeText={e => this.props.OnTodoListChange(e)}
                        />
                        <LoginButton label='Add List' onPress={this._onTodoPress}/>
                    </View>
                  
                </LinearGradient>
            </View>
        );
    }
}

const mapStoreToProps = ({ todolist }) => {
    return { todolist: todolist};
}
export const HomeScreen = connect(mapStoreToProps, { OnTodoListChange,AddTodoList,DeleteTodoList,UpdateTodoList})(_HomeScreen);

