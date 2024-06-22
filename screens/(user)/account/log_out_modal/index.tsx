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
import { useState } from "react";
import {
    GetQuerieDataToSendToCloudCount,
    SendDataToCloud,
} from "@/models/DataToSendToCloud";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { DeleteAllTables } from "@/models";

export const LogOutModal = ({
    isModalVisible,
    closeModal,
}: {
    isModalVisible: boolean;
    closeModal: () => void;
}) => {
    const [chapter, setChapter] = useState(1);
    const [sendingDataToCloud, setSendingDataToCloud] = useState(false);
    const [dataToSendToCloudCount, setDataToSendToCloudCount] = useState(0);
    const navigation = useNavigation() as any;

    function handleCloseModal() {
        setChapter(1);
        closeModal();
    }

    async function handleLogOut() {
        setChapter(1);
        await GetQuerieDataToSendToCloudCount();
        let result = await GetQuerieDataToSendToCloudCount();

        if (result <= 0) {
            // droping all tables
            try {
                await DeleteAllTables();
            } catch (error) {
                console.error(error);
            }

            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: "index" }],
            });
        } else {
            Alert.alert(
                "Erro!",
                `Ainda existem dados para serem enviados a nuvem Total: ${result}, tente novamente ou ligue para o suporte.`
            );
        }
    }

    async function verifyIfUserIsAbleToLogOut() {
        await GetQuerieDataToSendToCloudCount();
        let result = await GetQuerieDataToSendToCloudCount();

        if (result <= 0) {
            handleLogOut();
        } else {
            setDataToSendToCloudCount(result);
            setChapter(2);
        }
    }

    async function handleSendDataToCloud() {
        if (sendingDataToCloud) return;

        setSendingDataToCloud(true);

        try {
            await SendDataToCloud();

            setTimeout(async () => {
                await verifyIfUserIsAbleToLogOut();
                await verifyIfUserIsAbleToLogOut();
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

    return (
        <Modal isVisible={isModalVisible}>
            {chapter == 1 ? (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.h1}>Deseja terminar a sessão?</Text>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={() => {
                                handleCloseModal();
                            }}
                        >
                            <MaterialIcons
                                name="close"
                                color={"#fff"}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => verifyIfUserIsAbleToLogOut()}
                    >
                        <Text style={styles.btn_text}>Terminar Sessão</Text>
                    </TouchableOpacity>
                </View>
            ) : (
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
                                    handleCloseModal();
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
                        Ligue os dados moveis para poder guardar os seus dados
                        na nuvem!
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
            )}
        </Modal>
    );
};
