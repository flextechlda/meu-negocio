import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Header = ({
    product_id,
    photo,
}: {
    product_id: string;
    photo: string;
}) => {
    const navigation = useRouter();

    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: photo ? photo : undefined }}
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

                <View style={{ flexDirection: "row", gap: 15 }}>
                    <TouchableOpacity
                        style={styles.text_btn}
                        onPress={() =>
                            navigation.push({
                                pathname: "/(sales)/add_sale",
                                params: {
                                    product_id: product_id,
                                },
                            })
                        }
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: 14,
                            }}
                        >
                            Adicionar Venda
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.push({
                                pathname: "/(products)/add_product_amount",
                                params: {
                                    product_id: product_id,
                                },
                            })
                        }
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: 14,
                            }}
                        >
                            +1
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};
