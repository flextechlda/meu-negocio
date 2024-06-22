import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { IProduct, ISale } from "@/interfaces";
import { useEffect, useState } from "react";
import { GetProductByID } from "@/models";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IProps {
    data: ISale;
}

export const Item = ({ data }: IProps) => {
    const navigation = useRouter();
    const [product, setProduct] = useState({} as IProduct);

    function formatDate(timestamp: string | undefined) {
        if (timestamp) {
            const formattedDate = format(
                new Date(`${timestamp}`),
                "dd '/' MMMM '/' yyyy",
                { locale: ptBR }
            );

            return formattedDate;
        }
        return "";
    }

    async function getProduct() {
        try {
            let result = await GetProductByID({ product_id: data?.product_id });
            setProduct(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.push({
                    pathname: "/(sales)/sale",
                    params: {
                        sale_id: data?.id,
                        product_id: data?.product_id,
                    },
                })
            }
        >
            <Image
                style={styles.image}
                source={{ uri: product?.photo ? product?.photo : undefined }}
            />

            <View style={{ flex: 1 }}>
                <Text style={styles.span1}>{product?.name}</Text>
                <Text style={styles.span2}>
                    {data?.amount}{" "}
                    {Number(data?.amount) <= 1 ? "Venda" : "Vendas"}
                </Text>
                <Text style={styles.span3}>{formatDate(data?.created_at)}</Text>
            </View>
        </TouchableOpacity>
    );
};
