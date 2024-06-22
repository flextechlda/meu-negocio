import { TouchableOpacity, Text, View } from "react-native";

import { styles } from "./styles";
import { Colors } from "@/constants/Colors";

export const Selection = ({ selected, setSelected }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.btn,
                    backgroundColor: selected == 0 ? Colors?.primary : "#555",
                }}
                onPress={() => setSelected(0)}
            >
                <Text style={styles.txt}>Alerta de expiração</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.btn,
                    backgroundColor: selected == 1 ? Colors?.primary : "#555",
                }}
                onPress={() => setSelected(1)}
            >
                <Text style={styles.txt}>Alerta de quantidade</Text>
            </TouchableOpacity>
        </View>
    );
};
