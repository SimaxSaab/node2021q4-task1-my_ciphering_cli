'use strict';

const fs = require('fs');
const { encrypt, decrypt } = require("./encDec");

let readableStream = fs.createReadStream(
  '1.txt',
  'utf8'
);

let writeableStream = fs.createWriteStream('2.txt');

console.clear();
process.argv.forEach((value, index) => {
  // console.log(`${index}: ${value}`);
  if(index === 2) {
    if(!(value === '-c' || value === '--config')) {
      console.log('Нет флага конфигурации. Введите превым параметром -c, либо --config');
      process.exit(1);
    }
  }
  if(index === 3) {
    let paramTwo = value.split('-');
    for(let parameter of paramTwo) {
      if(!(parameter.match(/C1/) || parameter.match(/C0/) || parameter.match(/R1/) || parameter.match(/R0/) || parameter.match(/A/))) {
        console.log('Неверный второй флаг');
        process.exit(2);
      }
    }
    console.log(paramTwo);
  }
  if(index === 4) {
    if(value !== '-i') {
      console.log('Нет флага файла для ввода. Введите третьим параметром -i');
      process.exit(3);
    }
  }
  
});

readableStream.pipe(writeableStream);
// console.log(decrypt('AB', 2));
