import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import ListTodos from './screens/listTodos';
import AddToDo from './screens/addToDo'

class App extends React.Component {
  arr = [];
  id = 1;
  state = {
    todos: []
  }

  constructor(props) {
    super(props);
    this.inputTextField = React.createRef();
  }
  componentDidMount = () => {

    AsyncStorage.getItem('myToDoListItems').then((value) => {
      if (value != null) {
        this.setState({ todos: JSON.parse(value) });
      }

    });
  }

  addToDo = async (inputText) => {
    if (inputText === '' || inputText === null) {
      Alert.alert(
        'Item Required',
        'Please add a TODO action!',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false }
      )

    } else {
      this.arr.push({ id: this.id, item: inputText });
      this.id++;

      await AsyncStorage.setItem("myToDoListItems", JSON.stringify(this.arr));

      this.setState({ todos: JSON.parse(await AsyncStorage.getItem("myToDoListItems")) });

      this.inputTextField.current.handleInputTextAfterSubmission();
    }

  }

  deleteToDo = (id) => {

    var toDoList = this.state.todos;
    var newToDoList = toDoList.filter(toDo => toDo.id != id);

    this.arr = this.arr.filter(item => item.id != id);

    this.setState({ todos: newToDoList });

    AsyncStorage.setItem("myToDoListItems", JSON.stringify(newToDoList));
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AddToDo
            addToDo={this.addToDo}
            ref={this.inputTextField} />
          
          <ScrollView>
            <ListTodos todos={this.state.todos} deleteToDo={this.deleteToDo} />
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

});


export default App