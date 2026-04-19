// Auto-detect API URL: localhost pe local, warna same domain use karo
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? "http://localhost:3000/api"
    : "/api";

const api = {
    getHeaders() {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    },

    async handleResponse(res) {
        const data = await res.json();
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }
        return data;
    },

    async get(path) {
        const res = await fetch(API_URL + path, {
            headers: this.getHeaders()
        });
        return this.handleResponse(res);
    },

    async post(path, data) {
        const res = await fetch(API_URL + path, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return this.handleResponse(res);
    },

    async patch(path, data) {
        const res = await fetch(API_URL + path, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return this.handleResponse(res);
    },

    async del(path) {
        const res = await fetch(API_URL + path, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        return this.handleResponse(res);
    }
};