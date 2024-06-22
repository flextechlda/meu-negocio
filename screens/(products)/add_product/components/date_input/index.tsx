import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from '@mohalla-tech/react-native-date-time-picker';

export const DateModal = ({
    isModalVisible,
    setExpirationDate,
    closeModal,
}: {
    isModalVisible: boolean;
    closeModal: () => void;
    setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const initialDate = new Date();


    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.h1}>Data de expiracão:</Text>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => closeModal()}
                    >
                        <MaterialIcons name="close" color={"#fff"} size={25} />
                    </TouchableOpacity>
                </View>
                
                <DateTimePicker mode="date" initialValue={initialDate} onChange={(selectedDate: Date) => setExpirationDate(selectedDate.toISOString()
            .slice(0, 19)
            .replace("T", " "))} setError={ (err: string) => {
                            throw new Error(err);
                        } } />
            </View>
        </Modal>
    );
};
