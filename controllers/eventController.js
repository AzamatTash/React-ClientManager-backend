const { Event } = require('../models/models');
const ApiError = require('../error/ApiError');

class EventController {
	async create(req, res, next) {
		try {
			const { title, time, client, comment, price, status, start } =
				req.body;

			const event = await Event.create({
				title,
				time,
				client,
				comment,
				price,
				status,
				start,
				userId: req.user.id,
			});

			return res.json(event);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		const events = await Event.findAll({ where: { userId: req.user.id } });
		if (!events) {
			return next(ApiError.badRequest('События не найдены!'));
		}
		return res.json(events);
	}

	async getOne(req, res, next) {
		const { id } = req.params;
		const event = await Event.findOne({
			where: { id, userId: req.user.id },
		});
		if (!event) {
			return next(ApiError.badRequest('Событие не найдено!'));
		}
		return res.json(event);
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { title, time, client, comment, price, status, start } =
				req.body;

			const event = await Event.findOne({
				where: { id, userId: req.user.id },
			});

			if (event) {
				event.title = title;
				event.time = time;
				event.client = client;
				event.comment = comment;
				event.price = price;
				event.status = status;
				event.start = start;

				await event.save();
			} else {
				return next(ApiError.badRequest('Событие не найдено!'));
			}
			return res.json(event);
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}

	async remove(req, res, next) {
		const { id } = req.params;

		const event = await Event.findOne({
			where: { id, userId: req.user.id },
		});

		if (event) {
			await event.destroy();
		} else {
			return next(ApiError.badRequest('Событие не найдено'));
		}
		return res.json({ message: 'Событие удалено!' });
	}
}

module.exports = new EventController();
