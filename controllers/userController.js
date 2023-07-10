const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, email, firstName, lastName, avatarImg) => {
	return jwt.sign(
		{
			id,
			email,
			firstName,
			lastName,
			avatarImg,
		},
		process.env.SECRET_KEY,
		{
			expiresIn: '72h',
		}
	);
};

class UserController {
	async registration(req, res, next) {
		try {
			const { firstName, lastName, email, password } = req.body;

			if (!email || !password) {
				return next(
					ApiError.badRequest('Не корректный email или пароль')
				);
			}

			const candidate = await User.findOne({
				where: {
					email,
				},
			});
			if (candidate) {
				return next(
					ApiError.badRequest(
						`Пользователь с таким ${email} уже существует`
					)
				);
			}

			const hashPassword = await bcrypt.hash(password, 5);

			let fileName = null;
			if (req.files) {
				fileName = uuid.v4() + '.jpg';
				const { img } = req.files;
				img.mv(path.resolve(__dirname, '..', 'static', fileName));
			}

			const user = await User.create({
				firstName,
				lastName,
				email,
				password: hashPassword,
				avatarImg: fileName,
			});

			const token = generateJwt(
				user.id,
				user.email,
				user.firstName,
				user.lastName,
				user.avatarImg
			);

			return res.json({ token });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.internal('Не верный логин или пароль'));
		}

		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.internal('Не верный логин или пароль'));
		}

		const token = generateJwt(
			user.id,
			user.email,
			user.firstName,
			user.lastName,
			user.avatarImg
		);

		return res.json({ token });
	}

	async checkAuth(req, res) {
		const token = generateJwt(
			req.user.id,
			req.user.email,
			req.user.firstName,
			req.user.lastName,
			req.user.avatarImg
		);
		return res.json({ token });
	}
}

module.exports = new UserController();
