import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export const Header = ({ image }: { image: string }) => {
    const navigation = useRouter();

    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: image ? image : undefined }}
        >
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.back()}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={30}
                        color={Colors?.gray}
                    />
                </TouchableOpacity>

                <Text style={styles.text}>Adicionar Venda</Text>

                <View></View>
            </View>
        </ImageBackground>
    );
};
