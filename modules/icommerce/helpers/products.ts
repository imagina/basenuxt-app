




const helper = {

	/**/
	hasFrencuency: (product) => {
		return product?.optionsPivot?.length || false
	},

	/*
		frecuency id: 1
	*/
	getFrecuencyOptions: (product) => {
		if(!helper.hasFrencuency(product)) return []
		const frecuencyId = (product?.productOptions?.length  ? product.productOptions[0].optionId : 1) || 1

		const option = product.optionsPivot.find((item) => item.optionId == frecuencyId)
		const options = option?.productOptionValues.filter((item) => item.optionId == frecuencyId && item.price > 1).map((item) =>  {
			return { label:   item.optionValue, value: item.price, id: item.id }
		}) || []

		return options
	},

	/**/
	getPrice: (product, currencyValue = 'COP') => {
		const frecuencies = helper.getFrecuencyOptions(product)
		//get the lowest value 
		const defaultFrecuency = frecuencies?.length ? (frecuencies.reduce((min, obj) => obj.value < min.value ? obj : min).value || 0) : (product?.price || 0)
		let price = product?.frecuency ? product.frecuency.value : defaultFrecuency

		//if(product.price) price = price + product.price
		if(price > 0 && currencyValue != 'COP'){
			price = helper.COPtoCurrency(price, currencyValue)
		}
		return price
	},

	COPtoCurrency(value, currency){
			if(currency == 'USD') return helper.COPtoUSD(value)
			if(currency == 'EUR') return helper.COPtoEUR(value)
			return value
	},

	/* currency helper */

	COPtoUSD(value){
		const trm = helper.getTrm('COP')
		if(trm){
			value = (value / trm)
			value = Number.isInteger(value) ? value : value.toFixed(2)
		}
		return value
	},

	COPtoEUR(value){
		const trm = helper.getTrm('EUR')
		if(trm){
			value = helper.COPtoUSD(value)
			value = (value * trm)
			value = Number.isInteger(value) ? value : value.toFixed(2)
		}
		return value
	},



	getPriceWithSymbol(product, currency = 'COP'){
		const price = helper.getPrice(product, currency)
		return `${helper.currencyFormat(price, currency)} ${helper.getCurrency(currency).value}`
	},

	priceWithSymbol(value, currency = 'COP'){

		return `${helper.currencyFormat(helper.COPtoCurrency(value, currency), currency)} ${helper.getCurrency(currency).value}`
	},


	valueWithSymbol(value, currency = 'COP'){
		return `${helper.currencyFormat(value, currency)} ${helper.getCurrency(currency).value}`
	},

	

	getCurrencies(){
		const { t } = useI18n()
		return [
			{ value: 'COP', label: `COP - ${t("icommerce.currencies.cop")}`, symbol: '$'},
			{ value: 'USD', label: `USD - ${t("icommerce.currencies.usd")}`, symbol: '$'},
			{ value: 'EUR', label: `EUR - ${t("icommerce.currencies.eur")}` , symbol: '€'}
		];
	},

	getCurrencySymbol(currencyValue = 'COP'){
		const currency = helper.getCurrencies().find(x => x.value == currencyValue)
		return currency?.symbol
	},

	getCurrency(currencyValue = 'COP'){
		const currency = helper.getCurrencies().find(x => x.value == currencyValue)
		return currency
	},



	getTrm(currency){
		//const authStore = useAuthStore()
		//let usdRates = authStore.usdRates
		const usdRates = useState('icommerce.trm')
		if(!usdRates?.value) return false
		const trm = Number(usdRates.value['USDRates'][currency])
		return trm.toFixed(2)
	},

	currencyFormat(value, currency){

		const currencies = {
			'USD' : new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
					}),
			'COP': new Intl.NumberFormat('es-CO', {
				style: 'currency',
				currency: 'COP',
				minimumFractionDigits: 0, //removes decimal places.
				maximumFractionDigits: 0 //ensures no cents are shown.

			}),

			'EUR': Intl.NumberFormat('en-DE', {
				style: 'currency',
				currency: 'EUR',
			}),
		}
		return currencies[currency].format(value)
	},

	


}


export default helper