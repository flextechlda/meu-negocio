import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Colors?.white,
    },

    bottom: {
        flex: 1,
        backgroundColor: Colors?.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingHorizontal: 15,
        paddingTop: 30,
    },

    span: {
        marginBottom: 20,
        fontSize: 15,
        color: Colors?.secondary,
        fontWeight: "bold",
    },
});
