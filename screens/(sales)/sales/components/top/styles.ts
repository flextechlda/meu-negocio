import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors?.primary,
        paddingTop: StatusBar?.currentHeight,
        paddingHorizontal: 15,
        paddingBottom: 50,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 15,
    },
    btn: {
        width: 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.white,
        alignItems: "center",
        justifyContent: "center",
    },
    btn2: {
        width: 170,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.white,
        alignItems: "center",
        justifyContent: "center",
    },

    text_btn: {
        color: "#555",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
    },

    h1: {
        color: "#eee",
        fontSize: 22,
        textAlign: "center",
    },
    span: {
        color: Colors?.white,
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
    },
});
