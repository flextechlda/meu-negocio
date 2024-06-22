import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Header } from "@/components/header";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { LogOutModal } from "./log_out_modal";
export function AccountScreen() {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [isModalOpened, setIsModalOpened] = useState(false);

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.column}>
                <View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <MaterialCommunityIcons
                                    name="email"
                                    color={Colors?.gray}
                                    size={25}
                                />
                                <Text style={styles.span}>{user?.email}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() =>
                                    router.push("/(user)/alter_email")
                                }
                            >
                                <MaterialCommunityIcons
                                    name="pencil"
                                    color={"#fff"}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <MaterialCommunityIcons
                                    name="passport"
                                    color={Colors?.gray}
                                    size={25}
                                />
                                <Text style={styles.span}>**************</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() =>
                                    router.push("/(user)/alter_password")
                                }
                            >
                                <MaterialCommunityIcons
                                    name="pencil"
                                    color={"#fff"}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.logout_btn}
                    onPress={() => setIsModalOpened(true)}
                >
                    <MaterialCommunityIcons
                        name="logout"
                        color={"#fff"}
                        size={20}
                    />
                    <Text style={styles.logout_btn_txt}>LogOut</Text>
                </TouchableOpacity>
            </View>

            <LogOutModal
                closeModal={() => {
                    setIsModalOpened(false);
                }}
                isModalVisible={isModalOpened}
            />
        </View>
    );
}
