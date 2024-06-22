import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
        paddingTop: StatusBar?.currentHeight,
    },

    column: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    span: {
        fontSize: 15,
        color: Colors?.secondary,
        fontWeight: "bold",
        marginBottom: 15,
    },
});
