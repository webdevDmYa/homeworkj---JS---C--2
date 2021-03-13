
const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json';



let xhr = new XMLHttpRequest();

xhr.open('GET', URL);

xhr.onload = function () {

	let data = JSON.parse(xhr.responseText);



	/* Далее, в этой функции, вам доступна переменная data с загруженными данными */
	let today = '2021-03-12';//

	console.log(today);


	let all = new Object();


	for (let item of data) {
		let repaydate = item.repaydate.split('.').reverse().join('-');

		if (repaydate > today) {
			if (item.valcode == 'USD') {
				item.attraction = item.attraction * 28;

			} else if (item.valcode == 'EUR') {
				item.attraction = item.attraction * 32;
			} else {
				item.attraction = item.attraction;
			}
			if (all[repaydate]) {
				all[repaydate] += item.attraction;
			} else {
				all[repaydate] = item.attraction;
			}
		}/*
		if (repaydate < today) {
			if (item.valcode == 'USD') {
				item.attraction = item.attraction * 28;

			} else if (item.valcode == 'EUR') {
				item.attraction = item.attraction * 32;
			} else {
				item.attraction = item.attraction;
			}
			if (all[repaydate]) {
				all[repaydate] += item.attraction;
			} else {
				all[repaydate] = item.attraction;
			}
		}*/

	}
	for (let key in all) {
		all[key] = +all[key].toFixed(2);
		if (all[key] == 0) {
			delete all[key];
		}
	}

	arr = Object.entries(all);

	arr.sort();
	/*	for (let j = 0; j < arr.length - 1; j++) {
			for (i = 0; i < arr.length - j - 1; i++) {
				if (arr[i] > arr[i + 1]) {
					let temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
				}
			}
		}
	*/

	let summa = 0;

	for (let item of arr) {
		summa += item[1];

	}
	console.log(arr)
	console.log(`долг України ${(summa / 10 ** 9).toFixed(2)} млрд грн от 2021.03.12`);






}
xhr.send();
