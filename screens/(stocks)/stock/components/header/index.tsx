import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { IProduct, ISale } from "@/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetProductByID, GetSalesByStockID } from "@/models";

export const Header = ({ products }: { products: IProduct[] }) => {
    const navigation = useRouter();
    const { id, name }: { id: string; name: string } = useLocalSearchParams();
    const [isPrinting, setIsPrinting] = useState(false);

    const printToFile = async () => {
        if (products?.length <= 0) return;
        if (isPrinting) return;

        setIsPrinting(true);

        const html = await getHtml();

        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

        setIsPrinting(false);
    };

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
                    Number(product?.acquisition_price) *
                    Number(sales[i]?.amount);
                let _profit = sale_price - acquisition_price_times_sale_amount;

                total_profit += _profit;
            }

            return total_profit;
        } catch (error) {
            console.error(error);

            return 0;
        }
    }

    const getHtml = async () => {
        const productsHtmlContent = await GetProductsHtml();
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
                    Relatório do Estoque: ${name} - ${formatDate(
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

    const GetProductsHtml = async () => {
        let salesFromStock = await GetSalesByStockID({ stock_id: id });

        let html = "";

        html += `
                <table>
            `;

        html += `
                <h3 style="margin-top: 30px; margin-left: 5px">
                    Estoque: ${name} 
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

        products.forEach((product) => {
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
        });

        html += `
            <tfoot>
                <tr>
                    <td colspan="2">Total Produtos:</td>
                    <td>${products?.length}</td>
                </tr>
            </tfoot>
        `;

        html += `
                </table>
            `;

        let profit = await calculateProfit(salesFromStock);

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
                    <p style="padding: 13px">Total Vendas deste estoque: ${salesFromStock?.length}</p>
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
                    <p style="padding: 13px">Total Lucro deste estoque: ${profit} MT</p>
                </div>
            `;

        return html;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.back()}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color="#555"
                />
            </TouchableOpacity>
            <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                        navigation.push({
                            pathname: "/(products)/add_product",
                            params: { stock_id: id },
                        })
                    }
                >
                    <Text style={styles.text}>Adicionar Produto</Text>
                    <MaterialIcons name="plus-one" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.btn, width: 50 }}
                    onPress={() => printToFile()}
                >
                    {isPrinting ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : (
                        <MaterialIcons name="print" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
