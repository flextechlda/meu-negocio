import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";

export const ModalComponent = ({
    isModalVisible,
    closeModal,
}: {
    isModalVisible: boolean;
    closeModal: () => void;
}) => {
    const router = useRouter();

    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.h1}>Escolher o carrinho:</Text>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => closeModal()}
                    >
                        <MaterialIcons name="close" color={"#fff"} size={25} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        closeModal();
                        router.push("/(sales_cart)/cart_items");
                    }}
                >
                    <Text style={styles.btn_text}>
                        Abrir carrinho de vendas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        closeModal();
                        router.push("/(invoice_cart)/cart_items");
                    }}
                >
                    <Text style={styles.btn_text}>
                        Abrir carrinho de faturas
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
