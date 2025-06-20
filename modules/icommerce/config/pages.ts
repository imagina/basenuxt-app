const layout = 'icommerce'
const pages = [
  
  {
    name: 'icommerce.products',
    path: '/products/:slug?',
    //page: 'pages/products.vue',
    page: 'pages/products.vue',
    meta: {
      layout: 'blank',
      title: 'icommerce.cms.sidebar.adminProducts',
      breadcrumb: 'Productos'
    },
  },  
  
]



export default pages