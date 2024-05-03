const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const Redis = require("redis");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./data/db");

let sessionStore;
let useRedis = true;

// Redis istemcisini oluşturun
let redisClient;

try {
  redisClient = Redis.createClient({
    socket: {
      host: 'localhost', // Redis sunucusunun adresi
      port: 6379, // Redis portu
      connectTimeout: 1000, // Zaman aşımı 1 saniye
    },
    legacyMode: true, // connect-redis ile uyum
  });

  redisClient.connect().catch((error) => {
    console.error("Redis'e bağlanırken hata:", error);
    useRedis = false; // Hata durumunda Redis'i devre dışı bırak
  });

} catch (error) {
  console.error("Redis istemcisi oluşturulurken hata:", error);
  useRedis = false; // Hata durumunda alternatife geç
}

// Oturum saklama için alternatif yapılandırma
if (useRedis && redisClient.isOpen) {
  sessionStore = new RedisStore({
    client: redisClient,
    disableTouch: true, // Oturum "touch" işlemlerini devre dışı bırak
  });
 } else {
  sessionStore = new SequelizeStore({
    db: sequelize, // Veritabanı bağlantısı
  });
 }

// Oturum yapılandırmasını döndür
const sessionConfig = session({
  secret: "hello world", // Gizli anahtar
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Çerez ömrü (24 saat)
  },
  store: sessionStore, // Koşullu oturum saklama
});

module.exports = sessionConfig; // Oturum yapılandırmasını dışa aktar
