import { Alert } from "react-native";

export function validateData(
    NewPassword: string,
    NewPasswordConfirmation: string
) {
    if (NewPassword?.trim() == "" && NewPasswordConfirmation?.trim() == "") {
        return {
            proceed: false,
            alert: () => null,
        };
    }

    if (
        NewPassword?.trim().length < 6 ||
        NewPasswordConfirmation?.trim().length < 6
    ) {
        return {
            proceed: false,
            alert: () => {
                Alert.alert(
                    "Alerta",
                    "Palavra passe curta (minimo: 6 caracteres)!"
                );
            },
        };
    }
    if (NewPassword !== NewPasswordConfirmation) {
        return {
            proceed: false,
            alert: () => {
                Alert.alert("Alerta", "As senhas não coincidem!");
            },
        };
    }

    return {
        proceed: true,
        alert: () => null,
    };
}
