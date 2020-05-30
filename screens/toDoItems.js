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
} from 'react-native';
import ToDoListing from './toDoListing';

class ToDoItems extends React.Component{
    headId = '';
    state = {
        text : '',
        homecall : false,
        homeParams : '',
        headerItemId : '',
        toDoItemList : [],
        displayToDoItemList : [],
        sample : '',
    }

    async componentDidMount(){
         const {params} = this.props.navigation.state;
         this.setState({headerItemId:params.itemId});
         this.setState({homeParams:params});
        this.headId = params.itemId;

         var todosHeader = [];
         todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
        var currentToDoHeader = todosHeader
         .filter(toDoheader => toDoheader.id === this.state.headerItemId)[0];

         this.setState({displayToDoItemList : currentToDoHeader.items});
         this.setState({disPlayToDoHead : currentToDoHeader});
    }

    async addToDoItems(itemId,inputText) {
        if (inputText === '' || inputText === null) {
            Alert.alert(
              'Item Required',
              'Please add a TODO action!',
              [
                { text: 'OK', onPress: () => { } },
              ],
              { cancelable: false }
            )
      
        }else{
            var todosHeader = [];
            todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
            var currentToDoHeader = todosHeader.filter(toDoheader => toDoheader.id === itemId)[0];
            var testId = currentToDoHeader.items.length;
            testId ++;

            var newItem = [{listId : testId,listItem:inputText}];
            
            var valueMergedItems = [...newItem,...currentToDoHeader.items];

            currentToDoHeader.items = valueMergedItems;
            var newToDoHeader = todosHeader.filter(toDoHeader => toDoHeader.id != itemId);

            var newHeadervalue = [];
            newHeadervalue.push(currentToDoHeader);
            newHeadervalue = [...newHeadervalue,...newToDoHeader];
            await AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(newHeadervalue));

            this.setState({displayToDoItemList : currentToDoHeader.items});
        }
    
        this.clearInput();
        
    }

     deleteToDoItem = async(headerId,itemId)=>{
        var todosHeader = [];
         todosHeader = JSON.parse(await AsyncStorage.getItem("myToDoListItemsx"));
        var currentToDoHeader = todosHeader
         .filter(toDoheader => toDoheader.id === headerId)[0];
        

        var toDoItems = currentToDoHeader.items;
        var filteredToDoItems = toDoItems.filter(toDoItem=>toDoItem.listId != itemId);
        
        currentToDoHeader.items = filteredToDoItems;

        var notAffectedToDoHeader = todosHeader.filter(toDoHeader => toDoHeader.id != headerId);

        var updatedHeadervalue = [];
        updatedHeadervalue.push(currentToDoHeader);
        updatedHeadervalue = [...updatedHeadervalue,...notAffectedToDoHeader];

        await AsyncStorage.setItem("myToDoListItemsx", JSON.stringify(updatedHeadervalue));

        this.setState({displayToDoItemList : currentToDoHeader.items});
    }

    clearInput(){
        this.setState({text : ''});
        this.toDoTextInput.clear();
        this.toDoTextInput.focus();
    }

    render(){
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.addTodoStyle}>
                    <TextInput
                    placeholder='add todo...'
                    style={styles.inputStyle}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text })}
                    ref={(text) => { this.toDoTextInput = text; }}
                    />

                    <Button title='Add To Do' 
                    onPress={()=>this.addToDoItems(this.state.headerItemId,this.state.text)} />
                </View>

                <ScrollView>
                    <ToDoListing 
                    toDoItems = {this.state.displayToDoItemList}
                    deleteToDoItem={this.deleteToDoItem}
                    headerItemId = {this.state.headerItemId}/>
                </ScrollView>

            </View>
            </TouchableWithoutFeedback>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEF9E7',
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
  
  });

export default ToDoItems;