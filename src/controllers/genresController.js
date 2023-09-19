const db = require('../database/models');

module.exports = {
    list: (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList', {
                    genres
                })

            })
            .catch(err => { console.log(err) })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id, {
            include: [
                {
                    association: 'movies'
                }
            ]
        })
            .then(genre => {
                res.render('genresDetail.ejs', { genre });
            })
            .catch(err => { console.log(err) })
    }
}