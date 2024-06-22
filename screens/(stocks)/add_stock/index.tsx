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
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { RegisterStock } from "@/models";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export const AddStockScreen = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const { user } = useContext(AuthContext);
    const navigation = useRouter();

    async function createStock() {
        if (loading) return;
        if (!name.trim()) {
            Alert.alert("Alerta!", "Preencha todos os campos!");
            return;
        }

        let { randomUUID } = new ShortUniqueId({ length: 30 });
        let id = randomUUID();
        let user_id = user?.id as string;

        setLoading(true);

        try {
            await RegisterStock({
                user_id: user_id,
                id: id,
                name: name,
            });

            Alert.alert("SUCCESSO!", "Estoque adiconado com successo.");
            navigation.replace("/(tabs)/stocks");
        } catch (error) {
            console.error(error);
            Alert.alert("Falha!", "Falha ao adiconar estoque.");
        }

        setName("");
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.column}>
                <View style={{ width: "100%" }}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        placeholderTextColor={Colors?.gray}
                        value={name}
                        keyboardType="default"
                        style={styles.input}
                        placeholder="Ex: Estoque de bananas"
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => createStock()}
                >
                    <Text style={styles.btn_text}>
                        {!loading ? (
                            "Criar"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
