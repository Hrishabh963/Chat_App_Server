const errorLogger = (error, req, res, next) => {
    console.log(error.message);
    next(error);
};

//To show the error to the client
const errorResponder = (error, req, res, next) => {
    const statusCode = error.status || 400;
    res.status(statusCode).send(error.message);
};

//To handle all 404 requests made

const errorPath = (req, res) => {
    res.status(404).send('Oops path not found');
};

module.exports = { errorLogger, errorResponder, errorPath };