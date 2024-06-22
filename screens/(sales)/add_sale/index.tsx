import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IProduct } from "@/interfaces";
import {
    GetProductByID,
    RegisterSaleCartItem,
    ShrinkProductAmount,
} from "@/models";
import ShortUniqueId from "short-unique-id";
import { AuthContext } from "@/context/AuthContext";
import { RegisterSale } from "@/models/Sales";

export const AddSaleScreen = () => {
    const [salePrice, setSalePrice] = useState(0);
    const [loadingSaleCretion, setLoadingSaleCretion] = useState(false);
    const [amount, setAmount] = useState("1");
    const { product_id } = useLocalSearchParams();
    const [product, setProduct] = useState({} as IProduct);
    const { user } = useContext(AuthContext);
    const navigation = useRouter();

    async function getProduct() {
        let id = product_id as string;

        try {
            let result = await GetProductByID({ product_id: id });
            setProduct(result);
            setSalePrice(Number(result?.sale_price));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAddItemToCart() {
        try {
            let { randomUUID } = new ShortUniqueId({ length: 30 });
            let id = randomUUID();
            let productId = product_id as string;
            let created_at = new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            await RegisterSaleCartItem({
                product_id: productId,
                id,
                created_at,
                price: `${salePrice * Number(amount)}`,
                amount: amount,
            });

            Alert.alert("SUCCESSO!", "Adicionado ao carrinho com successo.");
            navigation.back();
        } catch (error) {
            console.error(error);
            Alert.alert("Falha!", "Falha ao adiconar ao carrinho.");
        }
    }

    async function handleSaleCreation() {
        if (salePrice == 0) return;

        setLoadingSaleCretion(true);

        let { randomUUID } = new ShortUniqueId({ length: 30 });
        let id = randomUUID();
        let user_id = user?.id as string;
        let productId = product_id as string;
        let product_data = await GetProductByID({ product_id: productId });

        if (amount > product_data?.amount) {
            Alert.alert(
                "Alerta!",
                `A quantidade da venda: (${amount}), é maior que a quantidade restante do produto: ${product_data?.name}  -  (${product_data?.amount})! `
            );
            setLoadingSaleCretion(false);
            return;
        }

        let result = await ShrinkProductAmount({
            product_id: productId,
            sale_amount: amount,
        });
        if (result.rowsAffected <= 0) {
            Alert.alert(
                "Alerta!",
                `Quantidade do produto: ${product_data?.name}  -  (${product_data?.amount}) não foi diminuida! `
            );
            setLoadingSaleCretion(false);
            return;
        }

        try {
            await RegisterSale({
                user_id: user_id,
                id: id,
                price: `${salePrice * Number(amount)}`,
                amount: amount,
                product_id: productId,
                stock_id: product?.stock_id,
            });

            Alert.alert("SUCCESSO!", "Venda adiconada com successo.");
            navigation.back();
        } catch (error) {
            console.error(error);
            Alert.alert("Falha!", "Falha ao adiconar venda.");
        }

        setLoadingSaleCretion(false);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
            <ScrollView>
                <Header image={product?.photo} />

                <View style={styles.column}>
                    <View style={{ width: "100%" }}>
                        <Text style={styles.p}>
                            Preço de venda:{" "}
                            <Text style={styles.span}>
                                {salePrice * Number(amount)} MT
                            </Text>
                        </Text>

                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder="Ex: 10"
                            value={amount}
                            onChangeText={(text) => setAmount(text)}
                        />
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    width: "100%",
                    padding: 15,
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleSaleCreation()}
                >
                    <Text style={styles.btn_text}>
                        {!loadingSaleCretion ? (
                            "Criar Venda"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.btn, backgroundColor: "dodgerblue" }}
                    onPress={() => handleAddItemToCart()}
                >
                    <Text style={styles.btn_text}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
