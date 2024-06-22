import axios from "axios";

export function getAPIClient() {
    let production = true;
    let url = production
        ? `https://meu-negocio-cms-server-production.up.railway.app`
        : `http://192.168.43.32:3001`;

    const api = axios.create({
        baseURL: url,
    });

    return api;
}
