const db = require('../db');

exports.createCategory = async (req, res) => {
    const  {name} = req.body;
    const newCategory = await db.query(`INSERT INTO category(name) values ($1) RETURNING *`, [name])
    res.json(newCategory.rows[0]);
}

exports.getCategories = async (req, res) => {
    const categories = await db.query(`SELECT * FROM category`)
    res.json(categories.rows);
}

exports.getOneCategory = async (req, res) =>  {
    const id = req.params.id;
    const category = await db.query(`SELECT * FROM category WHERE id = '${id}'`)
    res.json(category.rows);
}

exports.updateCategory = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;

    const updatedCategory = await db.query(`UPDATE category SET name = $1 WHERE id = $2 RETURNING *`, [name, id])
    res.json(updatedCategory.rows[0]);
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    const deletedCategory = await db.query(`DELETE FROM category WHERE id = $1`, [id])
    res.json({msg: 'category deleted successfully'});
}