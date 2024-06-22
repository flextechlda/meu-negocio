import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { styles } from "./styles";
import { Header } from "@/components/header";
import { Item } from "./components/item";
import { Search } from "./components/search";
import { useCallback, useState } from "react";
import { GetAllStocks } from "@/models";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { IStock } from "@/interfaces";

export const StocksScreen = () => {
    const [stocks, setStocks] = useState([] as IStock[]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    async function getStocks() {
        setLoading(true);

        try {
            let result = await GetAllStocks();
            setStocks(result);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            getStocks();
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
                    {stocks?.length > 0 && (
                        <View style={styles.column}>
                            <Search search={search} setSearch={setSearch} />
                            <Text style={styles.span}>
                                Registro de estoques
                            </Text>

                            {stocks
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
                                    return <Item data={data} key={index} />;
                                })}
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};
