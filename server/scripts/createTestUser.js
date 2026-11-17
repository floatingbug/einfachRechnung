// Creates or resets a verified test user for local development.
// Run with: npm run create:test-user

const bcrypt = require("bcrypt");
const config = require("../src/config");
const { connect, getDb, _client } = require("../src/db/mongo");
const settingsServices = require("../src/modules/settings/services");

const TEST_USER = {
    name: "user",
    email: "user@user.de",
    password: "user",
};

async function upsertUser(db){
    const passwordHash = await bcrypt.hash(TEST_USER.password, config.bcryptSaltRounds);

    const user = {
        name: TEST_USER.name,
        email: TEST_USER.email,
        pendingEmail: null,
        pendingEmailToken: null,
        pendingEmailExpiresAt: null,
        password: passwordHash,
        emailVerified: true,
        emailTokenHash: null,
        emailTokenExpiresAt: null,
        subscription: {
            plan: "free",
            status: "active",
            currentPeriodStart: "...",
            currentPeriodEnd: "...",
            provider: "stripe",
            providerSubscriptionId: "...",
        },
    };

    const existing = await db.collection("users").findOne({
        $or: [
            { name: TEST_USER.name },
            { email: TEST_USER.email },
        ],
    });

    if (!existing){
        const result = await db.collection("users").insertOne({
            ...user,
            createdAt: new Date(),
        });

        return result.insertedId;
    }

    await db.collection("users").updateOne(
        { _id: existing._id },
        { $set: user }
    );

    return existing._id;
}

async function ensureSettings(userId){
    const db = getDb();

    const existing = await db.collection("settings").findOne({ userId });

    if (existing){
        return false;
    }

    await settingsServices.createDefaultSettings({ userId });

    return true;
}

async function main(){
    if (config.env === "production"){
        throw new Error("Refusing to create a test user in production.");
    }

    await connect();

    const userId = await upsertUser(getDb());
    const settingsCreated = await ensureSettings(userId);

    console.log("");
    console.log("Test user ready");
    console.log(`  Name:     ${TEST_USER.name}`);
    console.log(`  E-Mail:   ${TEST_USER.email}`);
    console.log(`  Password: ${TEST_USER.password}`);
    console.log(`  ID:       ${userId}`);
    console.log(settingsCreated ? "  Default settings created." : "  Settings already existed.");
    console.log("");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await _client()?.close();
    });
