import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
        paddingTop: StatusBar?.currentHeight,
        position: "relative",
    },

    column: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
});
