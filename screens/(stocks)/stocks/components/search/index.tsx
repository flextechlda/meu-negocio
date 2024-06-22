import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export const Search = ({
    setSearch,
    search,
}: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <View style={styles.input_box}>
            <TouchableOpacity>
                <MaterialIcons name="search" size={25} color={Colors?.gray} />
            </TouchableOpacity>

            <TextInput
                placeholderTextColor={Colors?.gray}
                value={search}
                keyboardType="default"
                style={styles.input}
                placeholder="Pesquise o seu estoque aqui"
                onChangeText={(text) => setSearch(text)}
            />
        </View>
    );
};
