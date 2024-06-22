import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { styles } from "./styles";
import { Product } from "./components/product";
import { Header } from "./components/header";
import { useCallback, useContext, useState } from "react";
import { IProduct } from "@/interfaces";
import {
    GetAllProductsWithAmountAlert,
    GetAllProductsWithExpirationAlert,
} from "@/models";
import { AuthContext } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { Selection } from "./components/selection";

export const AlertsScreen = () => {
    const [productsWithExpirationAlert, setProductsWithExpirationAlert] =
        useState([] as IProduct[]);
    const [productsAmountAlert, setProductsAmountAlert] = useState(
        [] as IProduct[]
    );
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [selected, setSelected] = useState(0);

    async function getProducts() {
        setLoading(true);

        let user_id = user?.id as string;

        try {
            let result = await GetAllProductsWithAmountAlert({
                user_id: user_id,
            });
            let result2 = await GetAllProductsWithExpirationAlert({
                user_id: user_id,
            });
            setProductsAmountAlert(result);
            setProductsWithExpirationAlert(result2);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            getProducts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Header />
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
                        <Selection
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Text style={styles.span}>
                            Produtos Com Alerta de{" "}
                            {selected == 0 ? "Expiração" : "Quantidade"}:
                        </Text>

                        {selected == 0
                            ? productsWithExpirationAlert.map((data, index) => {
                                  return <Product data={data} key={index} />;
                              })
                            : productsAmountAlert.map((data, index) => {
                                  return <Product data={data} key={index} />;
                              })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
