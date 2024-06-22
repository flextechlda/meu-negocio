import { IProduct, ISale } from "@/interfaces";
import { GetProductByID, GetSalesByProductID } from "@/models";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatDate(timestamp: string) {
    if (timestamp) {
        const formattedDate = format(
            new Date(`${timestamp}`),
            "dd '/' MMMM '/' yyyy",
            { locale: ptBR }
        );

        return formattedDate;
    }
    return "";
}

async function calculateProfit(sales: ISale[]) {
    try {
        let total_profit = 0;

        for (let i = 0; i < sales.length; i++) {
            // sale_price price is the sale price of the prodcut times the amount being sold
            let sale_price = sales[i]?.price as unknown as number;

            let product = await GetProductByID({
                product_id: sales[i]?.product_id,
            });

            let acquisition_price_times_sale_amount =
                Number(product?.acquisition_price) * Number(sales[i]?.amount);
            let _profit = sale_price - acquisition_price_times_sale_amount;

            total_profit += _profit;
        }

        return total_profit;
    } catch (error) {
        console.error(error);

        return 0;
    }
}

export const generate_product_pdf = async (product: IProduct) => {
    const productsHtmlContent = await GetProductHtml(product);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
    
                th,
                td {
                    padding: 12px 15px;
                    text-align: left;
                }
    
                th {
                    background-color: #0e021e;
                    color: #fff;
                }
    
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
    
                tr:hover {
                    background-color: #ddd;
                }
    
                tfoot {
                    font-weight: bold;
                }
    
                tfoot td {
                    padding: 12px 15px;
                }
            </style>
        </head>
        <body>
            <h3 style="text-align: center">
                Relatório do Produto: ${product?.name} - ${formatDate(
        new Date().toString()
    )} 
            </h3>
            <br/>
            <br/>
            <br/>
            ${productsHtmlContent}
            <div style="text-align: left; margin-top: 20px; opacity: 0.4">
                Data do Relatório: ${formatDate(new Date().toString())} 
            </div>
        </body>
    </html>
    `;
    return htmlContent;
};

const GetProductHtml = async (product: IProduct) => {
    let salesFromProduct = await GetSalesByProductID({
        product_id: product?.id,
    });

    let html = "";

    html += `
            <table>
        `;

    html += `
            <h3 style="margin-top: 30px; margin-left: 5px">
                Produto: ${product?.name} 
            </h3>
        `;

    html += `
            <thead>
                <tr>
                    <th>Nome do produto</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Preço de Aquisição</th>
                    <th>Preço de venda</th>
                </tr>
            </thead>
        `;

    html += `
                <tbody>
                    <tr>
                        <td>${product?.name}</td>
                        <td>${product?.amount}</td>
                        <td>${formatDate(product?.created_at)}</td>
                        <td>${product?.acquisition_price}.00 MT</td>
                        <td>${product?.sale_price}.00 MT</td>
                    </tr>
                </tbody>
        `;

    html += `
        <tfoot>
            <tr>
                <td colspan="2">Total Vendas:</td>
                <td>${salesFromProduct?.length}</td>
            </tr>
        </tfoot>
    `;

    html += `
            </table>
        `;

    let profit = await calculateProfit(salesFromProduct);

    html += `
            <div
                style="
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-size: medium;
                    color: #0e021e;
                    font-weight: 600;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    height: 5vh;
                    margin-top: 12px;
                "
            >
                <p style="padding: 13px">Total Vendas deste Produto: ${salesFromProduct?.length}</p>
            </div>
            <div
                style="
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-size: medium;
                    color: #0e021e;
                    font-weight: 600;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    height: 5vh;
                    margin-top: 12px;
                "
            >
                <p style="padding: 13px">Total Lucro deste Produto: ${profit} MT</p>
            </div>
        `;

    return html;
};
