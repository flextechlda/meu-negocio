import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },

    column: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },

    p: {
        fontSize: 14,
        color: "#444",
        fontWeight: "600",
        marginBottom: 20,
    },
    span: {
        color: Colors?.primary,
        textDecorationLine: "underline",
    },
    label: {
        fontSize: 14,
        color: "#444",
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        backgroundColor: Colors?.input_background,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        color: Colors?.gray,
    },

    btn: {
        flex: 1,
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    btn_text: {
        color: Colors?.white,
        fontSize: 12.5,
        fontWeight: "600",
        textAlign: "center",
        textTransform: "uppercase",
    },
});
