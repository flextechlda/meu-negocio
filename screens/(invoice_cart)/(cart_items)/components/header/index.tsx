import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { IInvoiceCart } from "@/interfaces";
import { useState } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { generate_sale_pdf } from "./generate_sale_pdf";

export const Header = ({ cartItems }: { cartItems: IInvoiceCart[] }) => {
    const navigation = useRouter();
    const [loading, setLoading] = useState(false);

    async function sellItems() {
        if (loading) return;
        if (cartItems?.length <= 0) {
            Alert.alert("Alerta!", "O Carrinho Está Vazio!");
            return;
        }

        setLoading(true);

        const html = await generate_sale_pdf(cartItems);

        try {
            // On iOS/android prints the given html. On web prints the HTML from the current page.
            const { uri } = await Print.printToFileAsync({ html });
            console.log("File has been saved to:", uri);
            await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Ocorreu um erro ao gerar as faturas");
        }

        setLoading(true);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.back()}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color="#444"
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => sellItems()}>
                {loading ? (
                    <ActivityIndicator size={20} color="#fff" />
                ) : (
                    <>
                        <MaterialIcons
                            name="monetization-on"
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.span}>Gerar Faturas</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};
