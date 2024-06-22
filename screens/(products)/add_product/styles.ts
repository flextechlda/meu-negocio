import { Colors } from "@/constants/Colors";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
        paddingTop: StatusBar?.currentHeight,
    },

    column: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },

    label: {
        fontSize: 14,
        color: "#444",
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        backgroundColor: Colors?.input_background,
        paddingHorizontal: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        color: Colors?.gray,
    },

    photo_btn: {
        width: "100%",
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.blue_light,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    photo: {
        height: 200,
        width: "100%",
        borderRadius: 10,
        objectFit: "cover",
        backgroundColor: "#ccc",
    },
    change: {
        backgroundColor: Colors?.primary,
        width: 150,
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    change_txt: {
        color: "#fff",
        fontSize: 15,
    },
    btn: {
        width: "100%",
        height: 65,
        borderRadius: 5,
        backgroundColor: Colors?.primary,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 50,
    },
    btn_text: {
        color: Colors?.white,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});
