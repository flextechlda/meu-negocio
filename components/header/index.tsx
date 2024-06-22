import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFocusEffect, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import {
    GetAllProductsWithAmountAlert,
    GetAllProductsWithExpirationAlert,
} from "@/models";
import { UploadDataToCloudModal } from "@/modals/upload_data_to_cloud";
import { GetQuerieDataToSendToCloudCount } from "@/models/DataToSendToCloud";

export const Header = () => {
    const navigatiuon = useRouter();
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [pendingDataToSendToCloud, setPendingDataToSendToCloud] =
        useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { user } = useContext(AuthContext);

    async function getProducts() {
        setNotificationsVisible(false);
        let user_id = user?.id as string;

        try {
            let result = await GetAllProductsWithAmountAlert({
                user_id: user_id,
            });
            let result2 = await GetAllProductsWithExpirationAlert({
                user_id: user_id,
            });
            let count = await GetQuerieDataToSendToCloudCount();

            let product_count = result?.length + result2?.length;
            setPendingDataToSendToCloud(count > 0 ? true : false);
            setNotificationsVisible(product_count > 0 ? true : false);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProducts();
        }, [])
    );

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("./assets/user.png")}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.span1}>
                        Bem vindo {user?.username?.split(" ")[0]}
                    </Text>
                    <Text style={styles.span2}>É um prazer recebe-lo</Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        navigatiuon.push("/(alerts)/alerts");
                    }}
                >
                    <MaterialIcons
                        name="notifications"
                        size={20}
                        color={Colors?.white}
                    />
                    {notificationsVisible && (
                        <View style={styles.notification_on} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setIsModalVisible(true)}
                >
                    <MaterialIcons
                        name="upload-file"
                        size={20}
                        color={Colors?.white}
                    />

                    {pendingDataToSendToCloud && (
                        <View style={styles.notification_on} />
                    )}
                </TouchableOpacity>
            </View>

            <UploadDataToCloudModal
                isModalVisible={isModalVisible}
                closeModal={() => {
                    setIsModalVisible(false);
                    getProducts();
                }}
            />
        </>
    );
};
