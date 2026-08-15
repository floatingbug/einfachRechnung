const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../../../config");
const signUpModels = require("../models");
const settingsServices = require("../../settings/services");
const {sendVerificationEmail} = require("../utils");

module.exports = async ({ name, email, password }) => {
    const existing = await signUpModels.findByNameOrEmail({ name, email });

    if (existing) {
        throw {
            status: 409,
            message: "Name or e-mail already exists",
        };
    }

    const passwordHash = await bcrypt.hash(
        password,
        config.bcryptSaltRounds
    );

    // Generate email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenHash = crypto
        .createHash("sha256")
        .update(emailToken)
        .digest("hex");

    const emailTokenExpiresAt = new Date(
        Date.now() + 30 * 60 * 1000 // 30 minutes
    );

    const user = {
        name,
        email,
        pendingEmail: null,
        pendingEmailToken: null,
        pendingEmailExpiresAt: null,
        password: passwordHash,
        emailVerified: false,
        emailTokenHash,
        emailTokenExpiresAt,
        createdAt: new Date(),
    };

    const result = await signUpModels.create({ user });

    if (!result.acknowledged) {
        throw {
            status: 500,
            message: "Failed to create user",
        };
    }

    await settingsServices.createDefaultSettings({
        userId: result.insertedId,
    })

    // Send verification email
    await sendVerificationEmail({
        email,
        token: emailToken,
    });

    return true;
};
