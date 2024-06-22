import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "./styles";
import { Header } from "@/components/header";
import { ProductCount } from "./components/product_count";
import { Item } from "./components/item";
import { Colors } from "@/constants/Colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { GetAllProductsCount, GetAllSalesCount, GetLastSales } from "@/models";
import { AuthContext } from "@/context/AuthContext";
import { ISale } from "@/interfaces";
import { CartProductCount } from "./components/cart_count";
import { ModalComponent } from "./components/modal";

export const HomeScreen = () => {
    const [lastSales, setLastSales] = useState([] as ISale[]);
    const [productsCount, setProductsCount] = useState(0);
    const [salesCount, setSalesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigation = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);


    async function getSalesAndProductsCount() {
        setLoading(true);
        let user_id = user?.id as string;

        try {
            let product_count = await GetAllProductsCount({ user_id: user_id });
            let sales_count = await GetAllSalesCount({ user_id: user_id });

            setProductsCount(product_count);
            setSalesCount(sales_count);
        } catch (error) {
            console.error(error);
        }
    }
    async function getSales() {
        let user_id = user?.id as string;

        try {
            let result = await GetLastSales({ user_id: user_id });
            setLastSales(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function getData() {
        setLoading(true);

        await getSales();
        await getSalesAndProductsCount();

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            getData();
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
                    <CartProductCount 
                        openModal={() => setModalVisible(true)}/>

                    <ProductCount
                        salesCount={salesCount}
                        productsCount={productsCount}
                    />

                    {lastSales?.length > 0 && (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.span1}>
                                    Ultimas vendas efectuadas
                                </Text>

                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.push("/(tabs)/sales")
                                    }
                                >
                                    <Text style={styles.span2}>Ver todas</Text>
                                </TouchableOpacity>
                            </View>

                            {lastSales?.map((data, index) => {
                                return <Item data={data} key={index} />;
                            })}
                        </>
                    )}
                </ScrollView>
            )}

            
<ModalComponent
                        isModalVisible={isModalVisible}
                        closeModal={() => setModalVisible(false)}
                    />
        </View>
    );
};
