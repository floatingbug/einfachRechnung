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
                "canceled",
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

        case "canceled":
            return [
                "canceled",
            ];

        default:
            return [];
    }
};
