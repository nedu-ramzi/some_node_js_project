// import dependencies
import mongoose from "mongoose";

// configure application
const connectToDatabase = function (config) // type of database , connection params
{
  // define connection
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // listen for errors
  mongoose.connection.on("error", (err) =>
    console.error(`  ☣  Error in connecting to our database: ${err}  ☣ `)
  );
  // listen for successful connection
  mongoose.connection.once("open", () =>
    console.info(`🚀  Database connection successful 🚀 `)
  );
}
// export handler
export default connectToDatabase;