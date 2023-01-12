import './main.scss';

const root = document.getElementById('root');

const paragraphEl = document.createElement('p');
paragraphEl.textContent = 'Hello World';
paragraphEl.classList.add('red');

root.appendChild(paragraphEl);
