import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import CustomiseApp from '../screens/customiseApp';
import Header from '../shared/header';

const screens = {
    CustomiseApp : {
        screen : CustomiseApp,
        navigationOptions : ({navigation})=>{
            return{
                headerTitle : ()=> <Header headerText={'Customise your app'} navigation={navigation}/>,
            }
            
        }
    },
}

const CustomiseAppStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerTintColor : '#444',
        headerStyle : {backgroundColor : '#eee',height : 60}
    }
});

export default CustomiseAppStack;