import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
    },

    span: {
        color: Colors?.gray,
        fontWeight: "600",
        fontSize: 15,
        marginTop: 2,
    },
});
