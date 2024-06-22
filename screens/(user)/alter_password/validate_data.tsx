import { Alert } from "react-native";

export function validateData(
    latsPasssword: string,
    newPasssword: string,
    confirmation: string
) {
    if (
        latsPasssword?.trim() == "" &&
        newPasssword?.trim() == "" &&
        confirmation?.trim() == ""
    ) {
        return {
            proceed: false,
            alert: () => null,
        };
    }

    if (
        latsPasssword?.trim().length < 6 ||
        newPasssword?.trim().length < 6 ||
        confirmation?.trim().length < 6
    ) {
        return {
            proceed: false,
            alert: () =>
                Alert.alert(
                    "Alerta!",
                    "Palavra passe curta (minimo: 6 caracteres)!"
                ),
        };
    }
    if (newPasssword !== confirmation) {
        return {
            proceed: false,
            alert: () => Alert.alert("Alerta!", "As senhas não coincidem!"),
        };
    }

    return {
        proceed: true,
        alert: () => null,
    };
}
