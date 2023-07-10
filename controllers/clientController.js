const { Client } = require('../models/models');
const ApiError = require('../error/ApiError');

class ClientController {
	async create(req, res, next) {
		try {
			const {
				firstName,
				lastName,
				surName,
				instagram,
				phoneNumber,
				visits,
			} = req.body;

			const client = await Client.create({
				firstName,
				lastName,
				surName,
				instagram,
				phoneNumber,
				visits,
				userId: req.user.id,
			});

			return res.json(client);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		const clients = await Client.findAll({
			where: { userId: req.user.id },
		});
		if (!clients) {
			return next(ApiError.badRequest('Клиенты не найдены!'));
		}
		return res.json(clients);
	}

	async getOne(req, res, next) {
		const { id } = req.params;
		const client = await Client.findOne({
			where: { id, userId: req.user.id },
		});
		if (!client) {
			return next(ApiError.badRequest('Клиент не найден!'));
		}
		return res.json(client);
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const {
				firstName,
				lastName,
				surName,
				instagram,
				phoneNumber,
				visits,
			} = req.body;

			const client = await Client.findOne({
				where: { id, userId: req.user.id },
			});

			if (client) {
				client.firstName = firstName;
				client.lastName = lastName;
				client.surName = surName;
				client.instagram = instagram;
				client.phoneNumber = phoneNumber;
				client.visits = visits;
				client.updatedAt = new Date();

				await client.save();
			} else {
				return next(ApiError.badRequest('Клиент не найден!'));
			}
			return res.json(client);
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}

	async remove(req, res, next) {
		const { id } = req.params;

		const client = await Client.findOne({
			where: { id, userId: req.user.id },
		});

		if (client) {
			await client.destroy();
		} else {
			return next(ApiError.badRequest('Клиент не найден!'));
		}
		return res.json({ message: 'Клиент удален!' });
	}
}

module.exports = new ClientController();
