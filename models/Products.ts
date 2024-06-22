import { IProduct } from "@/interfaces";
import * as SQLite from "expo-sqlite";
import { RegisterQuerieDataToSendToCloud } from "./DataToSendToCloud";

async function RegisterProduct({
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
    expiration_date,
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
                    created_at,
                    expiration_date
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
                expiration_date,
            ]
        );
    });

    await RegisterQuerieDataToSendToCloud({
        querie: `
            insert into products (
                id,
                stock_id,
                user_id,
                supplier,
                name,
                alert_quantity,
                amount,
                sale_price,
                acquisition_price,
                created_at,
                photo,
                expiration_date
            ) values (
                '${id}',
                '${stock_id}',
                '${user_id}',
                '${supplier}',
                '${name}',
                '${alert_quantity}',
                '${amount}',
                '${sale_price}',
                '${acquisition_price}',
                '${created_at}',
                '${photo}',
                '${expiration_date}'
            );
        `,
        created_at: created_at,
    });
}

async function GetAllProductsByStockID({ stock_id }: { stock_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let data = [] as IProduct[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from products where stock_id = ? order by created_at DESC;",
            [stock_id]
        );
        data = rows as IProduct[];
    });

    return data;
}

async function GetProductByID({ product_id }: { product_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = {} as IProduct;

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from products where id = ? limit 1;",
            [product_id]
        );

        data = rows[0] as IProduct;
    });

    return data;
}

async function GetAllProductsWithExpirationAlert({
    user_id,
}: {
    user_id: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as IProduct[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from products where DATE(expiration_date) < DATE('now') and user_id = ? order by created_at DESC;",
            [user_id]
        );
        data = rows as IProduct[];
    });

    return data;
}

async function GetAllProductsWithAmountAlert({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as IProduct[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from products where alert_quantity >= amount and user_id = ? order by created_at DESC;",
            [user_id]
        );
        data = rows as IProduct[];
    });

    return data;
}

async function GetAllProducts({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as IProduct[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from products where user_id = ? order by created_at DESC;",
            [user_id]
        );
        data = rows as IProduct[];
    });

    return data;
}

async function GetAllProductsCount({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let total = 0;

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select count(*) as total from products where user_id = ?;",
            [user_id]
        );

        total = rows[0]?.total;
    });

    return total;
}

async function ShrinkProductAmount({
    product_id,
    sale_amount,
}: {
    product_id: string;
    sale_amount: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let result = {} as SQLite.ResultSet;

    await db.transactionAsync(async (tx) => {
        let _result = await tx.executeSqlAsync(
            "update products set amount = amount - ? where id = ?;",
            [sale_amount, product_id]
        );
        result = _result;
    });

    let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    await RegisterQuerieDataToSendToCloud({
        querie: `update products set amount = amount - ${sale_amount} where id = '${product_id}';
        `,
        created_at: created_at,
    });

    return result;
}

async function AddProductAmount({
    product_id,
    added_amount,
}: {
    product_id: string;
    added_amount: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let result = {} as SQLite.ResultSet;

    await db.transactionAsync(async (tx) => {
        let _result = await tx.executeSqlAsync(
            "update products set amount = amount + ? where id = ?;",
            [added_amount, product_id]
        );
        result = _result;
    });

    let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    await RegisterQuerieDataToSendToCloud({
        querie: `update products set amount = amount + ${added_amount} where id = '${product_id}';
        `,
        created_at: created_at,
    });

    return result;
}

export {
    RegisterProduct,
    GetAllProductsByStockID,
    GetProductByID,
    GetAllProductsWithExpirationAlert,
    GetAllProductsWithAmountAlert,
    ShrinkProductAmount,
    GetAllProductsCount,
    AddProductAmount,
    GetAllProducts,
};
