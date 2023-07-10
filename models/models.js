const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
	},
	avatarImg: {
		type: DataTypes.STRING,
	},
});

const Event = sequelize.define('event', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	start: {
		type: DataTypes.STRING,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	time: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	client: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

const Client = sequelize.define('client', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	surName: {
		type: DataTypes.STRING,
	},
	instagram: {
		type: DataTypes.STRING,
	},
	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	visits: {
		type: DataTypes.INTEGER,
	},
});

User.hasMany(Event);
Event.belongsTo(User);

User.hasMany(Client);
Client.belongsTo(User);

module.exports = {
	User,
	Event,
	Client,
};
