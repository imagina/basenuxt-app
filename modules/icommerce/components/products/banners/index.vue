<template>
  
  
    <component
      v-if="getBannerComponent(category)"
      :is="getBannerComponent(category)?.component">
    </component>
 
</template>
<script setup>

import banner_1 from './categories/banner_1.vue'
import banner_2 from './categories/banner_2.vue';

 

const props = defineProps( {
  category: {
    type: Object
  }
} )

const banners = [
  {    
    id: 1, component: banner_1
  },
  {    
    id: 2, component: banner_1
  },
  {
    
    id: 3, component: banner_2
  },
  {
    
    id: 4, component: banner_2
  },
  {
    
    id: 5, component: banner_2
  }

]



function getBannerComponent(category){
  return banners.find(x => x.id == category.id) || false
}

</script>
<style>
.banner-page-hosting {
  background-color: #f5f5f5;
  background-size: cover;
  position: relative;
}

.banner-page-hosting::after, .banner-page-hosting::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.banner-page-hosting::before {
	border-radius: 20px;
	background-clip: border-box;
	-webkit-background-clip: padding-box;
  background: linear-gradient(90deg,#212023 20%,hsla(0,0%,100%,0));
  z-index: 1;
}
</style>