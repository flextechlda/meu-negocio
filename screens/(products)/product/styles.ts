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

    photo_btn: {
        width: "100%",
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.blue_light,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 50,
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
    },
    btn_text: {
        color: Colors?.white,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});
