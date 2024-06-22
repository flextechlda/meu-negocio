import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar?.currentHeight,
    },

    column: {
        paddingHorizontal: 15,
        marginTop: 20,
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 20,
    },

    box: {
        marginBottom: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: "#fff",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    span: {
        fontSize: 14,
        fontWeight: "500",
    },
    btn: {
        height: 40,
        width: 60,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },

    logout_btn: {
        height: 60,
        width: "100%",
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        flexDirection: "row",
        gap: 5,
    },

    logout_btn_txt: {
        fontSize: 14,
        fontWeight: "500",
        color: "white",
    },
});
