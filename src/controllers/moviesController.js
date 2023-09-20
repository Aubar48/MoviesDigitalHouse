const db = require('../database/models');

const moviesController = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
            .catch(err => { console.log(err) })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            })
            .catch(err => { console.log(err) })
    },
    new: (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 15
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            })
            .catch(err => { console.log(err) })
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 6 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            })
            .catch(err => { console.log(err) })
    },
    //CRUD
    add: function (req, res) {
        db.Genre.findAll({
            order: ['name']
        })
            .then(allGenres => {
                return res.render('moviesAdd', { allGenres })
            })
            .catch(err => { console.log(err) })
    },
    create: function (req, res) {
        const { title, rating, awards, length, release_date, genre_id } = req.body;
        db.Movie.create({
            title: title.trim(),
            rating,
            awards,
            length,
            release_date,
            genre_id
        }).then(movie => {
            return res.redirect('/movies', { movie })
        })
            .catch(err => console.log(err))
    },
    edit: function (req, res) {
        let Movie = db.Movie.findByPk(req.params.id)

        let allGenres = db.Genre.findAll({
            order: ['name']
        })
        Promise.all([Movie, allGenres])
            .then(([Movie, allGenres]) => {

                return res.render('moviesEdit', { Movie, allGenres })
            }).catch(err => console.log(err))
    },
    update: function (req, res) {
        const { title, rating, awards, length, genre, release_date } = req.body;
        db.Movie.update({
            title: title.trim(),
            rating,
            awards,
            length,
            genre_id: genre,
            release_date
        }, {
            where: {
                id: req.params.id
            }
        }).then(movie => {
            return res.redirect('/movies', { movie });
        }).catch(err => console.log(err))
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                return res.render('moviesDelete', { Movie })
            })
    },
    destroy: function (req, res) {
        const id = req.params.id;
        db.Movie.destroy({
            where: { id }
        }).then(() => {
            res.redirect('/movies')
        }).catch(err => console.log(err))
    }
}

module.exports = moviesController;