import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Modal } from 'react-native';

const ListInput = props => {
  const [enteredText, updateTextState] = useState(''); //initial state, empty string.user did ot enter anthing just yet.

  // this updates the state with every new keystroke.
  const textChangeHandler = enteredText => {
    updateTextState(enteredText);
  };

  const onAddedTextHandler = () => {
    // still need to forward 'enteredText to parent function in App.
    props.addingTextToList(enteredText);
    // this resets the field to an empty string again.
    updateTextState('');
  };

  return (
    /* animationType is a fon toy. 'visible is a prop on the modal component */
    <Modal visible={props.isModalVisable} animationType='slide'>
      <View style={styles.layout}>
        <TextInput
          style={styles.textInputStyle}
          placeholder='text here'
          onChangeText={textChangeHandler}
          value={enteredText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='CANCEL' color='red' onPress={props.onCancelButton} />
          </View>
          <View style={styles.button}>
            <Button
              title='ADD'
              /* this function is regsitered as a TO BE executed function for onPress. "enteredText" will be passed as an argument to the function. WE CALL BIND TO PRE CONFIGURE SOME ARGUMENTS WHICH WILL BE PASSED ALONG WHEN FUNCITON IS EXECUTED. TAKES TWO ARGUMENTS. 1: THIS 2: ARGUMENT RECEIVED BY "ADDINGTEXTTOLIST" FUNCTION WHEN IT'S EXECTUTED ON THE BUTTON PRESS. THESE TWO ARGUMENTS ARE SET UP AS A TO-BE FORWARDED ARGUMENT TO THE "ADDEINGTETTOLIST" FUNCTION*/

              /* ********* OLD CODE...WE ARE REPLACEING THIS WITH NEW CODE TO CLEAR TEXT INPUT AFTER USER TYPES AND ADDS IT TO THE LIST****** */
              /*onPress={props.addingTextToList.bind(this, enteredText)}*/
              /* new code to clear input - creating a function in this component */
              onPress={onAddedTextHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomColor: 'black',
    borderWidth: 2,
    padding: 10,
    textAlign: 'center',
    width: '80%',
    marginBottom: 10
  },
  buttonContainer: {
    // we need width assigned to button container. otherwise the container will only take the width of the children and not the parent container.
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '60%'
  },
  button: {
    // this is 40% of the parent container. - so the buttom container - which takes 60%. this makes both buttons the same size.
    width: '40%'
  },
  layout: {
    // flexDirection: 'row',//defualt is column so this is not needed.
    flex: 1, //this takes as much space as it's parents give it. its the modal in this case. if you don't set it, the children takes as much space as needed - TextInput and Button in this case.
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ListInput;
