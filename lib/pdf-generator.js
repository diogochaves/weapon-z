const puppeteer = require('puppeteer');

module.exports = async function(html = "")
{
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
	const page = await browser.newPage();
  
	await page.setContent(html);
  
	const pdfBuffer = await page.pdf({ landscape: true });
  
	await page.close();
	await browser.close();
  
	return pdfBuffer;
};
