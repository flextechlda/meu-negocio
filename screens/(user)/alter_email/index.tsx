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

export const AlterEmailScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    async function handleSubmit() {
        if (!email?.trim()) return;
        if (loading) return;

        let user_id = user?.id;
        let url = `/api/users/update-email`;

        let data = {
            email: email,
            user_id: user_id,
        };

        setLoading(true);

        try {
            let response = await api.put(url, data);

            if (response.data?.success === true) {
                let user_data = { ...user, email: email } as IUser;
                setUser(user_data);

                Alert.alert("SUCESSO!!", response.data?.display_message);
                router.back();
            } else {
                Alert.alert("ALERTA!", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
                "ALERTA!",
                "Erro ao atualizar email, verifique a sua conexão de internet."
            );
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.column}>
                <View style={{ width: "100%" }}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
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
