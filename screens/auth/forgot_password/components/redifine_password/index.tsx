import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { validateData } from "./validate_data";
import { api } from "@/services/api";
import { Colors } from "@/constants/Colors";

interface Props {
    email: string;
    code: string;
    goBack: () => void;
}

export function RedifinePassword({ code, email, goBack }: Props) {
    const [RedifinitionCode, setRedifinitionCode] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [NewPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit() {
        let confirmation = validateData(NewPassword, NewPasswordConfirmation);

        if (confirmation.proceed == false) {
            confirmation.alert();
            return;
        }
        if (!RedifinitionCode) return;
        if (!email) return;
        if (RedifinitionCode != code) {
            Alert.alert("Alerta!", "Codigo invalido");
            return;
        }

        let url = `/api/auth/users/redify-password`;

        let data = {
            new_password: NewPassword,
            email: email,
        };

        setLoading(true);
        try {
            let response = await api.put(url, data);

            if (response.data?.success === true) {
                Alert.alert("SUCESSO", response.data?.display_message);

                router.back();
            } else {
                Alert.alert("ALERTA", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Erro de conexão");
        }

        setLoading(false);
    }

    return (
        <View style={styles.form}>
            <View style={styles.row}>
                <Text style={styles.strong}>Alterar senha</Text>

                <TouchableOpacity style={styles.box} onPress={() => goBack()}>
                    <MaterialIcons
                        name="arrow-back"
                        size={20}
                        color={Colors?.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.input_box}>
                <MaterialIcons name="badge" size={24} color={Colors?.primary} />
                <TextInput
                    placeholderTextColor={"#777"}
                    keyboardType="default"
                    style={styles.input}
                    placeholder="Codigo de redefinição de senha"
                    value={RedifinitionCode}
                    onChangeText={(text) => setRedifinitionCode(text)}
                />
            </View>

            <View style={styles.input_box}>
                <MaterialIcons name="lock" size={24} color={Colors?.primary} />
                <TextInput
                    placeholderTextColor={"#777"}
                    keyboardType="default"
                    secureTextEntry
                    style={styles.input}
                    placeholder="Nova senha"
                    value={NewPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
            </View>

            <View style={styles.input_box}>
                <MaterialIcons name="lock" size={24} color={Colors?.primary} />
                <TextInput
                    placeholderTextColor={"#777"}
                    keyboardType="default"
                    secureTextEntry
                    style={styles.input}
                    placeholder="Confirmar nova senha"
                    value={NewPasswordConfirmation}
                    onChangeText={(text) => setNewPasswordConfirmation(text)}
                />
            </View>

            <View style={styles.line} />

            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                <Text style={styles.btn_txt}>
                    {loading ? (
                        <ActivityIndicator color={"#000"} size={20} />
                    ) : (
                        "CONFIRMAR"
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
