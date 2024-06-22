import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
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

    btn: {
        backgroundColor: Colors?.primary,
        width: 60,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});
