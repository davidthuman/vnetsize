import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Prime Vue
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'


const app = createApp(App);

const Preset = definePreset(Aura, {
    semantic: {
        semantic: {
            primary: {
                50: '#f3f8fc',
                100: '#e6f1f8',
                200: '#c7e2f0',
                300: '#95cae4',
                400: '#5caed4',
                500: '#3999c6',
                600: '#2777a2',
                700: '#215f83',
                800: '#1f516d',
                900: '#1e445c',
                950: '#142d3d'
            },
            secondary: {
                50: '#faffe5',
                100: '#f2ffc7',
                200: '#e5ff95',
                300: '#e5ff95',
                400: '#bbf526',
                500: '#9cdc06',
                600: '#7fba00',
                700: '#5a8506',
                800: '#49690b',
                900: '#3d580f',
                950: '#1f3201'
            },
        },
        
    }
});

/*
colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
*/


app.use(PrimeVue, {
    theme: {
        preset: Preset,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false
        }
    }
});

app.mount('#app');
