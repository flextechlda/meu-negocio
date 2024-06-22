import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginTop: 20,
    },

    box: {
        justifyContent: "space-between",
        width: "48%",
        height: 90,
        backgroundColor: Colors?.blue_light,
        padding: 10,
        borderRadius: 5,
        borderColor: Colors?.text,
        borderWidth: 1,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    span: {
        color: Colors?.gray,
        fontWeight: "bold",
        fontSize: 15,
    },
    text: {
        color: Colors?.gray,
        fontWeight: "bold",
        fontSize: 15,
        opacity: 0.9,
    },
});
