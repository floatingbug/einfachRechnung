const STATUS_TRANSITIONS = {
    draft: [
        "sent",
        "expired",
        "cancelled",
    ],

    sent: [
        "accepted",
        "rejected",
        "expired",
        "cancelled",
    ],

    accepted: [],

    rejected: [],

    expired: [],

    cancelled: [],
};


module.exports = ({currentStatus, newStatus}) => {
    const allowedStatus = STATUS_TRANSITIONS[currentStatus];

    if(!allowedStatus){
        return false;
    }

    return allowedStatus.includes(newStatus);
};
