/* eslint-disable no-unused-vars */
var try2text = {
	filters: {
		try2text: (value) => {
			const LIST_NUMBER = ['SİFİR', 'BİR', 'İKİ', 'ÜÇ', 'DÖRT', 'BEŞ', 'ALTI', 'YEDİ', 'SEKİZ', 'DOKUZ']
			const LIST_NUMBER_DECA = ['', 'ON', 'YİRMİ', 'OTUZ', 'KIRK', 'ELLİ', 'ALTMIŞ', 'YETMİŞ', 'SEKSEN', 'DOKSAN']
			const LIST_STEP = ['YÜZ', 'BİN', 'MİLYON', 'MİLYAR', 'TRİLYON', 'KATRİLYON', 'KETRİLYON']

			const TEXT_PENNY = 'KURUŞ'
			const BRACE = ','
			const TL = 'TL '


			var NUMBER = value.toString();
			NUMBER = NUMBER.replace('.', '')
			const LENGTH_NUMBER = Number(NUMBER.length);
			const numberLengthValueWithoutPenny = LENGTH_NUMBER - 2;

			const VALUE_PENNY = NUMBER.slice(-2)
			const numberWithoutPenny = NUMBER.slice(0, -2)

			const stepValue = Math.floor(numberLengthValueWithoutPenny / 3)
			const lastStepValue = numberLengthValueWithoutPenny % 3

			const numberValuesinArray = []
			var temporaryValue = '';
			
			var i = numberLengthValueWithoutPenny;
			
			while (i--) {
				
				temporaryValue = temporaryValue + NUMBER[i]
				if((numberLengthValueWithoutPenny - i) % 3 == 0) {
					numberValuesinArray.push(temporaryValue.split("").reverse().join(""))
					temporaryValue = ''
				}
			}

			if(lastStepValue == 1) {
				numberValuesinArray.push(NUMBER[0])
			} else if(lastStepValue == 2) {
				numberValuesinArray.push(NUMBER[0] + NUMBER[1])
			}

			var text_number = '';

			numberValuesinArray.forEach((item, index) => {

				if(item.length == 2) {
					item = "0" + item
				}

				if(item.length == 1) {
					item = "00" + item
				}
				
				var FIRST = item[0] == 0 ? ' ' : item[0] == 1 ? LIST_STEP[0] : LIST_NUMBER[item[0]] + ' ' + LIST_STEP[0];
				var SECOND = item[1] == 0 ? ' ' : LIST_NUMBER_DECA[item[1]];
				var THIRD = item[2] == 0 ? ' ' : LIST_NUMBER[item[2]];
				var STEP = index >= 1 ? LIST_STEP[index] : ''

				text_number = `
					${FIRST} ${SECOND} ${THIRD} ${STEP ? STEP + BRACE : '' } ${text_number}
				`;
			})
			var realTextNumer = text_number + TL + LIST_NUMBER_DECA[VALUE_PENNY[0]] + ' ' + (VALUE_PENNY[1] == 0 ? '' : LIST_NUMBER[VALUE_PENNY[1]] ) + ' ' + (VALUE_PENNY !== '00' ? TEXT_PENNY : '')
			
			return realTextNumer
		},
		tlFormat: (value) => {
			const currency_symbol = "₺"
			const formatter = new Intl.NumberFormat('tr-TR', {
				style: 'currency',
				currency: 'TRY',
				minimumFractionDigits: 2
			})

			return formatter.format(value).replace(currency_symbol, '') + ' ' + currency_symbol
		}
	}
}

export default try2text