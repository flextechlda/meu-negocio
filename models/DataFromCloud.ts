import { IProduct, ISale } from "@/interfaces";
import * as SQLite from "expo-sqlite";

export async function RegisterProductFromCloud({
    id,
    stock_id,
    user_id,
    supplier,
    name,
    alert_quantity,
    amount,
    sale_price,
    acquisition_price,
    photo,
    created_at,
}: IProduct) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into products (
                    id,
                    stock_id,
                    user_id,
                    supplier,
                    name,
                    alert_quantity,
                    amount,
                    sale_price,
                    acquisition_price,
                    photo,
                    created_at
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                id,
                stock_id,
                user_id,
                supplier,
                name,
                alert_quantity,
                amount,
                sale_price,
                acquisition_price,
                photo,
                created_at,
            ]
        );
    });
}

export async function RegisterSaleFromCloud({
    id,
    stock_id,
    user_id,
    product_id,
    amount,
    price,
}: ISale) {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into sales (
                    id,
                    stock_id,
                    user_id,
                    product_id,
                    amount,
                    price,
                    created_at
                ) values (?, ?, ?, ?, ?, ?, ?);`,
            [id, stock_id, user_id, product_id, amount, price, created_at]
        );
    });
}

export async function RegisterStockFromCloud({
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
}
