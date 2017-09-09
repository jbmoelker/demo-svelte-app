import App from './components/app.html'

const app = new App({
  target: document.querySelector('#root'),
  data: { name: 'world' },
})