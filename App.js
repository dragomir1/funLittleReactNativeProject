// import "useState" to use hooks.
import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ListItem from './components/ListItem';
import ListInput from './components/ListInput';
export default function App() {
  // *****keeping this code for reference*****
  // hooks take two parameters. the current state and a function to change that state.
  // const [text, changeText] = useState(
  //   'Open up App.js to start working on your app!'
  // );
  // return (
  //   <View style={styles.container}>
  //     <Text>{text}</Text>
  //     <Button
  //       title='change text'
  //       onPress={() => changeText('the text changed')}
  //     />
  //   </View>
  // );

  // ***** this is managed in the ListInput comp
  // const [enteredText, updateTextState] = useState(''); //initial state, empty string.user did ot enter anthing just yet.

  // setting up another state to output all the texts we added.
  const [addedElements, updateElementsState] = useState([]);

  // adding state to manage the modal. initially sets to false.
  const [currentModal, updateModalState] = useState(false);

  // ***** this is managed in the ListInput comp
  // // this updates the state with every new keystroke.
  // const textChangeHander = enteredText => {
  //   updateTextState(enteredText);
  // };
  // this function returns the updateElementsState and adds a new array with old elements plus the new one  - enteredText.
  // 'enteredText' is managed in ListInput and not in this app.  we need to recieve an argument so that it can be forwarded in the ListInput comp.
  const addTextButtonHandler = enteredText => {
    // ====>addedElements is previous state. this should be most current snapshot but it's not always guarenteed. TO UPDATE STATE BASED ON THE OLD STATE USE FUNCTION FORM OF UPDATEELEMENTSSTATE FUNCTION...you don't pass a value but an anon function. this way of writing syntax guarentees you'll get the current up to date state.
    updateElementsState(currentElements => [...currentElements, enteredText]);
    // ***older code version..the top code is more accurate
    // updateElementsState([...addedElements, enteredText]);

    //  SIDENOTE: IF SETTING TWO STATES ON AFTER ANOTHER, IT WILL BATCH IT TOGETHER. IT WILL NOT RERENDER THE COMPONENT TWICE.  APPLIES STATE CHANGES ONCE AND RENDER ONCE
    updateModalState(false);
  };
  // the function brackets are becuase we have multiple statments.
  const deleteTextHandler = el => {
    updateElementsState(currentElements => {
      // filter returns a new array based on the old aka 'currentElements' array. it runs through every element in the array
      // the delete function checks the current element.  if the el we're getting as an argument is the same as the element then we want to delete.  if it's not the same, we want to keep it if the ids do not match - return true.
      return currentElements.filter(element => element !== el);
    });
  };

  const cancelButtonTextAdditionHandler = () => {
    updateModalState(false);
  };

  return (
    <View style={styles.container}>
      {/* adding an onPress to show Modal everytime it's pressed. this needs STATE.  we use an inline function to update the state - sets to true - this opens the modal */}
      <Button title='Add new item' onPress={() => updateModalState(true)} />
      <ListInput
        addingTextToList={addTextButtonHandler}
        isModalVisable={currentModal}
        onCancelButton={cancelButtonTextAdditionHandler}
      />
      <View>
        {addedElements.map(el => (
          <ListItem
            key={el}
            item={el}
            onDelete={deleteTextHandler.bind(this, el)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  textInputStyle: {
    borderBottomColor: 'black',
    borderWidth: 2,
    padding: 10,
    textAlign: 'center',
    width: '80%'
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
