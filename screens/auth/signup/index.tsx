import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { api } from "@/services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    const router = useRouter();

    async function handleSignUp() {
        if (loading) return;
        if (
            !password.trim() ||
            !email.trim() ||
            !name.trim() ||
            !phone.trim()
        ) {
            Alert.alert("Alerta!", "Preencha todos os campos!");
            return;
        }

        setLoading(true);

        let obj = {
            password: password,
            email: email,
            username: name,
            phone: phone,
        };

        try {
            let response = await api.post("/api/auth/users/signup", obj);

            if (response.data?.success === true) {
                Alert.alert(
                    "SUCESSO!",
                    "A sua conta foi criada com sucesso, use as suas credenciais para fazer login!"
                );

                router.back();
            }
            if (response.data?.success === false) {
                Alert.alert("ALERTA!", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro!", "Erro ao criar a conta");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.top}>
                    <Text style={styles.h1}>Cadastre-se</Text>
                </View>

                <View style={styles.box}>
                    <View style={styles.bottom}>
                        <Text style={styles.label}>Nome completo</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={name}
                            keyboardType="default"
                            style={styles.input}
                            placeholder="Fulano"
                            onChangeText={(text) => setName(text)}
                        />
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={email}
                            keyboardType="email-address"
                            style={styles.input}
                            placeholder="example@gmail.com"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={styles.label}>Telefone</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={phone}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder=""
                            onChangeText={(text) => setPhone(text)}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={password}
                            keyboardType="default"
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Sua senha"
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => handleSignUp()}
                        >
                            <Text style={styles.btn_text}>
                                {!loading ? (
                                    "Entrar"
                                ) : (
                                    <ActivityIndicator
                                        color={"#fff"}
                                        size={20}
                                    />
                                )}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => router.back()}
                        >
                            <MaterialCommunityIcons
                                name="arrow-left"
                                color={Colors?.primary}
                                size={23}
                            />
                            <Text style={styles.p_bold}>Voltar para login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
