import './main.scss';

const root: HTMLElement = document.getElementById('root')!;

const paragraphEl = document.createElement('p');
paragraphEl.textContent = 'Hello World';
paragraphEl.classList.add('red');
root.appendChild(paragraphEl);
