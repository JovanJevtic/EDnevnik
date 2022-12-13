const asyncHandler = require('express-async-handler');
const Ocjena = require('../models/Ocjena');

const createOcjena = asyncHandler(async (req, res) => {
    const { ocjena, ucenik, type, predmet } = req.body;

    if (!ocjena || !ucenik  || !type || !predmet) {
        res.status(400)
        throw new Error('Sva polja su obavezna!');
    }   

    const profesorInput = req.profesor;

    if (profesorInput.predmet._id.valueOf() != predmet) {
        res.status(400);
        throw new Error('Profesoru je dozvoljen unos ocjena samo iz svog predmeta!');
    }

    try {
        const ocjenaOb = await Ocjena.create({
            ocjena,
            ucenik,
            predmet,
            type,
            profesor: profesorInput._id.valueOf()
        });

        res.status(201).json({
            ocjena: ocjenaOb.ocjena,
            ucenik: ocjenaOb.ucenik,
            predmet: ocjenaOb.predmet,
            type: ocjenaOb.type,
            profesor: ocjenaOb.profesor
        });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const updateOcjena = asyncHandler(async (req, res) => {

});

module.exports = {
    createOcjena,
    updateOcjena
}