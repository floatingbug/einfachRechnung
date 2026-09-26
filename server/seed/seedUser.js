const userId = ObjectId("64b7f0c2a1d3e4f567890123");

const passwordHash = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

db.users.updateOne(
    { _id: userId },
    {
        $set: {
            _id: userId,

            name: "user1",

            email: "user@user.com",

            pendingEmail: null,
            pendingEmailToken: null,
            pendingEmailExpiresAt: null,

            password: passwordHash,

            emailVerified: true,

            emailTokenHash: null,
            emailTokenExpiresAt: null,

            createdAt: new Date(
                "2026-06-23T07:30:26.172Z"
            ),
        },
    },
    {
        upsert: true,
    }
);

print("");
print("User created.");
print(`User ID: ${userId}`);
print("Name: user1");
print("E-Mail: user@user.com");
print("Password: 123");
print("");
