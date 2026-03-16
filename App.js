import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync(
        {fields: [Contacts.Fields.PhoneNumbers] }
      );

      if (data.length > 0) {
        setContacts(data);
      }

      else {
      Alert.alert("Warning", "No contacts found.");      
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let phone = "No phone number";

          if (item.phoneNumbers && item.phoneNumbers.length > 0) {
            phone = item.phoneNumbers[0].number;
          }

          return (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{phone}</Text>
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Get Contacts" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  name: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});
