import { api } from "@/services/api";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import ShortUniqueId from "short-unique-id";

interface IDataToSendToCloud {
    id: string;
    querie: string;
    created_at: string;
}

async function RegisterQuerieDataToSendToCloud({
    querie,
    created_at,
}: {
    querie: string;
    created_at: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let { randomUUID } = new ShortUniqueId({ length: 30 });
    let id = randomUUID();

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into data_to_send_to_cloud (
                    id,
                    querie,
                    created_at
                ) values (?, ?, ?);`,
            [id, querie, created_at]
        );
    });
}

async function GetQuerieDataToSendToCloudCount() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let total = 0;

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select count(*) as total from data_to_send_to_cloud;",
            []
        );

        total = rows[0]?.total;
    });

    return total;
}

async function SendDataToCloud() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let result = [] as IDataToSendToCloud[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from data_to_send_to_cloud order by id limit 5000;",
            []
        );
        result = rows as IDataToSendToCloud[];
    });

    result.forEach(async (data) => {
        let response = await api.post("/api/store-offline-data-in-cloud", {
            querie: data?.querie,
        });

        if (response.data?.success == true) {
            await db.transactionAsync(async (tx) => {
                await tx.executeSqlAsync(
                    "delete from data_to_send_to_cloud where id = ?;",
                    [data?.id]
                );
            });

            console.log(`Data with id: ${data?.id} was deleted!`);
        }
    });
}

export {
    RegisterQuerieDataToSendToCloud,
    SendDataToCloud,
    GetQuerieDataToSendToCloudCount,
};
