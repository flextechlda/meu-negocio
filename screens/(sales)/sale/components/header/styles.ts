import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        height: 220,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        paddingTop: StatusBar?.currentHeight,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    btn: {
        width: 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});
