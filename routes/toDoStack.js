import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ToDoHome from '../screens/toDoHome';
import Header from '../shared/header';

const screens = {
    ToDoHome : {
        screen : ToDoHome,
        navigationOptions : ({navigation})=>{
            return{
                headerTitle : ()=> <Header headerText={'My To Do'} navigation={navigation}/>,
            }
            
        }
    },
    // About : {
    //     screen : About,
    //     navigationOptions : {
    //         title : 'About To Do',
    //     }
    // },
}

const ToDoHomeStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerTintColor : '#444',
        headerStyle : {backgroundColor : '#eee',height : 60}
    }
});

export default ToDoHomeStack;