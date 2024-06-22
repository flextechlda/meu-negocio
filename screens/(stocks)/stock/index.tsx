import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Search } from "./components/search";
import { Product } from "./components/product";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { GetAllProductsByStockID } from "@/models";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { IProduct } from "@/interfaces";

export const StockScreen = () => {
    const [products, setProducts] = useState([] as IProduct[]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { id } = useLocalSearchParams();

    async function getProducts() {
        setLoading(true);

        let stock_id = id as string;

        try {
            let result = await GetAllProductsByStockID({ stock_id: stock_id });
            setProducts(result);
        } catch (error) {
            Alert.alert("Erro!", "Erro ao pesquisar produtos!");
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getProducts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Header products={products} />

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
                        <Search search={search} setSearch={setSearch} />

                        {products
                            ?.filter((data) => {
                                return search.trim() !== ""
                                    ? data?.name
                                          ?.toLocaleLowerCase()
                                          ?.includes(
                                              search?.toLocaleLowerCase()
                                          )
                                    : data;
                            })
                            .map((data, index) => {
                                return <Product data={data} key={index} />;
                            })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
