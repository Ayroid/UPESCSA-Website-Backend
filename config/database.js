import mongoose from "mongoose";
import { DB_MESSAGES } from "../utils/messages/messages.js";

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log(DB_MESSAGES.DATABASE_CONNECTED);
    } catch (error) {
      console.log(DB_MESSAGES.DATABASE_CONNECTION_ERROR, error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log(DB_MESSAGES.DATABASE_DISCONNECTED);
    } catch (error) {
      console.log(DB_MESSAGES.DATABASE_DISCONNECTION_ERROR, error);
    }
  }
}

export { Database };
