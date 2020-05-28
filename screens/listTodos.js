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
            <TouchableOpacity key={toDoItem.id} onPress={() => this.props.deleteToDo(toDoItem.id)}>
              <View style={styles.listStyle}>
                <Text style={styles.indexStyle}>{index}</Text>
                <Text style={styles.itemStyle}
                >{toDoItem.item}</Text>
                <MaterialIcons
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
  itemStyle: {
    flex: 8,
  },
  indexStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 20,
  },
  buttonDoneStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default ListTodos;