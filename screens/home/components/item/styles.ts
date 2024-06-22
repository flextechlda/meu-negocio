import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginBottom: 20,
        gap: 10,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        overflow: "hidden",
    },

    image: {
        width: 70,
        height: 70,
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
        color: Colors?.primary,
        fontWeight: "600",
        fontSize: 11,
        marginTop: 5,
    },
    span3: {
        color: Colors?.gray,
        fontSize: 11,
        marginTop: 5,
    },
});
