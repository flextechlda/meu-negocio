import { ActivityIndicator, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Product } from "./components/product";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { GetAllSalesCartItems } from "@/models";
import { useFocusEffect } from "expo-router";
import { ISaleCart } from "@/interfaces";

export const SalesCartItemsScreen = () => {
    const [cartItems, setCartItems] = useState([] as ISaleCart[]);
    const [loading, setLoading] = useState(true);

    async function GetItems() {
        setLoading(true);

        try {
            let result = await GetAllSalesCartItems();
            setCartItems(result);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    function reloadCart() {
        setLoading(true);
        GetItems();
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            GetItems();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Header cartItems={cartItems} reloadCart={reloadCart} />

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
                    <View style={styles.column}>
                        {cartItems.map((data, index) => {
                            return (
                                <Product
                                    data={data}
                                    key={index}
                                    reloadCart={() => reloadCart()}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
