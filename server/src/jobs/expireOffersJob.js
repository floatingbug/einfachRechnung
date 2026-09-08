const services = require("../modules/offer/services");

const cron = require("node-cron");

cron.schedule("* * * * *", async () => {
    await services.expireOffers();
});
