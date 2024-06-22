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
        width: 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        gap: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
});
