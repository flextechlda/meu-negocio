import { ISaleCart } from "@/interfaces";
import * as SQLite from "expo-sqlite";

async function RegisterSaleCartItem({
    id,
    product_id,
    created_at,
    amount,
    price,
}: ISaleCart) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into sales_cart (
            id,
            product_id,
            created_at,
            amount,
            price
        ) values (?, ?, ?, ?, ?);`,
            [id, product_id, created_at, amount, price]
        );
    });
}

async function DeleteSaleCartItem({ sale_cart_id }: { sale_cart_id: string }) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`delete from sales_cart where id = ?;`, [
            sale_cart_id,
        ]);
    });
}

async function GetAllSalesCartItems() {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let data = [] as ISaleCart[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from sales_cart order by created_at DESC;",
            []
        );

        data = rows as ISaleCart[];
    });

    return data;
}

async function GetAllSalesCartCount() {
    let db = SQLite.openDatabase("MeuNegocio.db");
    let total = 0;

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select count(*) as total from sales_cart;",
            []
        );

        total = rows[0]?.total;
    });

    return total;
}

export {
    RegisterSaleCartItem,
    GetAllSalesCartCount,
    GetAllSalesCartItems,
    DeleteSaleCartItem,
};
