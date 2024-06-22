import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { api } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProduct, ISale, IStock, IUser } from "@/interfaces";
import {
    RegisterProductFromCloud,
    RegisterSaleFromCloud,
    RegisterStockFromCloud,
} from "@/models/DataFromCloud";

export const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const { setUser } = useContext(AuthContext);

    async function handleSignIn() {
        if (loading) return;
        if (!password.trim() || !email.trim()) {
            Alert.alert("Alerta!", "Preencha todos os campos!");
            return;
        }

        setLoading(true);

        let obj = {
            password: password,
            email: email,
        };

        try {
            let response = await api.post("/api/auth/users/signin", obj);

            if (response.data?.success === true) {
                let products = response.data?.products as IProduct[];
                let stocks = response.data?.stocks as IStock[];
                let sales = response.data?.sales as ISale[];
                let user_data = response.data?.user_data as IUser;

                stocks?.forEach(async (stock) => {
                    await RegisterStockFromCloud({
                        id: stock?.id,
                        name: stock?.name,
                        user_id: stock?.user_id,
                    });
                });

                products?.forEach(async (product) => {
                    await RegisterProductFromCloud({
                        id: product?.id,
                        name: product?.name,
                        user_id: product?.user_id,
                        acquisition_price: product?.acquisition_price,
                        alert_quantity: product?.alert_quantity,
                        amount: product?.amount,
                        created_at: product?.created_at,
                        photo: product?.photo,
                        sale_price: product?.sale_price,
                        stock_id: product?.stock_id,
                        supplier: product?.supplier,
                    });
                });

                sales?.forEach(async (sale) => {
                    await RegisterSaleFromCloud({
                        id: sale?.id,
                        user_id: sale?.user_id,
                        price: sale?.price,
                        product_id: sale?.product_id,
                        stock_id: sale?.stock_id,
                        amount: sale?.amount,
                        created_at: sale?.created_at,
                    });
                });

                await AsyncStorage.setItem(
                    "meu-negocio.user.data",
                    JSON.stringify(user_data)
                );

                setUser(user_data);

                router.replace("/(tabs)/home");
            }
            if (response.data?.success === false) {
                Alert.alert("ALERTA!", response.data?.display_message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro!", "Erro ao fazer login");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.h1}>Login</Text>
            </View>

            <View style={styles.bottom}>
                <View style={{ width: "100%" }}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholderTextColor={Colors?.gray}
                        value={email}
                        keyboardType="email-address"
                        style={styles.input}
                        placeholder="example@gmail.com"
                        onChangeText={(text) => setEmail(text)}
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

                    <View style={styles.row}>
                        <Text style={styles.p}>Não tem uma conta?</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/auth/signup/")}
                        >
                            <Text style={styles.p_bold}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => handleSignIn()}
                    >
                        <Text style={styles.btn_text}>
                            {!loading ? (
                                "Entrar"
                            ) : (
                                <ActivityIndicator color={"#fff"} size={20} />
                            )}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() =>
                                router.push("/auth/forgot_password/")
                            }
                        >
                            <Text style={styles.p_bold}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.copy}>&copy; FlexTech</Text>
            </View>
        </View>
    );
};
