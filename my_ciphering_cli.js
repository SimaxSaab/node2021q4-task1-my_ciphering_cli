'use strict';

const fs = require('fs');
const  Stream  = require('stream');
const { encrypt } = require("./encDec");

let paramTwo, arrArgumentsForPipe = [], cipher = [], mainStream, readableStream, writeableStream;

class ToCeasarStream extends Stream.Transform {
  constructor(options = {}, code) {
    options = Object.assign({}, options, {
      decodeStrings: false
    });
    super(options);
    this.code = code;
  }

  _transform(chunk, encoding, callback) {
    
    if(encoding !== 'utf8') {
      chunk = chunk.toString('utf8');
    }
    switch(this.code) {
      case 'C1':
        this.push(encrypt(chunk, 1));
        break;
      case 'C0':
        this.push(encrypt(chunk, -1));
        break;
      case 'R1':
        this.push(encrypt(chunk, 8));
        break;
      case 'R0':
        this.push(encrypt(chunk, -8));
        break;
      case 'A':
        this.push(enAtbash(chunk));
    }
    callback();
  }
}


console.clear();
let promiseInputCLI = new Promise((resolve, reject) => {
  process.argv.forEach((value, index) => {
    if(index === 2) {
      if(!(value === '-c' || value === '--config')) {
        console.log('Нет флага конфигурации. Введите превым параметром -c, либо --config');
        process.exit(1);
      }
    }
    if(index === 3) {
      paramTwo = value.split('-');
      for(let parameter of paramTwo) {
        if(!(parameter.match(/C1/) || parameter.match(/C0/) || parameter.match(/R1/) || parameter.match(/R0/) || parameter.match(/A/))) {
          console.log('Неверный второй флаг');
          process.exit(2);
        }
        cipher.push(parameter);
      }
    }
    if(index === 4) {
      if(value !== '-i') {
        console.log('Нет флага файла для ввода. Введите третьим параметром -i');
        process.exit(3);
      }
    }
    if(index === 5) {
      if(value === '-o') {
        arrArgumentsForPipe.push('undefined');
        console.log('Вводим данные с консоли...')
      } else {
        try {
          if (fs.existsSync(value)) {
            arrArgumentsForPipe.push(value);
          } else {
            console.log('Не существует файла для ввода. Напишите правильно имя входного файла');
            process.exit(6);
          }
        } catch(err) {
          console.error(err);
        }
      }
    }
    if(index === 6) {
      if(value !== '-o') {
        try {
          if (fs.existsSync(value)) {
            console.log('Файла для вывода существует. Перепишу!');
          } else {
            console.log('Не существует файла для вывода. Создаю!');
          }
        } catch(err) {
          console.error(err);
        }
        arrArgumentsForPipe.push(value);
      }
    }
    if(index === 7) {
      try {
        if (fs.existsSync(value)) {
          console.log('Файла для вывода существует. Переписываю!');
        } else {
          console.log('Не существует файла для вывода. Создаю!');
        }
      } catch(err) {
        console.error(err);
      }
      arrArgumentsForPipe.push(value);
    }
    if(index >= 8) {
      console.clear();
      console.log('Лишние аргументы');
      process.exit(8);
    }
  });
  resolve(arrArgumentsForPipe);
});






promiseInputCLI.then((arrArgumentsForPipe) => {
  // if(arrArgumentsForPipe[0] !== 'undefined') {
  //   readableStream = fs.createReadStream(
  //     arrArgumentsForPipe[0],
  //     'utf8'
  //   );
  // } else {
  //   readableStream = process.stdin;
  // }
  if(arrArgumentsForPipe[1] !== undefined) {
    writeableStream = fs.createWriteStream(arrArgumentsForPipe[1]);
  } else {
    writeableStream = process.stdout;
  }
    
  async function processCipher() {
    let i = 0;
    for(let cipherItem of cipher) {
      await mainPipe(cipherItem, i);
      i++;
    }

    mainStream.pipe(writeableStream);
  }
  processCipher();
});

function mainPipe(cipherItem, i) {
  if(i === 0) {
    mainStream = readableStream.pipe(new ToCeasarStream({},cipherItem));
  } else {
    mainStream = mainStream.pipe(new ToCeasarStream({},cipherItem));
  }
}

