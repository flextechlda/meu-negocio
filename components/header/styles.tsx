import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        backgroundColor: Colors?.white,
        paddingHorizontal: 15,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },

    image: {
        borderRadius: 50,
        objectFit: "cover",
        height: 50,
        width: 50,
    },

    span1: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    span2: {
        fontSize: 13,
        color: "#777",
        marginTop: 3,
    },

    btn: {
        position: "relative",
        backgroundColor: Colors?.primary,
        width: 40,
        height: 45,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    notification_on: {
        position: "absolute",
        right: 13,
        top: 10,
        width: 12,
        height: 12,
        backgroundColor: Colors?.tomato,
        borderRadius: 50,
    },
});
