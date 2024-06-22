import {
    ScrollView,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Colors } from "@/constants/Colors";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { IProduct } from "@/interfaces";
import { GetProductByID } from "@/models";
import { generate_product_pdf } from "./generate_product_pdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ProductScreen = () => {
    const { product_id }: { product_id: string } = useLocalSearchParams();
    const [product, setProduct] = useState({} as IProduct);
    const [loading, setLoading] = useState(true);
    const [isPrinting, setIsPrinting] = useState(false);


    function formatDate(timestamp: string | undefined) {
        if (timestamp) {
            const formattedDate = format(
                new Date(`${timestamp}`),
                "dd '/' MMMM '/' yyyy",
                { locale: ptBR }
            );

            return formattedDate;
        }

        console.log(timestamp);
        
        return "";
    }

    const printToFile = async () => {
        if (!product) return;
        if (isPrinting) return;

        setIsPrinting(true);

        const html = await generate_product_pdf(product);

        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

        setIsPrinting(false);
    };

    async function getProduct() {
        setLoading(true);

        try {
            let result = await GetProductByID({ product_id: product_id });
            setProduct(result);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            getProduct();
        }, [])
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size={30} color={Colors?.primary} />
                </View>
            ) : (
                <ScrollView>
                    <Header photo={product?.photo} product_id={product_id} />

                    <View style={styles.column}>
                        <Text style={styles.label}>Nome do Produto</Text>
                        <TextInput
                            readOnly={true}
                            value={product?.name}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            readOnly={true}
                            value={String(product?.amount)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Preço de Venda</Text>
                        <TextInput
                            readOnly={true}
                            value={String(product?.sale_price)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Preço de Aquisição</Text>
                        <TextInput
                            readOnly={true}
                            value={String(product?.acquisition_price)}
                            style={styles.input}
                        />
                        <Text style={styles.label}>Fornecedor</Text>
                        <TextInput
                            readOnly={true}
                            value={product?.supplier}
                            style={styles.input}
                        />
                        <Text style={styles.label}>
                            Quantidade Minima de Alerta
                        </Text>
                        <TextInput
                            readOnly={true}
                            value={String(product?.alert_quantity)}
                            style={styles.input}
                        />
                        
                        <Text style={styles.label}>
                            Data de expiracão
                        </Text>
                        <TextInput 
                            readOnly={true}
                            value={formatDate(product?.expiration_date)}
                            style={styles.input}
                        />
                            

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => printToFile()}
                        >
                            {isPrinting ? (
                                <ActivityIndicator size={20} color="#fff" />
                            ) : (
                                <Text style={styles.btn_text}>
                                    Gerar Fatura do Produto
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
