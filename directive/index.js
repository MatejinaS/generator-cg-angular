'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'package.json')).name;
	} catch (e) {
		this.appname = 'Cant find name from package.json';
	}

};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	var prompts = [{
		type:'confirm',
		name: 'needpartial',
		message: 'Does this directive need an external html file (i.e. partial)?',
		default: true
	}];

	this.prompt(prompts, function (props) {
		this.needpartial = props.needpartial;

		cb();
	}.bind(this));
};

DirectiveGenerator.prototype.files = function files() {

	if (this.needpartial){
		this.template('directive.js', 'directive/'+this.name+'/'+this.name+'.js');
		this.template('directive.html', 'directive/'+this.name+'/'+this.name+'.html');
		this.template('directive.css', 'directive/'+this.name+'/'+this.name+'.css');
		this.template('spec.js', 'test/unit/directive/'+this.name+'.js');

		cgUtils.addToFile('index.html','<script src="directive/'+this.name+'/'+this.name+'.js"></script>',cgUtils.DIRECTIVE_JS_MARKER,'\t');
		this.log.writeln(' updating'.green + ' %s','index.html');

		cgUtils.addToFile('css/app.css','@import "../directive/'+this.name+'/'+this.name+'.css";',cgUtils.DIRECTIVE_CSS_MARKER,'');
		this.log.writeln(' updating'.green + ' %s','app/app.css');	
	} else {
		this.template('directive_simple.js', 'directive/'+this.name+'.js');
		this.template('spec.js', 'test/unit/directive/'+this.name+'.js');	

		cgUtils.addToFile('index.html','<script src="directive/'+this.name+'.js"></script>',cgUtils.DIRECTIVE_JS_MARKER,'\t');
		this.log.writeln(' updating'.green + ' %s','index.html');			
	}

};