const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

module.exports = async function(url) 
{
	const savepath = path.resolve(__dirname, '../views', 'template.html')
	const response = await axios({
		method: 'GET',
		url: url,
		responseType: 'stream'
	})

	// pipe the result stream into a file on disc
	response.data.pipe(fs.createWriteStream(savepath))

	// return a promise and resolve when download finishes
	return new Promise((resolve, reject) => {
		response.data.on('end', () => {
			resolve()
		})
		response.data.on('error', () => {
			reject()
		})
	})
}
