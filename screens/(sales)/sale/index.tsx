import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { IProduct, ISale } from "@/interfaces";
import { GetProductByID, GetSaleByID, RegisterInoviceCartItem } from "@/models";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { generate_sale_pdf } from "./generate_sale_pdf";
import ShortUniqueId from "short-unique-id";

export const SaleScreen = () => {
    const { product_id, sale_id }: { product_id: string; sale_id: string } =
        useLocalSearchParams();
    const [product, setProduct] = useState({} as IProduct);
    const [sale, setSale] = useState({} as ISale);
    const [loading, setLoading] = useState(true);
    const [isPrinting, setIsPrinting] = useState(false);
    const [loadingAddingInvoiceToCart, setLoadingAddingInvoiceToCart] =
        useState(false);
    const navigation = useRouter();

    const printToFile = async () => {
        if (!product) return;
        if (!sale) return;
        if (isPrinting) return;

        setIsPrinting(true);

        const html = await generate_sale_pdf(product, sale);

        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

        setIsPrinting(false);
    };

    async function getProduct() {
        try {
            let result = await GetProductByID({ product_id: product_id });
            setProduct(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function getSale() {
        try {
            let result = await GetSaleByID({ sale_id: sale_id });
            setSale(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function getData() {
        setLoading(true);

        await getProduct();
        await getSale();

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    async function handleAddItemToCart() {
        try {
            let { randomUUID } = new ShortUniqueId({ length: 30 });
            let id = randomUUID();
            let saleId = sale_id as string;
            let created_at = new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            await RegisterInoviceCartItem({
                sale_id: saleId,
                id,
                created_at,
            });

            Alert.alert("SUCCESSO!", "Adicionado ao carrinho com successo.");
            navigation.back();
        } catch (error) {
            console.error(error);
            Alert.alert("Falha!", "Falha ao adiconar ao carrinho.");
        }
    }

    useEffect(() => {
        getData();
    }, []);

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
                    <Header photo={product?.photo} />

                    <View style={styles.column}>
                        <Text style={styles.label}>Nome do Produto</Text>
                        <TextInput
                            readOnly={true}
                            style={styles.input}
                            value={product?.name}
                        />
                        <Text style={styles.label}>Lucro da venda:</Text>
                        <TextInput
                            readOnly={true}
                            style={styles.input}
                            value={`${
                                Number(sale?.price) -
                                Number(product?.acquisition_price) *
                                    Number(sale?.amount)
                            } MT`}
                        />
                        <Text style={styles.label}>Quantidade da venda</Text>
                        <TextInput
                            readOnly={true}
                            value={String(sale?.amount)}
                            style={styles.input}
                        />
                        <View style={styles.label_row}>
                            <Text style={styles.label}>Preço da Venda</Text>

                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#555",
                                }}
                            >
                                (Preço do Produto x Quantidade da Venda)
                            </Text>
                        </View>
                        <TextInput
                            readOnly={true}
                            style={styles.input}
                            value={`${String(sale?.price)} MT`}
                        />

                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => printToFile()}
                            >
                                {isPrinting ? (
                                    <ActivityIndicator size={20} color="#fff" />
                                ) : (
                                    <Text style={styles.btn_text}>
                                        Gerar Fatura
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    ...styles.btn,
                                    backgroundColor: "dodgerblue",
                                }}
                                onPress={() => handleAddItemToCart()}
                            >
                                <Text style={styles.btn_text}>
                                    {!loadingAddingInvoiceToCart ? (
                                        "Adicionar ao Carrinho de Faturas"
                                    ) : (
                                        <ActivityIndicator
                                            color={"#fff"}
                                            size={20}
                                        />
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
