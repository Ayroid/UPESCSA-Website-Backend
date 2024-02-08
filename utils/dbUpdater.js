import { CSRMODEL } from "../models/csrModel.js";
import { Database } from "../config/database.js";

const database = new Database(
  "mongodb+srv://upescsa:BvdEO9zTOelPXke1@upescsa.dhi5ltw.mongodb.net/users"
);

database.connect().then(() => {
  const renameFields = {
    createdAt: "createdAt",
    updated_at: "updatedAt",
  };

  CSRMODEL.updateMany({}, { $rename: renameFields })
    .then((result) => {
      console.log(`${result.nModified} documents updated successfully.`);
    })
    .catch((err) => {
      console.error(err);
      // Handle the error appropriately
    })
    .finally(() => {
      // Close the database connection after the operation
      database.disconnect();
    });
});
