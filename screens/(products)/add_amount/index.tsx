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
import { useState } from "react";
import { AddProductAmount } from "@/models";
import { useLocalSearchParams, useRouter } from "expo-router";

export const AddProductAmountScreen = () => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("5");
    const navigation = useRouter();
    const { product_id } = useLocalSearchParams();

    async function handleSubmit() {
        if (!amount.trim()) {
            Alert.alert("Alerta!", "Preencha todos os campos!");
            return;
        }

        setLoading(true);
        let _product_id = product_id as string;

        try {
            let resultSet = await AddProductAmount({
                product_id: _product_id,
                added_amount: amount,
            });

            if (resultSet.changes <= 0) {
                setLoading(false);
                Alert.alert(
                    "Alerta!",
                    `Ocorreu um erro!. O valor (${amount}) não foi adicionado a quantidade do produto!`
                );
                return;
            }

            Alert.alert(
                "SUCCESSO!",
                `O valor (${amount}) foi adicionado a quantidade do produto!`
            );
            navigation.back();
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Falha!",
                `Falha ao adiconar o valor (${amount}) a quantidade do produto`
            );
        }

        setAmount("");
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.column}>
                <View style={{ width: "100%" }}>
                    <Text style={styles.label}>Quantidade:</Text>
                    <TextInput
                        value={amount}
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setAmount(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.btn_text}>
                        {!loading ? (
                            "Aumentar Quantidade"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
