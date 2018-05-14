const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  pool: {
    max: 10000,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: path.join(__dirname, './database.db'),
  operatorsAliases: false
});
const Config = sequelize.define('Config', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    secret: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    passphrase: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    market: {
        type: Sequelize.STRING,
        allowNull: false
    },
    side: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlendpoint: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start : {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    extracents: {
        type: Sequelize.FLOAT,
        allowNull: false
    }

}, {
    timestamps: false
})
const History = sequelize.define('History', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    market: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size : {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    side: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type : {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})
const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            min: 4
        }
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            min: 6
        }
    }
})
init = function() {
            return new Promise(async resolve => {
            exportDatabase()
            Promise.all([Config, History, User].map(table => table.sync({
                force: false
            }))).then(() => {
                Config.count().then(len => {
                    if(len <=0 ) {
                        Config.create({
                            key: '66dc8bcddec8e3d7fec94291d9d42711',
                            secret: 'tN8qQC6oZg3AcTv6Qv2tThUD71UTgZtShGTxRgNXZbRubg/x4hcpte6iriRgbbGUIvCRXWJhgkSHMKe42b+12g==',
                            passphrase: 'c7k9d7ao98p',
                            time: 1,
                            market: 'ETH-USD',
                            urlendpoint: 'https://api-public.sandbox.gdax.com',
                            start: false,
                            side: 'sell',
                            position: 1,
                            extracents: 0.12,
                            type: 'taker'
                        })
                    }
                })
                User.count().then(len => {
                    if(len <=0) {
                        User.create({
                            username: 'admin',
                            password: 'admin1234'
                        })
                    }
                })
                logger.success('synced Database')
                resolve();
            })
    })
}
exportDatabase = function() {
    global.model = {Config, History, User}
    logger.success('add Database Variable to Global')
}
module.exports = {init, database: sequelize}
