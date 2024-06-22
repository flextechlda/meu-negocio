import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { IUser } from "@/interfaces";
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { validateData } from "./validate_data";

export const AlterPasswordScreen = () => {
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState("");
    const [newPasssword, setNewPasssword] = useState("");
    const [latsPasssword, setLatsPasssword] = useState("");
    const { user } = useContext(AuthContext);
    const router = useRouter();

    async function handleSubmit() {
        if (loading) return;

        let result = validateData(latsPasssword, newPasssword, confirmation);

        if (result.proceed == false) {
            result.alert();
            return;
        }

        let user_id = user?.id;
        let url = `/api/auth/users/update-password`;

        let data = {
            password: latsPasssword,
            new_password: newPasssword,
            user_id: user_id,
        };

        setLoading(true);
        try {
            let response = await api.put(url, data);

            if (response.data?.success === true) {
                Alert.alert("SUCESSO!!", response.data?.display_message);

                router.back();
            } else {
                Alert.alert("ALERTA!", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
                "ALERTA!",
                "Erro ao mudar a senha, verifique a sua conexão de internet."
            );
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.column}>
                <View style={{ width: "100%" }}>
                    <Text style={styles.label}>Palavra Passe Antiga</Text>
                    <TextInput
                        value={latsPasssword}
                        keyboardType="default"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setLatsPasssword(text)}
                    />
                    <Text style={styles.label}>Nova Palavra Passe</Text>
                    <TextInput
                        value={newPasssword}
                        keyboardType="default"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setNewPasssword(text)}
                    />
                    <Text style={styles.label}>
                        Confirmar Nova Palavra Passe
                    </Text>
                    <TextInput
                        value={confirmation}
                        keyboardType="default"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmation(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.btn_text}>
                        {!loading ? (
                            "Salvar"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
