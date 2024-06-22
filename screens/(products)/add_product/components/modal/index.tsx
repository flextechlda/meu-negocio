import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export const ModalComponent = ({
    isModalVisible,
    setBase64Image,
    closeModal,
}: {
    isModalVisible: boolean;
    closeModal: () => void;
    setBase64Image: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [launchingLibrary, setLaunchingLibrary] = useState(false);
    const [launchingCamera, setLaunchingCamera] = useState(false);

    const pickImageFromLibrary = async () => {
        setLaunchingLibrary(true);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            let image = result?.assets[0]?.base64 as string;

            setBase64Image(`data:image/jpeg;base64,${image}`);
        }

        setLaunchingLibrary(false);
        closeModal();
    };

    const pickImageFromCamera = async () => {
        setLaunchingCamera(true);

        let { status } = await Camera.requestCameraPermissionsAsync();

        if (status === "granted") {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                let image = result?.assets[0]?.base64 as string;

                setBase64Image(`data:image/png;base64,${image}`);
                setLaunchingCamera(false);
                closeModal();
            }
        } else {
            Alert.alert(
                "Alerta!",
                "O app não tem permissão para accessar a camera."
            );
        }

        setLaunchingCamera(false);
    };

    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.h1}>Escolher a Imagem:</Text>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => closeModal()}
                    >
                        <MaterialIcons name="close" color={"#fff"} size={25} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => pickImageFromLibrary()}
                >
                    <Text style={styles.btn_text}>
                        {!launchingLibrary ? (
                            "Abrir biblioteca de Imagens"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.btn, display: "none" }}
                    onPress={() => pickImageFromCamera()}
                >
                    <Text style={styles.btn_text}>
                        {!launchingCamera ? (
                            "Abrir Camera"
                        ) : (
                            <ActivityIndicator color={"#fff"} size={20} />
                        )}{" "}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
