'use strict';

module.exports = (Sequelize, config) => {
  const options = { 
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
    //dialectOptions: { ssl: true } 
  };

  const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    options);

  const User = require('../models/user')(Sequelize, sequelize);
  const Chat = require('../models/chat')(Sequelize, sequelize);
  const Message = require('../models/message')(Sequelize, sequelize);
  const UserChat = require('../models/user-chat')(Sequelize, sequelize);

  User.belongsToMany(Chat, {through: UserChat});
  Chat.belongsToMany(User, {through: UserChat});
  Message.belongsTo(Chat, {constraints: false, foreignKey: 'chatId'});
  Message.belongsTo(User, {constraints: false, foreignKey: 'userId'});
  
  /*
  User.hasMany(UserChat, {foreignKey: 'userId'});
  UserChat.belongsTo(User, {constraints: false, foreignKey: 'userId'});  
  Chat.hasMany(UserChat, {foreignKey: 'chatId'});
  UserChat.belongsTo(Chat, {constraints: false, foreignKey: 'chatId'});
  Chat.hasMany(Message, {foreignKey: 'chatId'});
  Message.belongsTo(Chat, {constraints: false, foreignKey: 'chatId'});
  User.hasMany(Message, {foreignKey: 'userId'});
  Message.belongsTo(User, {constraints: false, foreignKey: 'userId'});
*/
//belongstoMany with throught

  return { 
    user: User,
    chat: Chat,
    message: Message,
    userChat: UserChat,
    
    sequelize: sequelize,
  };
};