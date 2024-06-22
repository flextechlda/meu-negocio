import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Header = () => {
    const navigation = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.back()}
            >
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color="#fff"
                />
            </TouchableOpacity>

            <View></View>
        </View>
    );
};
