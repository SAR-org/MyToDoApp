import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ToDoHome from '../screens/toDoHome';
import Header from '../shared/header';
import ToDoItems from '../screens/toDoItems';

const screens = {
    ToDoHome : {
        screen : ToDoHome,
        navigationOptions : ({navigation})=>{
            return{
                headerTitle : ()=> <Header headerText={'My To Do'} navigation={navigation}/>,
            }
            
        }
    },
    ToDoItems : {
        screen : ToDoItems,
        navigationOptions : {
                title : 'To Do Items List',
            
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

export default createAppContainer(ToDoHomeStack);