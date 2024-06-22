import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { IProduct } from "@/interfaces";

interface IProps {
    data: IProduct;
}

export const Product = ({ data }: IProps) => {
    const navigation = useRouter();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.push({
                    pathname: "/(sales)/add_sale",
                    params: {
                        product_id: data?.id,
                    },
                })
            }
        >
            <Image
                style={styles.image}
                source={{ uri: data?.photo ? data?.photo : undefined }}
            />

            <View style={{ flex: 1 }}>
                <Text style={styles.span1}>{data?.name}</Text>
                <Text style={styles.span3}>{data?.sale_price} MT</Text>
                <Text style={styles.span2}>
                    Restaram: {data?.amount} Unidades
                </Text>
            </View>
        </TouchableOpacity>
    );
};
