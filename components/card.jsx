import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Card({ data, pressDelete, pressEdit }) {
  return (
    <View style={styles.cardContent}>
      <View style={styles.cardBody}>
        <Text style={styles.product}>{data.product}</Text>
        <Text style={styles.price}>{data.price}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.bottomEdit}
          onPress={() => pressEdit(data)}
        >
          <Text style={styles.textEdit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomDelete}
          onPress={() => pressDelete(data)}
        >
          <Text style={styles.textDelete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#4CD146",
    borderRadius: 8,
    marginBottom: 16,
  },
  cardBody: {
    items: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  product: {
    color: "gray",
    fontSize: 18,
  },
  price: {
    color: "coral",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    gap: 4,
  },
  bottomEdit: {
    backgroundColor: "blue",
    padding: 4,
    borderRadius: 4,
  },
  bottomDelete: {
    backgroundColor: "red",
    padding: 4,
    borderRadius: 4,
  },
  textEdit: {
    color: "white",
    fontWeight: "bold",
  },
  textDelete: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Card;
