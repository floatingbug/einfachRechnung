module.exports = ({status}) => {
    switch (status) {
        case "draft":
            return [
                "edit",
                "viewPdf",
                "downloadPdf",
                "send",
                "convertToInvoice",
                "delete",
            ];

        case "sent":
            return [
                "viewPdf",
                "downloadPdf",
                "convertToInvoice",
            ];

        default:
            return [
                "viewPdf",
                "downloadPdf",
            ];
    }
};
