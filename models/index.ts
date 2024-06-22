import * as SQLite from "expo-sqlite";
import { RegisterStock, GetAllStocks } from "./Stocks";

import {
    RegisterProduct,
    GetAllProductsByStockID,
    GetProductByID,
    GetAllProductsWithAmountAlert,
    GetAllProductsWithExpirationAlert,
    ShrinkProductAmount,
    GetAllProductsCount,
    AddProductAmount,
    GetAllProducts,
} from "./Products";

import {
    GetAllSales,
    RegisterSale,
    GetSaleByID,
    GetLastSales,
    GetAllSalesCount,
    GetSalesFromToday,
    GetSalesByStockID,
    GetSalesByProductID,
} from "./Sales";

import {
    GetAllSalesCartCount,
    GetAllSalesCartItems,
    RegisterSaleCartItem,
    DeleteSaleCartItem,
} from "./SalesCart";

import {
    RegisterInoviceCartItem,
    GetAllInvoiceCartCount,
    GetAllInvoiceCartItems,
    DeleteInoviceCartItem,
} from "./InvoiceCart";

async function DeleteAllTables() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`drop table sales;`);
        await tx.executeSqlAsync(`drop table stocks;`);
        await tx.executeSqlAsync(`drop table products;`);
        await tx.executeSqlAsync(`drop table sales_cart;`);
        await tx.executeSqlAsync(`drop table invoice_cart;`);
        await tx.executeSqlAsync(`drop table data_to_send_to_cloud;`);
    });
}

async function CreateTables() {
    let db = SQLite.openDatabase("MeuNegocio.db");

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS stocks (
                id VARCHAR(500) primary key NOT NULL,
                user_id VARCHAR(500) NOT NULL,
                name TEXT NOT NULL,
                created_at datetime NOT NULL
            );
        `);

        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(500) primary key NOT NULL,
                stock_id VARCHAR(500) NOT NULL,
                user_id VARCHAR(500) NOT NULL,
                supplier VARCHAR(228) NOT NULL,
                name TEXT NOT NULL,
                alert_quantity INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                sale_price DECIMAL(10,2) NOT NULL,
                acquisition_price DECIMAL(10,2) NOT NULL,
                created_at datetime NOT NULL,
                expiration_date datetime NOT NULL,
                photo LONGTEXT NOT NULL
            );
        `);
        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS sales (
                id VARCHAR(500) primary key NOT NULL,
                product_id VARCHAR(500) NOT NULL,
                stock_id VARCHAR(500) NOT NULL,
                user_id VARCHAR(500) NOT NULL,
                amount INTEGER NOT NULL, 
                price DECIMAL(10,2) NOT NULL,
                created_at datetime NOT NULL
            );
        `);
        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS sales_cart (
                id VARCHAR(500) primary key NOT NULL,
                product_id VARCHAR(500) NOT NULL,
                amount INTEGER NOT NULL, 
                price DECIMAL(10,2) NOT NULL,
                created_at datetime NOT NULL
            );
            );
        `);
        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS invoice_cart (
                id VARCHAR(500) primary key NOT NULL,
                sale_id VARCHAR(500) NOT NULL,
                created_at datetime NOT NULL
            );
        `);
        await tx.executeSqlAsync(`
            CREATE TABLE IF NOT EXISTS data_to_send_to_cloud (
                id VARCHAR(500) primary key NOT NULL,
                querie longtext NOT NULL,
                created_at datetime NOT NULL
            );
        `);
    });
}

export {
    CreateTables,
    DeleteAllTables,
    RegisterStock,
    GetAllStocks,
    RegisterProduct,
    GetAllProductsByStockID,
    GetProductByID,
    GetAllProductsWithAmountAlert,
    GetAllProductsWithExpirationAlert,
    ShrinkProductAmount,
    GetAllProductsCount,
    AddProductAmount,
    GetAllProducts,
    RegisterSale,
    GetAllSales,
    GetSaleByID,
    GetLastSales,
    GetAllSalesCount,
    GetSalesFromToday,
    GetSalesByStockID,
    GetSalesByProductID,
    GetAllSalesCartCount,
    GetAllSalesCartItems,
    RegisterSaleCartItem,
    DeleteSaleCartItem,
    RegisterInoviceCartItem,
    GetAllInvoiceCartCount,
    GetAllInvoiceCartItems,
    DeleteInoviceCartItem,
};
