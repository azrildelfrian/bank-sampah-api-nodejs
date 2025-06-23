const { User, Role } = require('../models');

exports.getProfileData = async (req, res) => {
    try {
        const data = await User.findOne({
            where: { id: req.user.id },
            include: {
                model: Role,
                as: 'role',
                attributes: ['name']
            },
            attributes: { exclude: ['password'] },
        });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal ambil data', error });
    }
};