import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    form: {
        width: "100%",
        borderRadius: 5,
        padding: 20,
        paddingVertical: 20,
        backgroundColor: Colors?.primary,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
    },
    box: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
    },

    strong: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    input_box: {
        flexDirection: "row",
        backgroundColor: Colors?.input_background,
        position: "relative",
        height: 60,
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        position: "absolute",
        paddingLeft: 45,
        color: "#333",
        width: "100%",
        height: "100%",
    },

    line: {
        marginTop: 100,
        width: "100%",
        height: 1,
        backgroundColor: Colors.white,
    },

    btn: {
        height: 60,
        width: "100%",
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },
    btn_txt: {
        fontWeight: "bold",
        color: "#666",
        textTransform: "uppercase",
    },
});
