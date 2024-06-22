import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors?.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 65,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },

    btn: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontWeight: "600",
        fontSize: 15,
        color: Colors?.gray,
        marginRight: 20,
    },
});
