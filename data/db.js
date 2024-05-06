const config = require("../config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "postgres",
    host: config.db.host,
    define: {
        timestamps: false
    },
    storage: "./session.postgres"
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("postgres server bağlantısı yapıldı");
    }
    catch(err) {
        console.log("bağlantı hatası ", err);
    }
}

connect();

module.exports = sequelize;