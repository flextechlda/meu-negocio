interface IProduct {
    id: string;
    stock_id: string;
    user_id: string;
    supplier: string;
    name: string;
    alert_quantity: string;
    amount: string;
    sale_price: string;
    acquisition_price: string;
    photo: string;
    created_at: string;
    expiration_date: string;
}

interface IStock {
    id: string;
    name: string;
    created_at: string;
    user_id: string;
}

interface ISale {
    id: string;
    stock_id: string;
    user_id: string;
    product_id: string;
    amount: string;
    price: string;
    created_at?: string;
}

interface IUser {
    phone: string;
    entry_date: string;
    username: string;
    id: string;
    email: string;
}

interface ISaleCart {
    id: string;
    product_id: string;
    created_at: string;
    amount: string;
    price: string;
}

interface IInvoiceCart {
    id: string;
    sale_id: string;
    created_at: string;
}

export { IProduct, IStock, ISale, IUser, IInvoiceCart, ISaleCart };
