import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Search } from "./components/search";
import { Product } from "./components/product";
import { Colors } from "@/constants/Colors";
import { useCallback, useContext, useState } from "react";
import { GetAllProducts } from "@/models";
import { useFocusEffect } from "expo-router";
import { IProduct } from "@/interfaces";
import { AuthContext } from "@/context/AuthContext";

export const ListAllProductsScreen = () => {
    const [products, setProducts] = useState([] as IProduct[]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { user } = useContext(AuthContext);

    async function getProducts() {
        setLoading(true);

        let user_id = user?.id as string;

        try {
            let result = await GetAllProducts({ user_id: user_id });
            setProducts(result);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro!", "Erro ao pesquisar produtos!");
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
