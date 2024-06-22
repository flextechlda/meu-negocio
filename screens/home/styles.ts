import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.background_secondary,
        paddingTop: StatusBar?.currentHeight,
    },

    row: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    span1: {
        fontSize: 15,
        color: Colors?.secondary,
        fontWeight: "bold",
    },
    span2: {
        fontWeight: "600",
        fontSize: 14,
        color: Colors?.secondary,
    },
});
