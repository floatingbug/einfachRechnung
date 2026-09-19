export default () => {
    const createCustomerRequest = {
        customerType: "",
        companyName: "",
        contactPerson: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postalCode: "",
        email: "",
        countryCode: "DE",
        phone: "",
        vatId: "",
        bank: {
            bankName: "",
            iban: "",
            bic: "",
        }
    };

    return createCustomerRequest;
}
