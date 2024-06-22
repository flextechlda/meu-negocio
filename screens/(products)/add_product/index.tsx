import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";
import { Header } from "./components/header";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ShortUniqueId from "short-unique-id";
import { RegisterProduct } from "@/models";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { ModalComponent } from "./components/modal";
import { DateModal } from "./components/date_input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const AddProductScreen = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [acquisitionPrice, setAcquisitionPrice] = useState("");
    const [alertQuantity, setAlertQuantity] = useState("");
    const [supplier, setSupplier] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const params = useLocalSearchParams();
    const navigation = useRouter();
    const { user } = useContext(AuthContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDateModalVisible, setDateModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    function formatDate(timestamp: string | undefined) {
        if (timestamp) {
            const formattedDate = format(
                new Date(`${timestamp}`),
                "dd '/' MMMM '/' yyyy",
                { locale: ptBR }
            );

            return formattedDate;
        }

        return "";
    }

    async function handleSubmit() {
        if (loading) return;
        if (
            !name.trim() ||
            !amount.trim() ||
            !salePrice.trim() ||
            !acquisitionPrice.trim() ||
            !alertQuantity.trim() ||
            !expirationDate.trim() ||
            !supplier.trim()
        ) {
            Alert.alert("Alerta!", "Preencha todos os campos!");
            return;
        }

        setLoading(true);

        let { randomUUID } = new ShortUniqueId({ length: 30 });
        let id = randomUUID();
        let user_id = user?.id as string;
        let stock_id = params?.stock_id as string;
        let created_at = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        try {
            await RegisterProduct({
                id: id,
                stock_id: stock_id,
                user_id: user_id,
                supplier: supplier,
                name: name,
                alert_quantity: alertQuantity,
                amount: amount,
                sale_price: salePrice,
                acquisition_price: acquisitionPrice,
                photo: base64Image ? base64Image : "",
                created_at: created_at,
                expiration_date: expirationDate
            });

            Alert.alert("SUCCESSO!", "Produto adiconado com successo.");
            navigation.back();
        } catch (error) {
            console.error(error);
            Alert.alert("Alerta!", "Falha ao registrar o produto.");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView>
                <View style={styles.column}>
                    <View style={{ width: "100%" }}>
                        <Text style={styles.label}>Nome do Produto</Text>
                        <TextInput
                            value={name}
                            keyboardType="default"
                            style={styles.input}
                            onChangeText={(text) => setName(text)}
                        />
                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={amount}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => setAmount(text)}
                        />
                        <Text style={styles.label}>Preço de Aquisição</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={acquisitionPrice}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => setAcquisitionPrice(text)}
                        />
                        <Text style={styles.label}>Preço de Venda</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            value={salePrice}
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={(text) => setSalePrice(text)}
                        />
                        <Text style={styles.label}>Fornecedor</Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            keyboardType="default"
                            style={styles.input}
                            placeholder="Ex: Loja da Paz"
                            value={supplier}
                            onChangeText={(text) => setSupplier(text)}
                        />
                        <Text style={styles.label}>
                            Quantidade Minima de Alerta
                        </Text>
                        <TextInput
                            placeholderTextColor={Colors?.gray}
                            keyboardType="numeric"
                            style={styles.input}
                            value={alertQuantity}
                            onChangeText={(text) => setAlertQuantity(text)}
                        />
                        <Text style={styles.label}>
                            Data de expiracão
                        </Text>
                        <TouchableOpacity
                                style={{...styles.input, flexDirection: 'row', alignItems:'center', gap: 10}}
                                onPress={() => setDateModalVisible(true)}
                            >
                                <MaterialIcons
                                    name="calendar-today"
                                    size={20}
                                    color={Colors?.gray}
                                />  
                                <Text style={{...styles.label, opacity: 0.9, fontSize: 14, fontWeight: 'normal'}}>
                                    {!loading ? expirationDate ? formatDate(expirationDate) :
                                        "Data de expiração"
                                     : (
                                        <ActivityIndicator color={"#fff"} size={20} />
                                    )}
                                </Text>
                            </TouchableOpacity>
                       


                        <Text style={styles.label}>Foto do Produto (Opcional)</Text>
                        {base64Image ? (
                            <>
                                <Image
                                    style={styles.photo}
                                    source={{
                                        uri: base64Image
                                            ? base64Image
                                            : undefined,
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.change}
                                    onPress={() => toggleModal()}
                                >
                                    <Text style={styles.change_txt}>
                                        Trocar Imagem
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={styles.photo_btn}
                                onPress={() => toggleModal()}
                            >
                                <MaterialIcons
                                    name="camera-alt"
                                    size={30}
                                    color={Colors?.gray}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.btn_text}>
                            {!loading ? (
                                "Adicionar"
                            ) : (
                                <ActivityIndicator color={"#fff"} size={20} />
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ModalComponent
                isModalVisible={isModalVisible}
                setBase64Image={setBase64Image}
                closeModal={() => setModalVisible(false)}
            />
            <DateModal
                isModalVisible={isDateModalVisible}
                setExpirationDate={setExpirationDate}
                closeModal={() => setDateModalVisible(false)}
            />
        </View>
    );
};
