import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.tabIconSelected,
                tabBarInactiveTintColor: Colors.tabIconDefault,
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 60,
                    paddingBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="stocks"
                options={{
                    title: "Estoques",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="list-alt" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="add_stock"
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: focused
                                    ? Colors?.tabIconSelected
                                    : Colors?.tabIconDefault,
                                borderRadius: 50,
                                marginTop: 24,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesome5
                                size={24}
                                name="plus"
                                color={"#fff"}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="sales"
                options={{
                    title: "Vendas",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="money" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Conta",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
