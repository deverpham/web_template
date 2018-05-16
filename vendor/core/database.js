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
const Market = sequelize.define('Market', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MarketName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    OpenBuyOrders: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    OpenSellOrders: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    PrevDay: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    TimeStamp: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    BaseVolume:  {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    Ask: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    Bid: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    Last: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    Low: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    High: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    PrevDay: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    Created: {
        type: Sequelize.STRING,
        allowNull:false
    },
    percent: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    spread: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
init = function() {
            return new Promise(async resolve => {
            exportDatabase()
            Promise.all([Config, History, User, Market].map(table => table.sync({
                force: false
            }))).then(() => {
                Config.count().then(len => {
                    if(len <=0 ) {
                        Config.create({
                            key: '53e7d0d5c84f4e83a368e0b59dc37735',
                            secret: '30f850dc858049e89e5bc17989161f57',
                            time: 1,
                            market: 'ETH-USD',
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
    global.model = {Config, History, User, Market}
    logger.success('add Database Variable to Global')
}
module.exports = {init, database: sequelize}
