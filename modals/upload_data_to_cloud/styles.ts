import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors?.white,
        borderRadius: 10,
        padding: 15,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    h1: {
        fontSize: 14.5,
        color: "#444",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    p: {
        fontSize: 15,
        color: "#444",
        marginTop: 30,
        lineHeight: 20,
    },
    close: {
        width: 55,
        height: 45,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },

    btn: {
        width: "100%",
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.gray,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 20,
    },
    btn_text: {
        color: Colors?.white,
        fontSize: 12,
        fontWeight: "500",
        textTransform: "uppercase",
    },
});
