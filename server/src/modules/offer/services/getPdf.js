const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const createOfferPdf = require("./createOfferPdf");

const models = require("../models");


const DOCUMENTS_PATH = path.resolve("storage/documents");


module.exports = async ({userId, offerNumber}) => {
    // Offer laden
    const offer = await models.getOfferByOfferNumber({
        userId,
        offerNumber,
    });

    if(!offer){
        const error = new Error("Offer not found.");
        error.status = 404;

        throw error;
    }

    // Hash des aktuellen Offer-Inhalts erstellen
    const contentHash = createContentHash(offer);

    // Zugehöriges PDF-Dokument laden
    let document = await models.getDocumentByOfferId({
        userId,
        offerId: offer._id,
    });

    // Speicherort der PDF bestimmen
    const storageKey = document?.storageKey
        ?? createStorageKey({
            userId,
            offerId: offer._id,
        });

    const filePath = path.join(
        DOCUMENTS_PATH,
        storageKey,
    );

    // Prüfen, ob die PDF physisch existiert
    const pdfExists = await fileExists(filePath);

    // Prüfen, ob die vorhandene PDF aktuell ist
    const pdfIsCurrent =
        document &&
        document.contentHash === contentHash &&
        pdfExists;

    // PDF fehlt oder ist veraltet
    if(!pdfIsCurrent){
        const pdfBuffer = await createPdf({
            offer,
        });

        await savePdf({
            filePath,
            pdfBuffer,
        });

        // Dokument existiert bereits
        if(document){
            document = await models.updateDocument({
                documentId: document._id,
                contentHash,
                storageKey,
            });
        }
        // Dokument existiert noch nicht
        else{
            document = await models.createDocument({
                userId,
                offerId: offer._id,
                type: "pdf",
                storageKey,
                contentHash,
            });
        }
    }

    // PDF als Stream zurückgeben
    return fs.createReadStream(filePath);
};


function createContentHash(offer){
    const pdfContent = {
        offerNumber: offer.offerNumber,
        offerDate: offer.offerDate,
        validUntil: offer.validUntil,
        customerSnapshot: offer.customerSnapshot,
        items: offer.items,
        totals: offer.totals,
        notes: offer.notes,
    };

    return crypto
        .createHash("sha256")
        .update(JSON.stringify(pdfContent))
        .digest("hex");
}


function createStorageKey({userId, offerId}){
    return path.join(
        "offers",
        userId.toString(),
        offerId.toString(),
        "offer.pdf",
    );
}


async function fileExists(filePath){
    try{
        await fs.promises.access(
            filePath,
            fs.constants.F_OK,
        );

        return true;
    }
    catch{
        return false;
    }
}


async function savePdf({filePath, pdfBuffer}){
    await fs.promises.mkdir(
        path.dirname(filePath),
        {
            recursive: true,
        },
    );

    await fs.promises.writeFile(
        filePath,
        pdfBuffer,
    );
}


async function createPdf({offer}){
    let pdfBuffer;

    try {
        pdfBuffer = await createOfferPdf({
            offer,
        });
    }
    catch (error) {
        throw new Error("Fehler beim erzeugen der PDF.")
    }

    return pdfBuffer;
}
