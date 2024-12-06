/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['../**/*.ftl'],
  theme: {
    extend: {
      colors: {
        primary: '#00103F',
        secondary: '#0A4982',

        provider: {
          bitbucket: '#0052CC',
          facebook: '#1877F2',
          github: '#181717',
          gitlab: '#FC6D26',
          google: '#4285F4',
          instagram: '#E4405F',
          linkedin: '#0A66C2',
          microsoft: '#5E5E5E',
          oidc: '#F78C40',
          openshift: '#EE0000',
          paypal: '#00457C',
          stackoverflow: '#F58025',
          twitter: '#1DA1F2',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
