import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { IProduct, ISaleCart } from "@/interfaces";
import { useEffect, useState } from "react";
import { DeleteSaleCartItem, GetProductByID } from "@/models";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
    data: ISaleCart;
    reloadCart: () => void;
}

export const Product = ({ data, reloadCart }: IProps) => {
    const [product, setProduct] = useState({} as IProduct);
    const navigation = useRouter();

    async function getProduct() {
        try {
            let result = await GetProductByID({ product_id: data?.product_id });

            setProduct(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete() {
        try {
            await DeleteSaleCartItem({ sale_cart_id: data?.id });

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
        getProduct();
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
                    <Text style={styles.span3}>{data?.price} MT</Text>
                    <Text style={styles.span2}>
                        Quantidade da venda: {data?.amount}
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
