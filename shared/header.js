import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class Header extends React.Component{

    openMenu = ()=>{
        this.props.navigation.openDrawer();
    }
    render(){
        return (
           <View style={styles.header}>
               <MaterialIcons 
               name='menu' 
               size={28} 
               onPress={this.openMenu} 
               style={styles.icon}/>
               <Image 
                    source= {require('../assets/todo.png')} 
                    style={styles.headerImage}/>
               <View style={styles.headerTitle}>
                    
                            <Text 
                            style={styles.headerText}>{this.props.headerText}</Text>
               </View>
           </View> 
        );
    }
        
    
}

const styles = StyleSheet.create({
    header : {
        width : '100%',
        height : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        //backgroundColor : '#9DD3E4',
    },
    headerText : {
        fontWeight : 'bold',
        fontSize : 20,
        color : '#333',
        letterSpacing : 1,
    },
    icon : {
        position : 'absolute',
        left : 16,
    },
    headerImage : {
        width : 50,
        height : 50,
        marginHorizontal : 20,
    },
    headerTitle : {
        flexDirection : 'row',
    }
});

export default Header;