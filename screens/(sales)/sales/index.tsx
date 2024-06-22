import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { styles } from "./styles";
import { Top } from "./components/top";
import { Sale } from "./components/sale";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { ISale } from "@/interfaces";
import { GetAllSales } from "@/models";
import { AuthContext } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";

export function SalesScreen() {
    const [sales, setSales] = useState([] as ISale[]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    async function getSales() {
        setLoading(true);

        let user_id = user?.id as string;

        try {
            let result = await GetAllSales({ user_id: user_id });
            setSales(result);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro!", "Erro ao pesquisar por vendas!");
        }

        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    useFocusEffect(
        useCallback(() => {
            getSales();
        }, [])
    );
    return (
        <View style={styles.container}>
            <ScrollView>
                <Top />

                {loading ? (
                    <View
                        style={{
                            height: 400,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ActivityIndicator size={30} color={Colors?.primary} />
                    </View>
                ) : (
                    <View style={styles.bottom}>
                        <Text style={styles.span}>Registro de vendas:</Text>

                        {sales.map((data, index) => {
                            return <Sale data={data} key={index} />;
                        })}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
