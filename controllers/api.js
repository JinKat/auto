'use strict';
const express = require('express');

module.exports = (userService, roleService, authService, autoService, config) => {
    const router = express.Router();

   // const roleController = require('./role')(roleService, promiseHandler);
    const authController = require('./users')(authService,userService, config);
    const sessionController = require('./session')(authService, config);
    const autoController = require('./auto')(autoService, promiseHandler);

    
    router.use('/session', sessionController);
    router.use('/users', authController);
    router.use('/cars', autoController);

    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.send({error: err.message}));
}