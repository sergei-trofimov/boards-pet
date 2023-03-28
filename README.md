# React Education

## About the project
Application configured manually using Webpack (also I have a branch with migration on the Vite version). The app allows/has:
>- Authorization (Log in/Sign up). Authorization is using Firebase Authentication.
>- A user can create an account (unique workspace) and email invites other users. This opportunity allows the creation of some workspace for several users.
>- Users can create boards(any amount);
>- Each board can have cards (any amount);
>- Each card can have fields (text, checkbox, select). Users can create, edit, and remove these fields. (App allows create inputs dynamically).
>- Also users can edit and remove boards and cards.
>- Drag and Drop feature;
>- Also added Web Sockets for real-time updates. So when one user makes some changes (for example create a board) other users immediately receive newly updated data. 

## You can visit the preview of the project
#### [**Preview Link**](https://pointless-humor.surge.sh/)

## [**Server PR**](https://github.com/sergei-trofimov/boards-pet-server)


### **Use technologies**
>1. React 18.2
>2. React Router DOM 6.4
>3. Redux/Toolkit/Thunk
>4. Formik
>5. Tailwind CSS
>6. Lottie
>7. Axios
>8. Firebase
>9. Surge (for the project deployment)
>10. MobX (alternate version instead of using Redux)
>11. Webpack (also have migration to Vite)
>12. TypeScript
>13. Web Socket
>14. Socket IO
>15. Express
>16. Node JS
>17. Nodemailer
>18. ESLint
>19. Husky
>20. Prettier
>21. Jest

### **Scripts commands**
>1. ***npm run start***: running the project in the development mode;
>2. ***npm run build***: creating a production bundle;
>3. ***npm run lint***: running es linter;
>4. ***npm run test***: running tests in watch mode;
>5. ***npm run test-single-run***: running tests once;
>6. ***npm run deploy***: creating a production bundle and deploying the project;
>7. ***npm run format***: running Prettier for auto-formatting all files;

### **Node & NPM versions**
>1. node: "v16.13.1",
>2. npm: "8.19.2"
