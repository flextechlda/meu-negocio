import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors?.background_secondary,
        paddingHorizontal: 15,
        marginTop: 20,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        padding: 10,
        paddingVertical: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
    span1: {
        fontSize: 15,
        color: Colors?.secondary,
        fontWeight: "bold",
    },
    span2: {
        fontWeight: "600",
        fontSize: 14,
        color: Colors?.secondary,
    },
});
