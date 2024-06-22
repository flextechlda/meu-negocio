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
import { ISaleCart } from "@/interfaces";
import ShortUniqueId from "short-unique-id";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import {
    DeleteSaleCartItem,
    GetProductByID,
    RegisterSale,
    ShrinkProductAmount,
} from "@/models";

export const Header = ({
    cartItems,
    reloadCart,
}: {
    cartItems: ISaleCart[];
    reloadCart(): void;
}) => {
    const navigation = useRouter();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    async function sellItems() {
        if (loading) return;
        if (cartItems?.length <= 0) {
            Alert.alert("Alerta!", "O Carrinho Está Vazio!");
            return;
        }

        setLoading(true);

        for (let index = 0; index < cartItems.length; index++) {
            reloadCart();
            let { randomUUID } = new ShortUniqueId({ length: 30 });
            let id = randomUUID();
            let user_id = user?.id as string;
            let productId = cartItems[index]?.product_id;
            let sale_amount = cartItems[index]?.amount;
            let sale_price = cartItems[index]?.price;
            let product_data = await GetProductByID({ product_id: productId });

            if (sale_amount > product_data?.amount) {
                Alert.alert(
                    "Alerta!",
                    `A quantidade da venda do produto ${product_data?.name}: (${sale_amount}), é maior que a quantidade restante do mesmo produto: (${product_data?.amount})! `
                );
                setLoading(false);
                reloadCart();
                break;
            } else {
                let result = await ShrinkProductAmount({
                    product_id: productId,
                    sale_amount: sale_amount,
                });

                if (result.rowsAffected <= 0) {
                    Alert.alert(
                        "Alerta!",
                        `Quantidade do produto: ${product_data?.name}  -  (${product_data?.amount}) não foi diminuida! `
                    );
                    setLoading(false);
                    reloadCart();
                    break;
                }
                try {
                    await RegisterSale({
                        user_id: user_id,
                        id: id,
                        price: sale_price,
                        amount: sale_amount,
                        product_id: productId,
                        stock_id: product_data?.stock_id,
                    });

                    await DeleteSaleCartItem({
                        sale_cart_id: cartItems[index]?.id,
                    });
                    reloadCart();

                    console.log(`Sale with ID: ${id} added successfuly!`);
                } catch (error) {
                    console.error("Error adding sale: ", error);
                    Alert.alert("Falha!", "Falha ao adiconar venda.");
                    setLoading(false);
                    reloadCart();
                    break;
                }
            }
        }

        setLoading(false);
        reloadCart();
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
                        <Text style={styles.span}>Vender</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};
