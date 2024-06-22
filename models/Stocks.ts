import { IStock } from "@/interfaces";
import * as SQLite from "expo-sqlite";
import { RegisterQuerieDataToSendToCloud } from "./DataToSendToCloud";

async function RegisterStock({
    name,
    id,
    user_id,
}: {
    name: string;
    id: string;
    user_id: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into stocks (id, name, created_at, user_id) values (?, ?, ?, ?);`,
            [id, name, created_at, user_id]
        );
    });

    await RegisterQuerieDataToSendToCloud({
        querie: `
            insert into stocks (
                id, 
                name, 
                created_at, 
                user_id
            ) 
            values (
                '${id}', 
                '${name}', 
                '${created_at}', 
                '${user_id}'
            );
        `,
        created_at: created_at,
    });
}

async function GetAllStocks() {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let data = [] as IStock[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from stocks order by created_at DESC;",
            []
        );

        data = rows as IStock[];
    });

    return data;
}

export { RegisterStock, GetAllStocks };
