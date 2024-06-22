import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/api";
import { CreateTables } from "@/models";

export default function InitiaScreen() {
    const navigation = useRouter();
    const { checkAuthState } = useContext(AuthContext);

    async function checkAuthentication() {
        let { isSignedIn } = await checkAuthState();

        if (isSignedIn) {
            navigation.replace("/(tabs)/home");
        } else {
            navigation.replace("/auth/signin/");
        }
    }

    async function createTablesIfExist() {
        try {
            await CreateTables();

            checkAuthentication();
        } catch (error) {
            console.error("\nError Creating Tables If Not Exist:");
            console.error("\nError: ", error);
        }
    }

    async function veifyVersion() {
        try {
            let response = await api.get("/api/current-mobile-app-version");

            if (response.data?.current_mobile_app_version != "1.0.8") {
                navigation.replace({
                    pathname: "/update_app/",
                    params: {
                        link: response.data?.download_link,
                    },
                });
                return;
            }
        } catch (error) {
            console.error(
                "Error verifying the current mobile app version: ",
                error
            );
        }

        createTablesIfExist();
    }

    useEffect(() => {
        veifyVersion();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size={30} color={Colors?.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
