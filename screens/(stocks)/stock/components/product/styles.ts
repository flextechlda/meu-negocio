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
    },

    image: {
        width: 80,
        height: 80,
        backgroundColor: "#ccc",
        objectFit: "cover",
    },

    span1: {
        color: Colors?.gray,
        fontWeight: "600",
        fontSize: 15,
        marginTop: 2,
    },
    span2: {
        color: Colors?.gray,
        fontWeight: "600",
        fontSize: 13,
        marginTop: 2,
    },
    span3: {
        color: Colors?.primary,
        fontWeight: "600",
        fontSize: 13,
        marginTop: 5,
    },
});
