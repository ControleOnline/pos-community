import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Select, Icon } from "native-base";

const Header = () => {
  return (
    <View style={styles.headerContainer}>    
      <TouchableOpacity onPress={() => console.log("Menu clicked")}>
        <Icon name="menu" />
      </TouchableOpacity>
      <Select
        selectedValue="1"
        minWidth={40}
        onValueChange={(itemValue) => console.log(itemValue)}
      >
        <Select.Item labelStyle={{ color: 'white' }} label="Empresa 1" value="1" />
        <Select.Item labelStyle={{ color: 'white' }} label="Empresa 2" value="2" />
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#1B5587",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default Header;
