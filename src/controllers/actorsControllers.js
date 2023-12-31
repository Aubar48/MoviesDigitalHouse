const db = require('../database/models');

const actorsController = {
    list: (req, res) => {
        db.Actor.findAll({
            order: ['first_name']  
        })
            .then(actors => {
                res.render('actorsList', { actors })
            })
            .catch(err => { console.log(err) })
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id, {
            include: [
                {
                    association: 'movies'
                }
            ]
        })
            .then(actor => {
                res.render('actorsDetail.ejs', { actor });
            })
            .catch(err => { console.log(err) })
    }

}

module.exports = actorsController;