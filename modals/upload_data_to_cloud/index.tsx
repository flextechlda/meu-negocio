import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useCallback, useState } from "react";
import {
    GetQuerieDataToSendToCloudCount,
    SendDataToCloud,
} from "@/models/DataToSendToCloud";
import { useFocusEffect } from "expo-router";
import { checkConnectivity } from "@/utils/check_internet_conection";

export const UploadDataToCloudModal = ({
    isModalVisible,
    closeModal,
}: {
    isModalVisible: boolean;
    closeModal: () => void;
}) => {
    const [sendingDataToCloud, setSendingDataToCloud] = useState(false);
    const [dataToSendToCloudCount, setDataToSendToCloudCount] = useState(0);

    async function handleSendDataToCloud() {
        if (sendingDataToCloud) return;
        await GetQuerieDataToSendToCloudCount();
        let count = await GetQuerieDataToSendToCloudCount();
        setDataToSendToCloudCount(count);

        let hasInternetAccess = await checkConnectivity();

        if (!hasInternetAccess) {
            Alert.alert(
                "Atenção!",
                "Não há conexão com a internet, ligue os dados moveis e tente novamente!."
            );
            closeModal();
            return;
        }

        if (count <= 0) {
            Alert.alert(
                "Atenção!",
                "Não há novos dados para serem enviados para a nuvem."
            );
            closeModal();
            return;
        }

        setSendingDataToCloud(true);

        try {
            await SendDataToCloud();

            setTimeout(() => {
                Alert.alert("Atenção!", "Os dados foram salvos na nuvem!.");
                setDataToSendToCloudCount(0);
                closeModal();
            }, 500);
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Erro!",
                "Ocorreu um erro ao enviar os dados para a nuvem, tente novamente ou ligue para o suporte."
            );
            setSendingDataToCloud(false);
            return;
        }

        setSendingDataToCloud(false);
    }

    async function getDataToSendToCloudCount() {
        let result = await GetQuerieDataToSendToCloudCount();
        setDataToSendToCloudCount(result);
    }

    useFocusEffect(
        useCallback(() => {
            getDataToSendToCloudCount();
        }, [])
    );

    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.h1}>
                        {sendingDataToCloud
                            ? "Não Saia desta tela!"
                            : "Atenção!"}
                    </Text>

                    {sendingDataToCloud ? (
                        <View />
                    ) : (
                        <TouchableOpacity
                            style={styles.close}
                            onPress={() => {
                                closeModal();
                            }}
                        >
                            <MaterialIcons
                                name="close"
                                color={"#fff"}
                                size={25}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.p}>
                    Dados a serem enviados: {dataToSendToCloudCount}
                </Text>
                <Text style={styles.p}>
                    Ligue os dados moveis para poder guardar os seus dados na
                    nuvem!
                </Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleSendDataToCloud()}
                >
                    <Text style={styles.btn_text}>
                        {sendingDataToCloud ? (
                            <ActivityIndicator size={20} color="#fff" />
                        ) : (
                            "Guardar dados na nuvem"
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
