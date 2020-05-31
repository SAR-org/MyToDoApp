import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import ToDoListing from './toDoListing';

class ToDoItems extends React.Component {
  headId = '';
  state = {
    image: null,
    text: '',
    homecall: false,
    homeParams: '',
    headerItemId: '',
    toDoItemList: [],
    displayToDoItemList: [],
    sample: '',
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ headerItemId: params.itemId });
    this.setState({ homeParams: params });
    this.headId = params.itemId;

    var todosHeader = [];
    todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
    var currentToDoHeader = todosHeader
      .filter(toDoheader => toDoheader.id === this.state.headerItemId)[0];

    this.setState({ displayToDoItemList: currentToDoHeader.items });
    this.setState({ disPlayToDoHead: currentToDoHeader });
    this.changeTitleText(currentToDoHeader.header);

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('backgroundImageUri').then((value) => {
        this.setState({ image: value });

      });
    });
  }

  changeTitleText = (headerName) => {

    var that = this;
    that.props.navigation.setParams({
      Title: 'To Do : ' + headerName
    });

  }

  isItemAlreadyAvailable = (inputText, items) => {
    var found = false;
    items.map(toDoItem => {
      if (toDoItem.listItem.trim().toLowerCase() === inputText.trim().toLowerCase()) {
        found = true;
      }
    });
    return found;
  }

  async addToDoItems(itemId, inputText) {
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
      var todosHeader = [];
      todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
      var currentToDoHeader = todosHeader.filter(toDoheader => toDoheader.id === itemId)[0];
      if (this.isItemAlreadyAvailable(inputText, currentToDoHeader.items)) {
        Alert.alert(
          'Same Item',
          'Same TO DO item already available in this listing!',
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        )
      } else {
        var testId = currentToDoHeader.items.length;
        testId++;

        var newItem = [{ listId: testId, listItem: inputText }];

        var valueMergedItems = [...newItem, ...currentToDoHeader.items];

        currentToDoHeader.items = valueMergedItems;
        var newToDoHeader = todosHeader.filter(toDoHeader => toDoHeader.id != itemId);

        var newHeadervalue = [];
        newHeadervalue.push(currentToDoHeader);
        newHeadervalue = [...newHeadervalue, ...newToDoHeader];
        await AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(newHeadervalue));

        this.setState({ displayToDoItemList: currentToDoHeader.items });

        this.clearInput();
      }

    }



  }

  deleteToDoItem = async (headerId, itemId) => {
    var todosHeader = [];
    todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
    var currentToDoHeader = todosHeader
      .filter(toDoheader => toDoheader.id === headerId)[0];


    var toDoItems = currentToDoHeader.items;
    var filteredToDoItems = toDoItems.filter(toDoItem => toDoItem.listId != itemId);

    currentToDoHeader.items = filteredToDoItems;

    var notAffectedToDoHeader = todosHeader.filter(toDoHeader => toDoHeader.id != headerId);

    var updatedHeadervalue = [];
    updatedHeadervalue.push(currentToDoHeader);
    updatedHeadervalue = [...updatedHeadervalue, ...notAffectedToDoHeader];

    await AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(updatedHeadervalue));

    this.setState({ displayToDoItemList: currentToDoHeader.items });
  }

  clearInput() {
    this.setState({ text: '' });
    this.toDoTextInput.clear();
    this.toDoTextInput.focus();
  }

  setBackground = () => {
    return (
      <View>
        <View style={styles.addTodoStyle}>
          <TextInput
            placeholder='add todo...'
            style={styles.inputStyle}
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            ref={(text) => { this.toDoTextInput = text; }}
          />

          <Button title='Add To Do'
            onPress={() => this.addToDoItems(this.state.headerItemId, this.state.text)} />
        </View>

        <ScrollView>
          <ToDoListing
            toDoItems={this.state.displayToDoItemList}
            deleteToDoItem={this.deleteToDoItem}
            headerItemId={this.state.headerItemId} />
        </ScrollView>
      </View>

    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {this.state.image && <ImageBackground style={styles.backgroundImage} source={{ uri: this.state.image }} >
            {this.setBackground()}
          </ImageBackground>}
          {!this.state.image && <ImageBackground style={styles.backgroundImage} source={{ uri: this.state.image }} >
            {this.setBackground()}
          </ImageBackground>}
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FEF9E7',
    //backgroundColor: '#242526', dark backgroung like FB
    backgroundColor: '#FCFEFE',
    alignItems: 'center',
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7
  },

});

export default ToDoItems;