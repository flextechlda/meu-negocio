import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Colors?.primary,
    },

    top: {
        paddingTop: StatusBar?.currentHeight,
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    h1: {
        color: Colors?.white,
        fontSize: 28,
        fontWeight: "700",
    },

    bottom: {
        flex: 1,
        backgroundColor: Colors?.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingTop: 30,
        justifyContent: "space-between",
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
        marginBottom: 30,
        color: Colors?.gray,
    },

    row: {
        flexDirection: "row",
        gap: 5,
        marginBottom: 15,
    },
    p: {
        fontSize: 14,
        color: "#444",
    },
    p_bold: {
        color: Colors?.primary,
        fontWeight: "600",
    },

    btn: {
        width: "100%",
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
    },
    btn_text: {
        color: Colors?.white,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "uppercase",
    },

    copy: {
        textAlign: "center",
        color: "#777",
    },
});
