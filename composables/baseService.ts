const baseService = {

	config(){
		const config = useRuntimeConfig()
		//const { locale, locales, setLocale } = useI18n()
		return {
			apiRoute: `${config.public.apiRoute}/api`,
			locale: 'es'
		}
	},

	/**
   * Get items by params
   * @param configName
   * @param params {params : {}, remember: boolean}
   * @returns {Promise<any>}
   */
	index(configName, params = {}) {
		return new Promise((resolve, reject) => {

			if (!configName) return reject('Config name is required') //Validate config name

			//if(!params?.page) params.page = 1
			//if(!params?.take) params.take = 10

			const sortBy = params?.sortBy || 'id'
			//(params.descending ? 'desc' : 'asc') : 'desc'
			const way = params?.order ? params.order : 'desc'
			delete params.order

			if (!params.filter) params.filter = {};
			params.filter.allTranslations = true

			if (!params.filter.order) {
				params.filter.order = {
				  field: sortBy,
				  way: way
				};

			}

			params.setting = {
				locale: baseService.config().locale
			}

			///const api = params?.api ? params.api : `${baseService.config().apiRoute}${configName}`
			$fetch('/api/base', {
				method: 'GET',
				params: {
					api:  configName,
					...params
				}
			}).then(response => resolve(response)).catch(error => {
					reject(error)
			})
		})
	},



		/**
   * Get item by criteria
   * @param configName
   * @param params {params : {}, remember: boolean}
   * @returns {Promise<any>}
   */
		show(configName, criteria, params = {}) {
			return new Promise((resolve, reject) => {
				if (!configName) return reject('Config name is required') //Validate config name
				if (!criteria) return reject('Criteria is required')//Validate criteria


				const api = `${configName}/${criteria}`
				$fetch('/api/base', {
					method: 'GET',
					params: {
						api:  api,
						...params
					}
				}).then(response => resolve(response)).catch(error => {
						reject(error)
				})
			})
	},




	/**
   * Get Method
   * @param apiUrl external api, no cache
   * @param params {params : {}}
   * @returns {Promise<any>}
	 */

	get(apiUrl, params = {}) {
		return new Promise((resolve, reject) => {
			if (!apiUrl) return reject('apiUrl is required') //Validate config name

			$fetch('/api/base', {
				method: 'GET',
				params: {
					api:  apiUrl,
					...params
				}
			}).then(response => resolve(response)).catch(error => {
				reject(error)
			})
		})

	}



}


export default baseService;