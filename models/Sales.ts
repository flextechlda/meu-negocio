import { ISale } from "@/interfaces";
import * as SQLite from "expo-sqlite";
import { RegisterQuerieDataToSendToCloud } from "./DataToSendToCloud";

async function RegisterSale({
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

    await RegisterQuerieDataToSendToCloud({
        querie: `
            insert into sales (
                id,
                stock_id,
                user_id,
                product_id,
                amount,
                price,
                created_at
            ) values (
                '${id}',
                '${stock_id}',
                '${user_id}',
                '${product_id}',
                '${amount}',
                '${price}',
                '${created_at}'
            );
        `,
        created_at: created_at,
    });
}

async function GetSaleByID({ sale_id }: { sale_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = {} as ISale;

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where id = ? limit 1;",
            [sale_id],
        );
        
        data = rows[0] as ISale
    });

    return data;
}

async function GetAllSales({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as ISale[];

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where user_id = ? order by created_at DESC;",
            [user_id],
            
        );
        data = rows as ISale[];
    });

    return data;
}

async function GetLastSales({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as ISale[];

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where user_id = ? order by created_at DESC;",
            [user_id],
            
        );
        data = rows as ISale[];
    });

    return data;
}

async function GetSalesFromToday({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as ISale[];

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where user_id = ? and DATE(created_at) = DATE('now');",
            [user_id],
            
        );
        data = rows as ISale[];
    });

    return data;
}

async function GetSalesByStockID({ stock_id }: { stock_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as ISale[];

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where stock_id = ? order by created_at desc;",
            [stock_id],
            
        );
        data = rows as ISale[];
    });

    return data;
}

async function GetSalesByProductID({ product_id }: { product_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as ISale[];

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select * from sales where product_id = ? order by created_at desc;",
            [product_id],
            
        );
        data = rows as ISale[];
    });

    return data;
}

async function GetAllSalesCount({ user_id }: { user_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let total = 0;

    await db.transactionAsync(async (tx) => {
        let {rows} = await tx.executeSqlAsync(
            "select count(*) as total from sales where user_id = ?;",
            [user_id],
            
        );
        
        total = rows[0]?.total
        
    });

    return total;
}

export {
    RegisterSale,
    GetSaleByID,
    GetAllSales,
    GetLastSales,
    GetAllSalesCount,
    GetSalesFromToday,
    GetSalesByStockID,
    GetSalesByProductID,
};
