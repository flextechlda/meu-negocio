import { View } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { SendCodeToEmail } from "./components/send_code_to_email";
import { RedifinePassword } from "./components/redifine_password";

export function ForgotPasswordScreen() {
    const [code, setCode] = useState("");
    const [sentCodeToEmail, setSentCodeToEmail] = useState(false);
    const [Email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            {sentCodeToEmail === false ? (
                <SendCodeToEmail
                    setEmail={setEmail}
                    email={Email}
                    goToResetPassword={(code: string) => {
                        setCode(code);
                        setSentCodeToEmail(true);
                    }}
                />
            ) : (
                <RedifinePassword
                    email={Email}
                    code={code}
                    goBack={() => setSentCodeToEmail(false)}
                />
            )}
        </View>
    );
}
