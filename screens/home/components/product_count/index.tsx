import { Text, View } from "react-native";

import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export const ProductCount = ({
    salesCount,
    productsCount,
}: {
    salesCount: number;
    productsCount: number;
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.row}>
                    <FontAwesome
                        name="bar-chart-o"
                        size={20}
                        color={Colors?.gray}
                    />
                    <Text style={styles.span}>{productsCount}</Text>
                </View>

                <Text style={styles.text}>Produtos</Text>
            </View>

            <View style={styles.box}>
                <View style={styles.row}>
                    <FontAwesome name="star" size={20} color={Colors?.gray} />
                    <Text style={styles.span}>{salesCount}</Text>
                </View>

                <Text style={styles.text}>Total Vendido</Text>
            </View>
        </View>
    );
};
