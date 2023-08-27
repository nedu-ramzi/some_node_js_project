import mongoose from "mongoose";

export const dbcon = function (config) {
    mongoose.connect(config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('error', (err) => {
        console.error(`Error in connecting to database: ${err}`);
    });

    mongoose.connection.once('open', () => {
        console.info('Database connected successfully');
    });
}