// функция принимает тип и массив данных. Возвращает новый массив только с тем данными, которые соответствуют заданному типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// функция, которая прячет все блоки с ответами
	hideAllResponseBlocks = () => {
		// получаем все блоки с ответами в виде коллекции и зачем-то делаем из них массив
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебираем массив с блоками и прячем их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// показать определенный блок с ответом (принимает селектор одного нужного блока, сообщение, которое там должно быть и спан, куда это сообщение поместить)
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// сначала прячем все блоки
		hideAllResponseBlocks();
		// показываем блок с заданным селектором
		document.querySelector(blockSelector).style.display = 'block';
		// если задан спан
		if (spanSelector) {
			// то записываем в него наше сообщение
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// показываем ошибку (если что-то пошло не так)
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// показываем результат (если данные такого типа нашлись)
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// показываем изначальный блок, когда еще не было фильтрации
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// функция вывода отфильтрованный данных ,принимает тип и массив данных
	tryFilterByType = (type, values) => {
		// пытаемся выполнить код
		try {
			// получаем отфильтрованный массив и делаем из него строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");		
			console.log(typeof valuesArray);
			// проверяем, пустая ли она
			const alertMsg = (valuesArray.length) ?
			// если нет, то выводим сообщение "Данные с типом таким-то: такие-то"
				`Данные с типом ${type}: ${valuesArray}` :
				// если пусто, пишем, что отсутствуют
				`Отсутствуют данные типа ${type}`;
			// и выводим это сообщение на экран 
			showResults(alertMsg);
		// если вдруг в коде ошибка, отлавливаем ее
		} catch (e) {
			//  и выводим блок с ошибкой
			showError(`Ошибка: ${e}`);
		}
	};
// получаем со страницы кнопку Фильтровать
const filterButton = document.querySelector('#filter-btn');
// отлавливаем событие клик на кнопке
filterButton.addEventListener('click', e => {
	// получаем сщ страницы селект с типами данных
	const typeInput = document.querySelector('#type');
	// получаем со страницы инпут с данными
	const dataInput = document.querySelector('#data');
	// если данныех нету
	if (dataInput.value === '') {
		// то появляется подсказка, что поле не должно быть пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// и у нас изначальный блок выводится, когда нечего показывать
		showNoResults();
		// если данные есть
	} else {
		// убираем валидацию
		dataInput.setCustomValidity('');
		// отключаем действие кнопки по умолчанию
		e.preventDefault();
		// фильтруем и выводим результат
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

