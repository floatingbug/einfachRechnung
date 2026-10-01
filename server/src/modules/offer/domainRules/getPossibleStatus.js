module.exports = ({status}) => {
    switch (status) {
        case "draft":
            return [
                "draft",
                "sent",
            ];

        case "sent":
            return [
                "sent",
                "accepted",
                "rejected",
                "cancelled",
            ];
       
        case "accepted":
            return [
                "accepted",
            ];
        
        case "rejected":
            return [
                "rejected",
            ];

        case "expired":
            return [
                "expired",
            ];

        case "cancelled":
            return [
                "cancelled",
            ];

        default:
            return [];
    }
};
