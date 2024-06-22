import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { IProduct, IInvoiceCart, ISale } from "@/interfaces";
import { useEffect, useState } from "react";
import { DeleteInoviceCartItem, GetProductByID, GetSaleByID } from "@/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
    data: IInvoiceCart;
    reloadCart: () => void;
}

export const Sale = ({ data, reloadCart }: IProps) => {
    const [product, setProduct] = useState({} as IProduct);
    const [sale, setSale] = useState({} as ISale);
    const navigation = useRouter();

    async function getProduct(product_id: string) {
        try {
            let result = await GetProductByID({ product_id: product_id });

            setProduct(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function getSale() {
        try {
            let result = await GetSaleByID({ sale_id: data?.sale_id });

            setSale(result);

            getProduct(result?.product_id);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete() {
        try {
            await DeleteInoviceCartItem({ invoice_cart_id: data?.id });

            Alert.alert("SUCCESSO!", "Item deletado do carrinho com successo.");
            reloadCart();
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Erro",
                "Ocorreu um erro ao deletar o item do carrinho!"
            );
        }
    }

    useEffect(() => {
        getSale();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", flex: 1, gap: 10 }}>
                <Image
                    style={styles.image}
                    source={{
                        uri: product?.photo ? product?.photo : undefined,
                    }}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.span1}>{product?.name}</Text>
                    <Text style={styles.span3}>{sale?.price} MT</Text>
                    <Text style={styles.span2}>
                        Quantidade da venda: {sale?.amount}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => handleDelete()}>
                <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    color={"#fff"}
                />
            </TouchableOpacity>
        </View>
    );
};
