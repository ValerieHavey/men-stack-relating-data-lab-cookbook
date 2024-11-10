const requestedUser = (req, res, next) => {
   res.locals.requestedUser = req.params.userId ? req.params.userId : null
   next();
};

module.exports = requestedUser;