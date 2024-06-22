import {
    ActivityIndicator,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export const UpdateAppScreen = () => {
    const { link }: { link: string } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);

    async function downloadApp() {
        if (loading) return;
        setLoading(true);

        try {
            setLoading(false);
            await Linking.openURL(link);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.p}>O aplicativo está desatualizado!</Text>
            <TouchableOpacity style={styles.btn} onPress={() => downloadApp()}>
                <Text style={styles.btn_text}>
                    {loading ? (
                        <ActivityIndicator color={"#333"} size={20} />
                    ) : (
                        "Baixar a versão Atualizada"
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
