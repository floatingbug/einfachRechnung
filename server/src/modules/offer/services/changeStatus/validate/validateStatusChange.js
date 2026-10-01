const STATUS_TRANSITIONS = {
    draft: [
        "draft",
        "sent",
        "expired",
        "cancelled",
    ],

    sent: [
        "accepted",
        "rejected",
        "expired",
        "cancelled",
        "sent",
    ],

    accepted: ["accepted"],

    rejected: ["rejected"],

    expired: ["expired"],

    cancelled: ["cancelled"],
};


module.exports = ({currentStatus, newStatus}) => {
    const allowedStatus = STATUS_TRANSITIONS[currentStatus];

    if(!allowedStatus){
        return false;
    }

    return {
        success: allowedStatus.includes(newStatus),
        allowedChanges: STATUS_TRANSITIONS[newStatus],
    }
};
