module.exports = ({totalGross, payments}) => {
    const openAmount = payments.reduce((acc, payment) => {
        return acc -= payment.amount;
    }
    ,totalGross);

    return openAmount;
}
