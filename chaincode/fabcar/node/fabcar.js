"use strict";

const shim = require('fabric-shim');
const util = require('util');

function getResult(s) {
	s = ("" + s + "").toString();
	return Buffer.from(s);
}

let Chaincode = class {
  async Init(stub) {
    return shim.success();
  }

  
  // функция для приема и вызова метода класса
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let method = this[ret.fcn];
    if (!method) {
	  const s1 = "Function ";
	  const s2 = ret.fcn;
	  const s3 = " not found";
	  const message_error = s1 + s2 + s3;
      throw new Error("  " + message_error + "  ");
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

//   async	 getFamilyInfo(stub, args) {
// 	const arrKeys = await stub.getState("ARR");
// 	const arrKeyString = arrKeys.toString();
// 	const arrKey = JSON.parse(arrKeyString);
// 	const key = (args[0] + "").toString();

// 	for(let i = 0; i < arrKey.length; i++) {
// 		if(arrKey[i] === key) {
// 			const Buffer = await stub.getState(key);
// 			const Str = Buffer.toString();
// 			return getResult(Str);
// 		}
// <<<<<<< HEAD
// 	}

// 	throw new Error("KEY_DOES_NOT_EXIST");
//   }

//   async	 applyInfoChange(stub, args) {
// 	const key = (args[0] + "").toString();
// 	// получаю семью и преобразую в обычную строку
// 	const familyString = (args[1] + "").toString();

// 	// кладем семью с ее ключем в блокчейе в формате строки байт
// 	await stub.putState(key, Buffer.from(familyString));

// 	// возвращаем ответ об успешной вставке семьи
// 	return getResult("INFO_CHANGE_APPLIED");
//   }

//   // метод для получения массива ключей
//   async getKeysArr(stub, args) {
// 	  // из блокчейна беру массив ключей в виде байтовой строки
// 	  const arrBuffer = await stub.getState("ARR");
// 	  // преобразую байтовую строку в обычную строку
// 	  const arrString = arrBuffer.toString();
// 	  // отправляю массив в формате JSON клиенту
// 	  return getResult(arrString);
//   }

//   async getLedgerInfo(stub, args) {
// 	const arrKeys = await stub.getState("ARR");
// 	const arrKeyString = arrKeys.toString();
// 	const arrKey = JSON.parse(arrKeyString);
// 	const key = (args[0] + "").toString();
// 	const valueFind = (args[1] + "").toString();

// 	for(let i = 0; i < arrKey.length; i++) {
// 		if(arrKey[i] === key) {
// 			const Buffer = await stub.getState(key);
// 			let Str = Buffer.toString();
// 			Str = JSON.parse(Str);
// 			const value = Str[valueFind];
// 			return getResult(value);
// =======
// 		catch (err) {
//     		console.log(err);
//     		return shim.error(err);
//     	}
// 	};

	//меняет информацию о семье
	async	 applyInfoChange(stub, args) {
		const key = (args[0] + "").toString();
		// получаю семью и преобразую в обычную строку
		const familyString = (args[1] + "").toString();
	
		// кладем семью с ее ключем в блокчейе в формате строки байт
		await stub.putState(key, Buffer.from(familyString));
	
		// возвращаем ответ об успешной вставке семьи
		return getResult("INFO_CHANGE_APPLIED");
	  }

	  // достаёт информацию о семье 
	  async	 getFamilyInfo(stub, args) {
		const arrKeys = await stub.getState("ARR");
		const arrKeyString = arrKeys.toString();
		const arrKey = JSON.parse(arrKeyString);
		const key = (args[0] + "").toString();
	
		for(let i = 0; i < arrKey.length; i++) {
			if(arrKey[i] === key) {
				const Buffer = await stub.getState(key);
				const Str = Buffer.toString();
				return getResult(Str);
			}
		}
	
		throw new Error("KEY_DOES_NOT_EXIST");
	  }

	// метод для получения массива ключей
	async showKeys(stub, args) {
		// из блокчейна беру массив ключей в виде байтовой строки
		const arrBuffer = await stub.getState("ARR");
		// преобразую байтовую строку в обычную строку
		const arrString = arrBuffer.toString();
		// отправляю массив в формате JSON клиенту
		return getResult(arrString);
	};

	async getLedgerInfo(stub, args) {
		const arrKeys = await stub.getState("ARR");
		const arrKeyString = arrKeys.toString();
		const arrKey = JSON.parse(arrKeyString);
		const key = (args[0] + "").toString();
		const valueFind = (args[1] + "").toString();
	
		for(let i = 0; i < arrKey.length; i++) {
			if(arrKey[i] === key) {
				const Buffer = await stub.getState(key);
				let Str = Buffer.toString();
				Str = JSON.parse(Str);
				const value = Str[valueFind];
				return getResult(value);
			}
		}
	
		throw new Error("KEY_DOES_NOT_EXIST");
	  }
	// инициализация
	async initLedger(stub, args) {
		// создаем пустой массив ключей
		const arr = [];
		// преобразуем массив в строку
		const arrString = JSON.stringify(arr);
		// сохраняем массив в формате байтовой строки в блокчейе
		await stub.putState('ARR', Buffer.from(arrString));
		// отправляем ответ клиенту об успешном создании массива ключей
		return getResult("CREATE_EMPTY_ARRAY_OF_KEYS_OK");
	};
	// добавление семьи в блокчейн и контроль существования семьи
	async insertFamily(stub, args) {
		// получаю ключ и преобразую в обычную строку
		const key = (args[0] + "").toString();
		// получаю семью и преобразую в обычную строку
		const familyString = (args[1] + "").toString();
		// из блокчейна беру массив ключей в виде байтовой строки
		const arrBuffer = await stub.getState("ARR");
		// преобразую байтовую строку в обычную строку
		let arrString = arrBuffer.toString();
		// преобразую строку в массив
		const arr = JSON.parse(arrString);
		// ищу наличие ключа в массиве ключей
		for (let i = 0; i < arr.length; i++) {
			// если совпадение найдено
			if (arr[i] === key) {
				const value = await stub.getState(key);
				return getResult(value);
			}
		}
	

	throw new Error("KEY_DOES_NOT_EXIST");
  }
  // инициализация
  async initLedger(stub, args) {
	  // создаем пустой массив ключей
	  const arr = [];
	  // преобразуем массив в строку
	  const arrString = JSON.stringify(arr);
	  // сохраняем массив в формате байтовой строки в блокчейе
	  await stub.putState('ARR', Buffer.from(arrString));
	  // отправляем ответ клиенту об успешном создании массива ключей
	  return getResult("CREATE_EMPTY_ARRAY_OF_KEYS_OK");
  }
  
  // добавление семьи в блокчейн и контроль существования семьи
  async insertFamily(stub, args) {
	  // получаю ключ и преобразую в обычную строку
	  const key = (args[0] + "").toString();
	  // получаю семью и преобразую в обычную строку
	  const familyString = (args[1] + "").toString();

	  // из блокчейна беру массив ключей в виде байтовой строки
	  const arrBuffer = await stub.getState("ARR");
	  // преобразую байтовую строку в обычную строку
	  let arrString = arrBuffer.toString();
	  // преобразую строку в массив
	  const arr = JSON.parse(arrString);

	  // ищу наличие ключа в массиве ключей
	  for(let i = 0; i < arr.length; i++) {
		  // если совпадение найдено
		  if(arr[i] === key) {
			// генерирую ошибку и завершаю работу программы
			throw new Error("KEY_IS_ALREADY_EXISTS");
		  }
	  }

	  // если мы дошли до этого места
	  // то совпадения ключей НЕ было

	  // добавляем ключ к концу массива
	  arr.push(key);
	  // преобразуем изменненый массив ключей в строку формата JSON
	  arrString = JSON.stringify(arr);
	  // кладем изменный массив в формате байтовой строки в блокчейн
	  await stub.putState('ARR', Buffer.from(arrString));

	  // кладем семью с ее ключем в блокчейе в формате строки байт
	  await stub.putState(key, Buffer.from(familyString));

	  // возвращаем ответ об успешной вставке семьи
	  return getResult("CREATE_NEW_FAMILY_OK");
  }
  
};

shim.start(new Chaincode());
