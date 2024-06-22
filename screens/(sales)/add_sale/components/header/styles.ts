import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        height: 250,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        paddingTop: StatusBar?.currentHeight,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors?.primary,
        padding: 10,
    },

    btn: {
        width: 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.white,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors?.white,
    },
});
