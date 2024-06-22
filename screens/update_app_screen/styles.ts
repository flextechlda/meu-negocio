import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors?.primary,
    },

    p: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 30,
    },

    btn: {
        width: 250,
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.white,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
    },
    btn_text: {
        color: Colors?.gray,
        fontSize: 13,
        fontWeight: "600",
    },
});
