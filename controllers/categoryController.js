const db = require('../db');

exports.createCategory = async (req, res) => {
    const name = req.body;
    const newCategory = await db.query(`INSERT INTO category(name) values ($1) RETURNING *`, [name])
    res.json(newCategory);
}