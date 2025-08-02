



import flowbite from "flowbite-react/tailwind";


/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
		flowbite.content(),
	],
darkMode:"class",
	theme: {
		container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '3rem',
                xl: '5rem',
                '2xl': '6rem',
            },
		},
		extend: {
			fontFamily: {
				'Cairo': 'var(--font-Cairo)',
			},// Add any custom dark mode colors or extensions here
			backgroundColor: {
			  'dark-primary': '#121212',
			  'dark-secondary': '#1E1E1E',
			  'dark-background': 'var(--dark-background)'
			},
			textColor: {
			  'dark-primary': '#E0E0E0',
			  'dark-secondary': '#A0A0A0',
			  'dark-text':'var(--dark-text)'
			
			},
			colors: {
                'primary': 'var(--primary-color)',
                'primary-dark': 'var(--primary-color-dark)',
                'primary-light': 'var(--primary-color-light)',
				'primary-50': 'var(--primary-50)',
				'primary-100': 'var(--primary-100)',
				'primary-200': 'var(--primary-200)',
				'primary-300': 'var(--primary-300)',
				'primary-400': 'var(--primary-400)',
				'primary-500': 'var(--primary-500)',
				'primary-600': 'var(--primary-600)',
				'primary-700': 'var(--primary-700)',
				'primary-800': 'var(--primary-800)',
				'primary-900': 'var(--primary-900)',
				'primary-950': 'var(--primary-950)',
				'primary-50': 'var(--primary-50)',
                'accent': 'var(--accent-color)',
                'accent-dark': 'var(--accent-color-dark)',
                'accent-light': 'var(--accent-color-light)',
				'accent-50': 'var(--accent-50)',
				'accent-100': 'var(--accent-100)',
				'accent-200': 'var(--accent-200)',
				'accent-300': 'var(--accent-300)',
				'accent-400': 'var(--accent-400)',
				'accent-500': 'var(--accent-500)',
				'accent-600': 'var(--accent-600)',
				'accent-700': 'var(--accent-700)',
				'accent-800': 'var(--accent-800)',
				'accent-900': 'var(--accent-900)',
				'accent-950': 'var(--accent-950)',
				'lightgray': 'var(--lightgray-color)',
				// 'gray': 'var(--gray-color)',
				'darkgray': 'var(--darkgray-color)',
            },
			backgroundImage: {
				'book-background': 'url("./src/assets/imgs/bookstore/book-bg.jpg")'
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
