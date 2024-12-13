import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native";
import { data } from "../data/todos";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function Index() {
  const [text, setText] = useState(""); 
  const [todoList, setTodoList] = useState(data);

  // Add Todo Item
  function handleAddTodo(value) {
    if (value.trim() === "") { 
      return;
    }

    const newItem = {
      id: todoList.length + 1,  // Ensure unique id for new item
      title: value,
      completed: false,
    };

    // Update the state with the new item
    setTodoList((prevList) => {
      return [...prevList, newItem];
    });

    setText("");  // Clear the input field after adding
  }

  // Delete Todo Item
  function handleDelete(item) {
    // Filter out the deleted item and update the state
    const filteredList = todoList.filter((i) => i.id !== item.id);
    setTodoList(filteredList);
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%", width: "100%", marginBottom: 20 }}>
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", gap: 10, alignItems: "center" }}>
        <TextInput 
          style={styles.input} 
          value={text} 
          onChangeText={setText} 
          placeholder="Add a new todo" 
        />
        <Button title="Add" onPress={() => handleAddTodo(text)} />
      </SafeAreaView>
      {/* Render Todo List */}
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={item.completed ? styles.listTitleCompleted : styles.listTitle}>
              {item.title}
            </Text>
            <Ionicons 
              onPress={() => handleDelete(item)} 
              name="trash-outline" 
              color={"red"} 
              size={30} 
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "black",
    marginTop: 10,
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    color: "white",
    border: "solid 2px gray",
    borderRadius: 10,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
    marginTop: 20,
    marginHorizontal: "auto",
    paddingBottom: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  listTitle: {
    color: "white",
    fontSize: 22,
  },
  listTitleCompleted: {
    textDecorationLine: "line-through",
    color: "grey",
    fontSize: 22,
  },
});
