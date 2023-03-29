const app = require('./src/app');
// console.log(process.env);
const PORT = process.env.PORT || 3056;
const server = app.listen(PORT, () => {
    console.log('Server start at: ',PORT);
});

// process.on('SIGINT', () => { // Click control + c will show
//     server.close(() => {
//         console.log(`Exit Server Express`)});
// });