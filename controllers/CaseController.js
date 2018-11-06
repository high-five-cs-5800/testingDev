var restful = require('node-restful');

module.exports = function(app, route){
    var rest = restful.model(
        'case',
        app.models.case
    ).methods(['get', 'put', 'post', 'delete']);
    rest.register(app, route);

    //return middleware.
    return function(req, res, next){
        next();
    };
}
