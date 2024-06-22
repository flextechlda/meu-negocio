import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Header = ({ photo }: { photo: string }) => {
    const navigation = useRouter();

    return (
        <ImageBackground
            source={{ uri: photo ? photo : undefined }}
            style={styles.container}
        >
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.back()}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={30}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
