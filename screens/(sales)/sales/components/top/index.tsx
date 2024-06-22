import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useFocusEffect, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { GetProductByID, GetSalesFromToday } from "@/models";

export function Top() {
    const navigation = useRouter();

    const [profit, setProfit] = useState(0);
    const { user } = useContext(AuthContext);

    async function getSales() {
        let user_id = user?.id as string;

        try {
            let sales = await GetSalesFromToday({ user_id: user_id });

            let total_profit = 0;

            for (let i = 0; i < sales.length; i++) {
                // sale_price price is the sale price of the prodcut times the amount being sold
                let sale_price = sales[i]?.price as unknown as number;

                let product = await GetProductByID({
                    product_id: sales[i]?.product_id,
                });

                let acquisition_price_times_sale_amount =
                    Number(product?.acquisition_price) *
                    Number(sales[i]?.amount);
                let _profit = sale_price - acquisition_price_times_sale_amount;

                total_profit += _profit;
            }

            setProfit(total_profit);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSales();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.back()}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={35}
                        color="#444"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn2}
                    onPress={() =>
                        navigation.push("/(products)/list_all_products")
                    }
                >
                    <Text style={styles.text_btn}>Adicionar Venda</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <Text style={styles.h1}>Lucro do Dia</Text>
                <Text style={styles.span}>{profit} MT</Text>
            </View>
        </View>
    );
}
