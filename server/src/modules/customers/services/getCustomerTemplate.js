module.exports = async() => {
    const customerTemplate = {
        customerType: "",
        customerName: "",
        contactPerson: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postalCode: "",
        email: "",
        countryCode: "",
        phone: "",
        vatId: "",
        bank: {
            bankName: "",
            iban: "",
            bic: "",
        }
    };

    return customerTemplate;
}
