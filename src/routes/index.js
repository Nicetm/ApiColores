const { Router } = require('express');
const router = Router();
const fs = require('fs');

const json_colors = fs.readFileSync('src/color.json', 'utf-8')
const colors = JSON.parse(json_colors);

router.get('/', (req, res) => {
    res.render('index.ejs', {
       colors 
    })
})

router.get('/new-color', (req, res) => {
    res.render('new-color.ejs')
})

router.get('/view-color/:id', (req, res) => {
    let view = [];
    const search = colors.find(color => color.id == req.params.id)
    view.push(search);
    res.render('view-color.ejs', {
        view
    })
});

router.post('/new-color', (req, res) => {
    const {id, name, year, color, pantone_value} = req.body;
    if(!id || !name || !year || !color || !pantone_value ) {
        res.status(400).send('Ingresa todos los campos');
        return;
    }

    let newColor = {
        id,
        name,
        year,
        color,
        pantone_value
    }

    colors.push(newColor);

    const json_colors = JSON.stringify(colors);
    fs.writeFileSync('src/color.json', json_colors, 'utf-8');
    res.redirect('/');
})

module.exports = router;