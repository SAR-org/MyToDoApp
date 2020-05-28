import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class App extends React.Component {
  arr = [];
  id = 1;
  state = {
    text: '',
    todos: []
  }
  componentDidMount = () => {

    AsyncStorage.getItem('myToDoListItems').then((value) => {
      if (value != null) {
        this.setState({ todos: JSON.parse(value) });
      }

    });
  }
  
  addToDo = async () => {
    if(this.state.text  === '' || this.state.text ===null){
      Alert.alert(
        'Item Required',
        'Please add a TODO action!',
        [
           {text: 'OK',onPress: () => {}},
        ],
        { cancelable: false }
      )

    }else{
      this.arr.push({ id: this.id, item: this.state.text });
      this.id++;

      await AsyncStorage.setItem("myToDoListItems", JSON.stringify(this.arr));

      this.setState({ todos: JSON.parse(await AsyncStorage.getItem("myToDoListItems")) });
      this.setState({text : ''});
      this.toDoTextInput.clear();
      this.toDoTextInput.focus();
    }
    
  }

  deleteToDo = (id) => {

    var toDoList = this.state.todos;
    var newToDoList = toDoList.filter(toDo => toDo.id != id);

    this.arr = this.arr.filter(item => item.id != id);

    this.setState({ todos: newToDoList });

    AsyncStorage.setItem("myToDoListItems", JSON.stringify(newToDoList));

    this.toDoTextInput.clear();
  }



  renderToDoView = () => {
    var index = 0;
    return this.state.todos.map(toDoItem => {
      index++;
      return (
        <TouchableOpacity key={toDoItem.id} onPress={() => this.deleteToDo(toDoItem.id)}>
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>My To Do</Text>
          </View>
          <View style={styles.addTodoStyle}>
            <TextInput
              placeholder='add todo...'
              style={styles.inputStyle}
              value={this.state.text}
              onChangeText={(text) => this.setState({ text })}
              ref={(text) => { this.toDoTextInput = text; }} />

            <Button title='Add To Do' onPress={this.addToDo} />
          </View>

          <ScrollView>
            {this.renderToDoView()}
          </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerStyle: {
    paddingTop: 24,

  },
  headerText: {
    fontSize: 30,

  },
  inputStyle: {
    width: 300,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    margin: 15,
    borderRadius: 5
  },
  addTodoStyle: {
    paddingTop: 40
  },
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


export default App