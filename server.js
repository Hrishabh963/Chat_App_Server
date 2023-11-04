const server = require('./configs/app.config');
const connectDb = require('./configs/mongoose.config');
connectDb()

const port = process.env.PORT || 3000;
server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else console.log(`Listening on port ${port}`);

})