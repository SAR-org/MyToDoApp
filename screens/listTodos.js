import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';


class ListTodos extends React.Component{

    render() {
        var index = 0;
        return this.props.todos.map(toDoItem => {
          index++;
          return (
            <TouchableOpacity key={index}>
              <View style={styles.listStyle}>
                <Text style={styles.indexStyle}>{index}</Text>
                <Text 
                style={styles.itemHeaderStyle}
                onPress={()=>this.props.showToDoItems(toDoItem.id)}>{toDoItem.header}</Text>
                <MaterialIcons
                  onPress={() => this.props.deleteToDo(toDoItem.id)}
                  name="done"
                  size={24}
                  color="green"
                  style={styles.buttonDoneStyle} />
              </View>
    
            </TouchableOpacity>
          );
    
        });
      }

}

const styles = StyleSheet.create({
    listStyle: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    marginHorizontal: 20
  },
  itemHeaderStyle: {
    flex: 8,
    fontSize : 15,
    fontWeight : "bold",
  },
  indexStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 20,
    fontSize : 15,
    fontWeight : "bold",
  },
  buttonDoneStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default ListTodos;