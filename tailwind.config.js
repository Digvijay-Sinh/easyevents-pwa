/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
        'node_modules/flowbite-react/lib/esm/**/*.js',
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",

    ],
    theme: {
        extend: {
            fontFamily: {
                custom: ['Lora', 'sans-serif'],
            },

        },
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('flowbite/plugin'),

    ],
}

// /** @type {import('tailwindcss').Config} */

// import { screens as _screens } from 'tailwindcss/defaultTheme'

// export const content = [
//     './src/**/*.{js,jsx,ts,tsx}',
//     "./node_modules/flowbite/**/*.js",
//     'node_modules/flowbite-react/lib/esm/**/*.js'
// ]
// export const theme = {

//     screens: {
//         'xs': '320px',
//         ..._screens,
//     },
// }
// export const plugins = [
// eslint-disable-next-line no-undef
//     require('flowbite/plugin'),
// ]