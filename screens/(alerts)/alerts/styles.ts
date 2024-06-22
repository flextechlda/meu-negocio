import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.background_primary,
        paddingTop: StatusBar?.currentHeight,
    },

    column: {
        marginTop: 30,
        paddingHorizontal: 15,
    },
    span: {
        marginBottom: 15,
        fontSize: 15,
        color: Colors?.secondary,
        fontWeight: "bold",
    },
});
