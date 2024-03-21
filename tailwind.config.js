/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width:{
        '50':'53%',
        '22':'87px',
        '15':'60px',
        '51':'55%',
        '81':'572px',
        '98':'1072px',
        '97':'650px'
        
      },
      fontSize:{
        'xss':'13px',
        'xmm':'15px'
      },
      height:{
        '13':'50px'
      },
      backgroundColor:{
        'fade-gray':'#fff'
      },
      screens: {
        'bigtablet': '890px',
        'midmobile':  '353px'
       
      },
      backgroundImage: {
        'hero-pattern': "url('https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_banner_yellow.png-26-0cad087b263ce130.png')",
        
      }
    },
  },
  plugins: [],
}

