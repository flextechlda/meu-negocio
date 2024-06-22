import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10,
    },

    btn: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    txt: {
        fontSize: 14,
        color: Colors?.white,
        fontWeight: "500",
    },
});
