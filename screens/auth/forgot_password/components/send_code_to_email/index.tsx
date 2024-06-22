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
import { useRouter } from "expo-router";
import { useState } from "react";
import { api } from "@/services/api";
import { Colors } from "@/constants/Colors";

interface Props {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    goToResetPassword: (code: string) => void;
}

export function SendCodeToEmail({ email, setEmail, goToResetPassword }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (loading) return;
        if (!email) return;

        let url = `/api/auth/users/send-password-verification-code`;

        let data = {
            email: email,
        };

        setLoading(true);
        try {
            let response = await api.post(url, data);

            if (response.data?.success === true) {
                Alert.alert("SUCESSO", response.data?.display_message);

                goToResetPassword(response.data?.code);
            } else {
                Alert.alert("ALERTA", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Erro ao enviar codigo");
        }

        setLoading(false);
    }

    return (
        <View style={styles.form}>
            <View style={styles.row}>
                <Text style={styles.strong}>Enviar codigo</Text>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => router.back()}
                >
                    <MaterialIcons
                        name="close"
                        size={20}
                        color={Colors?.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.input_box}>
                <MaterialIcons name="email" size={24} color={Colors?.primary} />
                <TextInput
                    placeholderTextColor={"#777"}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholder="example@gmail.com"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.line} />

            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                <Text style={styles.btn_txt}>
                    {loading ? (
                        <ActivityIndicator color={"#000"} size={20} />
                    ) : (
                        "Enviar codigo de verificação"
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
