// this is the list item component that we are exporting then rendering to the screen when the user adds an imput

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ListItem = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onDelete}>
      <View style={styles.textListItemStyle}>
        <Text>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textListItemStyle: {
    padding: 10,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10
  }
});

export default ListItem;
