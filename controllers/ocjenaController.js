const asyncHandler = require('express-async-handler');
const Ocjena = require('../models/Ocjena');

const createOcjena = asyncHandler(async (req, res) => {
    const { ocjena, ucenik, profesor, date, type, predmet } = req.body;

    if (!ocjena || !ucenik || !profesor  || !type || !predmet) {
        res.status(400)
        throw new Error('Sva polja su obavezna!');
    }

    const profesorInput = req.profesor;

    if (profesorInput.predmet !== predmet) {
        console.log(profesorInput);
        console.log("predmet: ", profesorInput.predmet._id.valueOf());
        console.log(predmet);
        res.status(400);
        throw new Error('Profesoru je dozvoljen unos ocjena samo iz svog predmeta!');
    }

    try {
        const ocjena = await Ocjena.create({
            ocjena,
            ucenik,
            profesor,
            date,
            type
        });

        res.status(200).json({
            ocjena: ocjena
        });
    } catch (error) {
        
    }
});

const updateOcjena = asyncHandler(async (req, res) => {

});

module.exports = {
    createOcjena,
    updateOcjena
}