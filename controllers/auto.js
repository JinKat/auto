'use strict';
module.exports = (autoService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(AutoController.prototype, BaseController.prototype);

    function AutoController(autoService, promiseHandler) {
        BaseController.call(this, autoService, promiseHandler);

        this.routes['/'] = [{method: 'get', cb: readAll},
            {method: 'post', cb: create}
           ];

        this.registerRoutes();
        return this.router;


        function create(req, res) {
            autoService.create(req.body).then((ams) => {
                res.json(ams)
            }).catch((err) => res.send({error: err.message}));

        }

        function readAll(req, res) {
            autoService.readChunk(req.query)
                .then((ams) => {
                    res.json(ams)
                })
                .catch((err) => res.send({error: err.message}));
        }
        
    }

    return new AutoController(autoService, promiseHandler);
};
    
    
    
    
    