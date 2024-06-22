import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { GetAllSalesCartCount, GetAllInvoiceCartCount } from "@/models";

export const CartProductCount = ({ openModal }: { openModal: () => void }) => {
    const [count, setCount] = useState(0);

    async function getCounts() {
        try {
            let result = await GetAllSalesCartCount();
            let result2 = await GetAllInvoiceCartCount();

            let _count = result + result2;

            setCount(_count);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getCounts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.span1}>Itens no carrinho: {count}</Text>

                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.span2}>Ver todos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
