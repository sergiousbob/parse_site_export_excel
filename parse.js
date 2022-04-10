const puppeteer = require('puppeteer');
const excel = require("excel4node");

const reader = require( 'xlsx' );
const file = reader.readFile('./Test.xlsx')
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
  ///  const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://pkf-thp.website-testing.ru');

    const result = await page.evaluate(() => {
        let data = [];
        
        let elements = document.querySelectorAll('.cs-product-gallery__info-panel'); 

        for (var element of elements){ 
            let title = element.childNodes[1].innerText; 
           let price = element.childNodes[5].children[0].innerText; 
       
            data.push({title, price}); 
        }

        return data; 
    });

    browser.close();
    return result; 
};

scrape().then((value) => {
    console.log(value); 



    const ws = reader.utils.json_to_sheet(value)
  
reader.utils.book_append_sheet(file,ws,"Sheet1")
  

reader.writeFile(file,'./Test.xlsx')
  
  

});