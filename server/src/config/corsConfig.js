module.exports = {
    production: {
        origin: ["https://example.com", "https://app.example.com"],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },
    develop: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    },
};
