<template>
	<div v-if="!isMobile" 
		class="tw-w-[400px]"
	>
		<div class="lg:tw-pr-[20px]">
			<h1 class="tw-text-lg tw-font-semibold tw-mb-[30px] tw-text-primary">
				Categorías
			</h1>
			<q-list
			class="tw-h-full tw-overflow-y-auto"
			>
				<template v-for="category in categories">

					<q-expansion-item
						v-if="category?.children"						
						class="expansion-item"
						:label="category.title"
						header-class="tw-text-lg tw-text-sm"
						expand-icon="fa-solid fa-caret-down"
						expand-icon-class="expand-icon"
						expand-separator
					>
						<q-list 							
							class="tw-px-4"
						>
							<template v-for="children in category.children">
								<NuxtLink
					 				:to="`/products/${category.slug}`"  
								>
								<q-item
									clickable
									v-ripple
									:active="isActive(children)"
									:class=" isActive(category) ? 'tw-font-[700]' : 'tw-font-[500]'"
								>
									<q-item-section>{{ children.title }}</q-item-section>
								</q-item>
								</NuxtLink>
							</template>
						</q-list>
					</q-expansion-item>
					<!-- no children -->
					 <NuxtLink 
					 v-else 
					 	:to="`/products/${category.slug}`"  
						>
						<q-item 
							
							clickable
							v-ripple
							:active="isActive(category)"
							:class=" isActive(category) ? 'tw-font-[700]' : 'tw-font-[500]'"
						>
							<q-item-section>{{ category.title }}</q-item-section>
						</q-item>	
					</NuxtLink>
				</template>				
			</q-list>
		</div>
	</div>
</template>
<script setup>

import apiRoutes from '../../config/apiRoutes'
import constants from '../../config/constants'
import productsPage from '../../pages/products.vue'

const route = useRoute()
const router = useRouter()

const selectedCategoryState = useState('icommerce.selected.category', () => null)

const categories = ref([])
const isMobile = ref(false)
const BREAKPOINT = 1024

const emit = defineEmits(['category'])

function updateViewport() {
	isMobile.value = window.innerWidth < BREAKPOINT
}

onBeforeMount(async () => {	
	await getCategories()
})

async function init(){
	
	
	updateViewport()
	window.addEventListener('resize', updateViewport)	
}

async function getSelectedCategory(categories){
	    const route = useRoute()		

	let category = categories.find(item => {
		if(route.params?.slug == item.slug){
			return item
		}
	}) 
	if(!category) {
		category = categories[0]
		
	}
	selectedCategoryState.value = category
	emit('category', category)
}

async function getCategories(){

	const params = {
		take: 60,
		page: 1,
		filter : {
			parentId: constants.cagtegories.mainCategoryId,
			order: {
				field: "created_at",
				way: "desc"
			}			
		}
		
	}

	baseService.index(apiRoutes.categories, params).then(response => {
		let  data =  response?.data || []				
		const parents = data		
		
		
		parents.forEach((category) => {				
			const children = data.filter(item => item.parentId == category.id && item.parentId != constants.cagtegories.mainCategoryId )
			if(children.length) category.children = children
		})

		categories.value = parents

		const router = useRouter()
		parents.forEach((category) => {
			router.addRoute({					
						name: `icommerce.products.${category.slug}`,
						path: `/products`,
						params: {
						  slug: category.slug
						},
						meta: {
							middleware: 'auth',
							layout: 'icommerce',							
							breadcrumb: category.title, 
							
						},
						component: productsPage
			})
		})
		getSelectedCategory(parents)
	})
}



function isActive(category){
	
	return route.path.includes(category?.slug) || (selectedCategoryState?.value?.slug == category.slug) || false
}

onMounted(async () => {
	init();
})

onUnmounted(() => {
	window.removeEventListener('resize', updateViewport)
})

</script>
<style>
.expand-icon > i {
	font-size: 15px !important; /* Cambia el tamaño del icono aquí */
}
</style>