const fs = require("fs");
const path = require("path");

const models = require("../models");


const DOCUMENTS_PATH = path.resolve(
    "storage/documents",
);


module.exports = async ({userId, offerNumber}) => {
    const offer = await models.getOfferByOfferNumber({
        userId,
        offerNumber,
    });

    if(!offer){
        const error = new Error("Offer not found.");
        error.status = 404;

        throw error;
    }

    const document =
        await models.getDocumentByOfferId({
            userId,
            offerId: offer._id,
        });

    if(document?.storageKey){
        const filePath = path.join(
            DOCUMENTS_PATH,
            document.storageKey,
        );

        await deleteFile(filePath);
    }

    if(document){
        await models.deleteDocument({
            userId,
            offerId: offer._id,
        });
    }

    const deleteResult = await models.deleteOffer({
        userId,
        offerId: offer._id,
    });

    if(deleteResult.deletedCount < 1){
        return {
            success: false,
            message: "Angebot konnte nicht gelöscht werden."
        }
    }

    return {
        success: true,
        message: "Angebot wurde gelöscht."
    }
};


async function deleteFile(filePath) {
    try{
        await fs.promises.unlink(filePath);
    }
    catch(error){
        if(error.code !== "ENOENT"){
            throw error;
        }
    }
}
