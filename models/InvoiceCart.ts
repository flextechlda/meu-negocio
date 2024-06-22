import { IInvoiceCart } from "@/interfaces";
import * as SQLite from "expo-sqlite";

async function RegisterInoviceCartItem({
    id,
    sale_id,
    created_at,
}: IInvoiceCart) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `insert into invoice_cart (
                    id,
                    sale_id,
                    created_at
                ) values (?, ?, ?);`,
            [id, sale_id, created_at]
        );
    });
}

async function DeleteInoviceCartItem({
    invoice_cart_id,
}: {
    invoice_cart_id: string;
}) {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`delete from invoice_cart where id = ?;`, [
            invoice_cart_id,
        ]);
    });
}

async function GetAllInvoiceCartItems() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let data = [] as IInvoiceCart[];

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select * from invoice_cart order by created_at DESC;",
            []
        );
        data = rows as IInvoiceCart[];
    });

    return data;
}

async function GetAllInvoiceCartCount() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    let total = 0;

    await db.transactionAsync(async (tx) => {
        let { rows } = await tx.executeSqlAsync(
            "select count(*) as total from invoice_cart;",
            []
        );

        total = rows[0]?.total;
    });

    return total;
}

export {
    RegisterInoviceCartItem,
    GetAllInvoiceCartCount,
    GetAllInvoiceCartItems,
    DeleteInoviceCartItem,
};
