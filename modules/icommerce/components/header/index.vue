<template>  
  <header
      :class="[
      'tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-200',
      isScrolled ? 'tw-bg-[#101923] tw-text-white' : 'tw-bg-white'
    ]"
  >
    <div class="
        tw-min-h-[60px] 2xl:tw-px-20 xl:tw-px-4 sm:tw-px-2
        tw-px-2 tw-flex tw-items-center tw-justify-between relative
      ">

      <!-- LOGO -->
      <div class="lg:tw-w-1/12 tw-relative tw-order-1">
        <NuxtLink to="https://www.imaginacolombia.com/"
        >
          <img
              :src="logoSrc"
              alt="Logo"
              class="tw-w-10 tw-min-w-10 tw-cursor-pointer"
          />
        </ NuxtLink>
      </div>

      <!-- MENÚ DE NAVEGACIÓN -->
      <div class="
        tw-flex justify-end lg:tw-justify-center tw-w-full tw-pl-4 xl:tw-px-5
        tw-relative tw-order-1
      ">
      
        
        <Navbar :nav-items="navItems" :is-scrolled="isScrolled" />      
      </div>

      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <section class="
        tw-flex tw-items-center tw-justify-end lg:tw-w-3/12 xl:tw-w-3/12
        tw-min-w-max tw-relative tw-order-2
      ">
      <div class="tw-mx-4">
        <LocaleSelector 
         :dark="isScrolled"
        />
      </div>

      <!--       Buttons Group-->
        
        <NavbarButtons :scroll-position="scrollPosition" :is-scrolled="isScrolled"/>
        

        <!--    Cart Component -->
        <div class="tw-pl-1 tw-relative tw-order-3">
          <p>carrito</p>
        </div>

      </section>

    </div>
  </header>

</template>

<script setup>
import {ref, computed} from 'vue'
import Navbar from './Navbar.vue'
import whiteLogo from '../../assets/img/white-logo-imagina.png'
import redLogo from '../../assets/img/red-logo-imagina.png'
import NavbarButtons from "./NavbarButtons.vue";

const props = defineProps( {
  scrollPosition: Object
} );

const isScrolled = computed( () => props.scrollPosition?.position > 0 );
const logoSrc = computed( () =>
    isScrolled.value
        ? whiteLogo
        : redLogo
);

const isMobile = ref(false);

const navItems = ref([
  { 
    label: 'Imagina', 
    items: [
      { 
        label: 'Conócenos', 
        to: '',
      },
      { 
        label: 'Historia', 
        to: '',
      },
      { 
        label: 'Únete a nuestro equipo', 
        to: '',
      },
      { 
        label: 'Trabajos realizados', 
        to: '',
      }
    ]
  },
  {
    label: 'Hosting',
    items: [
      { 
        label: 'Hosting Linux / PHP - iPanel', 
        to: '',
      },
      { 
        label: 'Hosting cPanel', 
        to: '',
      },
      { 
        label: 'CDN premium', 
        to: '',
      },
      { 
        label: 'S3 Wasabi', 
        to: '',
      },
      { 
        label: 'Hosting Windows / ASP', 
        to: '',
      },
      { 
        label: 'Hosting Laravel', 
        to: '',
      },
      { 
        label: 'Aplicaciones', 
        items: [
          {
            label: 'Hosting Wordpress', 
            to: '',
          },
          {
            label: 'Hosting Moodle', 
            to: '',
          },
          {
            label: 'Hosting PHP 8', 
            to: '',
          },
          {
            label: 'Hosting Magento', 
            to: '',
          }
        ]
      },
      { 
        label: 'Hosting Revendedores', 
        to: '',
      },
      { 
        label: 'Servidores Privados VPS', 
        items: [
          {
            label: 'Servidores VPS SSD', 
            to: '',
          },
          {
            label: 'Servidores VPS Cloud', 
            to: '',
          }
        ]
      },
      { 
        label: 'Servidores Dedicados', 
        to: '',
      },
      { 
        label: 'Streaming de audio en vivo', 
        to: '',
      },
      { 
        label: 'Email', 
        items: [
          {
            label: 'Google Workspace - GSuite', 
            to: '',
          },
          {
            label: 'Correos corporativos Office 365', 
            to: '',
          }
        ]
      },
    ]
  },
  { 
    label: 'Dominios', 
    to: '',
  },
  { 
    label: 'Seguridad', 
    items: [
      {
        label: 'Certificados SSL',
        to: '',
      },
      {
        label: 'SiteLock Escáner de seguridad',
        to: '',
      }
      
    ] 
  },
  { 
    label: 'Soluciones Web', 
    items: [
      {
        label: 'Marketing Digital',
        items: [
          {
            label: 'Community Manager',
            to: '',
          },
          {
            to: '',
            label: "Google / YouTube Adwords"
          },
          {
            to: '',
            label: "Facebook Instagram Ads"
          },
          {
            to: '',
            label: "Posicionamiento Natural Seo"
          },
        ]
      },
      {
        label: 'Páginas web', 
        items: [
          {
            to: '',
              label: "Planes Para Empresas / Corporativo"
            },
          {
            to: '',
            label: "Planes Para Negocios"
          },
        ]
      },
      {
        to: '',
        label: "Apps"
      },
      {
        to: '',
        label: "Tiendas virtuales"
      },
      {
        to: '',
        label: "Administrador de Contenido"
      },
    ] 
  },
  { 
    label: 'Diseño', 
    items: [
      {
        to: '',
        label: "Identidad visual"
      },
      {
        to: '',
        label: "Diseño Gráfico"
      },
    ]
   },
  {
    to: '',
    label: "Contacto"
  },
  { 
    label: 'Clientes', 
    items: [
      {
        to: '',
        label: "Panel de control"
      },
      {
        to: '',
        label: "Guias de usuario"
      },
      {
        to: '',
        label: "Programa de Afiliados"
      },
      {
        to: '',
        label: "Formas de Pago"
      },
    ]
   },
  { label: 'Blog', 
    to: '',
  },
])
</script>
<style>
.dropdown-sign-in > span > i {
  font-size: 11px !important;
}
</style>