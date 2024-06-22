import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/interfaces";

type AuthContextType = {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    user: IUser | null;
    checkAuthState(): Promise<{
        isSignedIn: boolean;
    }>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<IUser | null>(null);

    async function getDataStored() {
        let data = await AsyncStorage.getItem("meu-negocio.user.data");

        if (data != null) {
            setUser(JSON.parse(data));
        }
    }

    async function checkAuthState() {
        let data = await AsyncStorage.getItem("meu-negocio.user.data");

        if (data == null) {
            return { isSignedIn: false };
        } else {
            return { isSignedIn: true };
        }
    }

    useEffect(() => {
        getDataStored();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                checkAuthState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
