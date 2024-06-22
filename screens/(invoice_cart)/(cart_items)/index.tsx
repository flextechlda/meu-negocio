import { ActivityIndicator, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Sale } from "./components/sale";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { GetAllInvoiceCartItems } from "@/models";
import { useFocusEffect } from "expo-router";
import { IInvoiceCart } from "@/interfaces";

export const InvoiceCartItemsScreen = () => {
    const [cartItems, setCartItems] = useState([] as IInvoiceCart[]);
    const [loading, setLoading] = useState(true);

    async function getItems() {
        setLoading(true);

        try {
            let result = await GetAllInvoiceCartItems();
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
        getItems();
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getItems();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Header cartItems={cartItems} />

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
                                <Sale
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
