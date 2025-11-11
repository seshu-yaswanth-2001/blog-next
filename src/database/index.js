import mongoose from "mongoose";

const secret = {
    userID: "seshuk2409_db_user",
    password: "seshu123456789",
}
const connectToDB = async() => {
    const connectionURL = `mongodb+srv://${secret.userID}:${secret.password}@cluster0.le4uco8.mongodb.net/`;

    await mongoose.connect(connectionURL)
    .then(() => console.log("SUCCESS! Connected to the MONGODB."))
    .catch((err) => console.log(err));
}

export default connectToDB;