import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';

class AddToDo extends React.Component{

    state = {
        text : '',
    }

    handleInputTextAfterSubmission = ()=>{
        this.setState({text : ''});
        this.toDoTextInput.clear();
        this.toDoTextInput.focus();
    }

    render(){
        return (
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerText}>My To Do</Text>
                </View>
                <View style={styles.addTodoStyle}>
                    <TextInput
                    placeholder='add todo...'
                    style={styles.inputStyle}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text })}
                    ref={(text) => { this.toDoTextInput = text; }}
                    />

                    <Button title='Add To Do' onPress={()=>this.props.addToDo(this.state.text)} />
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
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
});

export default AddToDo;