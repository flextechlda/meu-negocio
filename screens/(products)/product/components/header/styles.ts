import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        height: 260,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        paddingTop: StatusBar?.currentHeight,
    },
    row: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors?.white,
        borderColor: "transparent",
        borderBottomColor: "#ccc",
        borderWidth: 1,
    },

    btn: {
        width: 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    text_btn: {
        width: 140,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});
