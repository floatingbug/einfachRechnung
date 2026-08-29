const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const {createInvoicePdf} = require("./modules");

const models = require("../../models");


const DOCUMENTS_PATH = path.resolve("storage/documents");


module.exports = async ({userId, invoiceNumber}) => {
    // Invoice laden
    const invoice = await models.getInvoiceByInvoiceNumber({
        userId,
        invoiceNumber,
    });

    if(!invoice){
        const error = new Error("Invoice not found.");
        error.status = 404;

        throw error;
    }

    // Hash des aktuellen Invoice-Inhalts erstellen
    const contentHash = createContentHash(invoice);

    // Zugehöriges PDF-Dokument laden
    let document = await models.getDocumentByInvoiceNumber({
        userId,
        offerId: invoice._id,
    });

    // Speicherort der PDF bestimmen
    const storageKey = document?.storageKey
        ?? createStorageKey({
            userId,
            invoiceNumber,
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
            invoice,
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
                invoiceId: invoice._id,
                type: "pdf",
                storageKey,
                contentHash,
            });
        }
    }

    // PDF als Stream zurückgeben
    return fs.createReadStream(filePath);
};


function createContentHash(invoice){
    const pdfContent = {
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        dueDate: invoice.dueDate,
        customerSnapshot: invoice.customerSnapshot,
        items: invoice.items,
        totals: invoice.totals,
        notes: invoice.notes,
    };

    return crypto
        .createHash("sha256")
        .update(JSON.stringify(pdfContent))
        .digest("hex");
}


function createStorageKey({userId, invoiceNumber}){
    return path.join(
        "invoices",
        userId.toString(),
        invoiceNumber.toString(),
        "invoice.pdf",
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


async function createPdf({invoice}){
    try{
        return await createInvoicePdf({
            invoice,
        });
    }
    catch(error){
        throw new Error("Fehler beim Erzeugen der PDF.");
    }
}
