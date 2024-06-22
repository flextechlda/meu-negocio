import { IProduct, ISale } from "@/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatDate(timestamp: string | undefined) {
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

export const generate_sale_pdf = async (product: IProduct, sale: ISale) => {
    const productsHtmlContent = await GetProductHtml(product, sale);
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
                Relatório da Venda do Produto: ${product?.name} - ${formatDate(
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

const GetProductHtml = async (product: IProduct, sale: ISale) => {
    let html = "";

    // Product
    html += `
            <table>
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
                </table>
        `;

    // Sale
    html += `
            <table>
        `;

    html += `
            <h3 style="margin-top: 30px; margin-left: 5px">
                Dados da Venda do Produto: ${product?.name} 
            </h3>
        `;

    html += `
            <thead>
                <tr>
                    <th>Quantidade da Venda</th>
                    <th>Data da Venda</th>
                    <th>(Preço de venda do produto x Quantidade da Venda)</th>
                </tr>
            </thead>
        `;

    html += `
                <tbody>
                    <tr>
                        <td>${sale?.amount}</td>
                        <td>${formatDate(sale?.created_at)}</td>
                        <td>${sale?.price} MT</td>
                    </tr>
                </tbody>
                </table>
        `;

    let profit =
        Number(sale?.price) -
        Number(product?.acquisition_price) * Number(sale?.amount);

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
                <p style="padding: 13px">Lucro desta Venda: ${profit} MT</p>
            </div>
        `;

    return html;
};
