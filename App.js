import { StatusBar } from "expo-status-bar";
import { useState } from "react";
// import { v4 as uuid } from "uuid";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./components/card";

export default function App() {
  const [dataForm, setDataForm] = useState({
    product: "",
    price: 0,
  });

  const [data, setData] = useState([
    {
      id: 1,
      product: "Phone",
      price: 12000,
    },
  ]);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [registerSelected, setRegisterSelected] = useState({});

  function pressDelete(user) {
    setRegisterSelected(user);
    setModalDelete(!modalDelete);
  }

  function pressEdit(user) {
    setRegisterSelected(user);
    setModalEdit(!modalEdit);
  }
  function toggleModal() {
    setModalDelete(false);
    setModalEdit(false);
  }

  function handleDelete() {
    setData((prev) => prev.filter((item) => item.id !== registerSelected.id));
    toggleModal();
  }

  function handleEdit(updatedData) {
    setData((prev) =>
      prev.map((item) =>
        item.id === registerSelected.id ? { ...item, ...updatedData } : item
      )
    );
    toggleModal();
  }

  function handlePress() {
    if (dataForm.price === "" || dataForm.product === "") {
      Alert.alert("Error", "Campos inválidos o incompletos", [{ text: "OK" }]);
    } else {
      setData([...data, { ...dataForm, id: data[data.length - 1].id + 1 }]);
    }
  }

  return (
    <View style={styles.container}>
      {/* formulario */}
      <View style={styles.contentForm}>
        <TextInput
          onChangeText={(text) => setDataForm({ ...dataForm, product: text })}
          placeholder="Product"
          style={styles.input}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          placeholder="Precio"
          style={styles.input}
          onChangeText={(text) => setDataForm({ ...dataForm, price: text })}
        ></TextInput>
        <TouchableOpacity onPress={handlePress} style={styles.buttonSubmit}>
          <Text style={styles.textSubmit}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* iteracion de cards */}
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => (
          <Card
            pressDelete={pressDelete}
            pressEdit={pressEdit}
            // setModalOpen={setModalOpen}
            data={item}
          ></Card>
        )}
      ></FlatList>

      {/* Modal edit */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <TextInput
                style={styles.input}
                defaultValue={registerSelected.product}
              ></TextInput>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                defaultValue={registerSelected.price}
              ></TextInput>
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.buttonDeleteModal}
                onPress={handleDelete}
              >
                <Text style={styles.textCloseModal}>Confirm edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCloseModal}
                onPress={toggleModal}
              >
                <Text style={styles.textCloseModal}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* modal delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDelete}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Desea eliminar el registro{" "}
              <Text style={styles.modalTextP}>{registerSelected.product}</Text>
            </Text>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.buttonDeleteModal}
                onPress={handleDelete}
              >
                <Text style={styles.textCloseModal}>Confirm delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCloseModal}
                onPress={toggleModal}
              >
                <Text style={styles.textCloseModal}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingHorizontal: 16,
  },

  contentForm: {
    // height: 400,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 30,
    borderRadius: 16,
    marginBottom: 32,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 6,
    borderRadius: 6,
    marginBottom: 16,
  },

  buttonSubmit: {
    paddingHorizontal: 4,
    paddingVertical: 8,

    backgroundColor: "#2AAB44",
    borderRadius: 8,
    width: 100,
  },
  textSubmit: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonCloseModal: {
    padding: 4,
    backgroundColor: "#353835",
    borderRadius: 4,
    marginTop: 8,
    width: 100,
  },
  buttonDeleteModal: {
    padding: 4,
    backgroundColor: "#C70039",
    borderRadius: 4,
    marginTop: 8,
    width: 100,
  },
  textCloseModal: {
    color: "white",
  },
  modalText: {
    fontSize: 18,
  },
  modalTextP: {
    color: "red",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 8,
  },

  flatList: {
    paddingHorizontal: 16,
  },
});
