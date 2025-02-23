require("dotenv").config();
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

(async function () {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in your .env file");
    process.exit(1);
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }

  const db = client.db();

  const password = "hamza@2305"; // You can change this to your desired password
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.collection("users").insertOne({
      username: "alihamzarao",
      password: hashedPassword,
    });

    console.log("Admin user created successfully");
    console.log("Username: admin");
    console.log("Password: " + password);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await client.close();
  }
})();
