'use strict';
module.exports = (autoRepository, errors) => {
    const BaseService = require('./base');
    const config = require('../config.json');
    const Promise = require("bluebird");
    Object.setPrototypeOf(AutoService.prototype, BaseService.prototype);

    function AutoService(autoRepository, errors) {
        BaseService.call(this, autoRepository, errors);

        let self = this;

        self.create = create;
        self.update = update;
        self.readChunk = readChunk;

        function create(data) {
            return self.baseCreate(data);
        }

        function update(id, data) {
            return self.baseCreate(id, data);
        }

        function readChunk(options) {
            options = Object.assign({}, config.defaults.readChunk, options);

            var limit = Number(options.length);
            var offset = Number(options.start);
            var searchKey = '%' + options.search + '%';

            return autoRepository.findAndCountAll({
                limit: limit,
                offset: offset,
                raw: true,
                where: {
                    $or: [
                        {
                            nameAuto: {
                                $like: searchKey
                            }
                        },
                        {
                            nameStop: {
                                $like: searchKey
                            }
                        }
                    ]
                }
            });
        }
    }
    return new AutoService(autoRepository, errors);
};