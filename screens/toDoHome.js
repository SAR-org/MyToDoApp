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
import ListTodos from './listTodos';
import AddToDo from './addToDo'

class ToDoHome extends React.Component {
  headerArr = [];
  toDoListArr = [];
  headerId = 1;
  itemId = 1;
  state = {
    homecall : true,
    todosHeader: [],
    currentHeadeToDo : []
  }

  constructor(props) {
    super(props);
    this.inputTextField = React.createRef();
  }
  componentDidMount = () => {
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set load the header details from memory.
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('myToDoListItemsx').then((value) => {
        if (value != null) {
          this.setState({ todosHeader: JSON.parse(value) });
        }
  
      });
    });
  }

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  isItemAlreadyAvailable = (inputText)=>{
    var found = false;
    this.state.todosHeader.map(toDoItem=>{
      if(toDoItem.header.trim().toLowerCase() === inputText.trim().toLowerCase()){
        found = true;
      }
    });
    return found;
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

    } else{
      //console.warn('Item found validation returns==>>'+this.isItemAlreadyAvailable(inputText));
      if(this.isItemAlreadyAvailable(inputText)){
        Alert.alert(
          'Same Header',
          'Same header already available!',
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        )
      }else{
        var newHeadList = [];
        
        var newItemHead = [{ id: this.headerId, header: inputText, items : []}];
        if(this.state.todosHeader != null){
          newHeadList = [...newItemHead,...this.state.todosHeader];
        }else{
          newHeadList = newItemHead;
        }
        this.headerId++;
        await AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(newHeadList));

        this.setState({ todosHeader: JSON.parse(await AsyncStorage.getItem("myToDoListItemsx")) });

        this.inputTextField.current.handleInputTextAfterSubmission();
      }
        
    }

  }

  

  deleteToDo = (id) => {

    var toDoList = this.state.todosHeader;
    var newToDoList = toDoList.filter(toDo => toDo.id != id);

    this.setState({ todosHeader: newToDoList });

    AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(newToDoList));
  }

  showToDoItems = (itemId)=>{
    
    var currentToDoHeader = this.state.todosHeader.filter(toDoheader => toDoheader.id === itemId)[0];
    this.props.navigation.navigate('ToDoItems',
    {itemId:itemId});
    
  }

  addItemCallFromListingPage = ()=>{
    alert("testing this callback====>>>")
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AddToDo
            addToDo={this.addToDo}
            homeCall= {this.state.homecall}
            headerItemId = {null}
            ref={this.inputTextField} />
          
          <ScrollView>
            <ListTodos 
            todos={this.state.todosHeader} 
            deleteToDo={this.deleteToDo} 
            showToDoItems={this.showToDoItems}
            />
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


export default ToDoHome