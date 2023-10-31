const app = require('./configs/app.config');
const connectDb = require('./configs/mongoose.config');
connectDb()

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else console.log(`Listening on port ${port}`);

})