const express = require('express');
const { create } = require('express-handlebars');
const generate_pdf = require('./lib/pdf-generator')
const get_template = require('./lib/template')

const app = express();
const port = 3000;
const hbs = create();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Weapon-Z!')
})

app.post('/certificado', async function (req, res) {
	await get_template(req.body.template);

	// render the certificate using the req.body.data
	const html = await hbs.renderView('views/template.html', { 
		layout: false,
		template: req.body.template,
		data: req.body.data
	});

	// generate the pdf for the certificate
	const pdf = await generate_pdf(html);
	res.set("Content-Type", "application/pdf");
	res.send(pdf);
})

app.listen(port, () => console.log(`App listening to port ${port}`));
