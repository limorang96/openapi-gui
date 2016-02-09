function Method (name) {
    this.id = generateId()
    this.name = name;
    this.description = '';
    this.httpMethod = 'GET';
    this.path = '/';
    this.parameters = [ new Parameter('New Parameter') ];

    this.load = function(methodDefinition) {

        this.description = methodDefinition.description;
        this.httpMethod = methodDefinition.httpMethod;
        this.path = methodDefinition.path;
        this.parameters = [];

        angular.forEach(methodDefinition.parameters, function(parameterDefinition) {
            parameter = new Parameter(parameterDefinition.title);
            parameter.load(parameterDefinition);
            this.push( parameter );
        }, this.parameters);
    }

    this.render = function() {
        var parameters = {}

        angular.forEach(this.parameters, function(parameter) {
            this[parameter.title] = parameter.render();
        }, parameters);

        return {
            name: this.name,
            description: this.description,
            httpMethod: this.httpMethod,
            path: this.path,
            parameters: parameters
        };
    }
}