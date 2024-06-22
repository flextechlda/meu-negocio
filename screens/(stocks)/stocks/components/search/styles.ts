import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input_box: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        backgroundColor: Colors?.input_background,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: Colors?.gray,
    },
});
