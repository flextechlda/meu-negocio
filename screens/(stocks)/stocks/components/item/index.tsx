import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { IStock } from "@/interfaces";

interface IProps {
    data: IStock;
}

export const Item = ({ data }: IProps) => {
    const navigation = useRouter();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.push({
                    pathname: "/(stocks)/stock",
                    params: {
                        id: data?.id,
                        name: data?.name,
                    },
                })
            }
        >
            <Text style={styles.span}>{data?.name}</Text>
        </TouchableOpacity>
    );
};
