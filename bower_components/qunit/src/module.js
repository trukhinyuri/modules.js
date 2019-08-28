import config from "./core/config";

import SuiteReport from "./reports/suite";

import { extend, objectType, generateHash } from "./core/utilities";
import { globalSuite } from "./core";

let focused = false;

const moduleStack = [];

function createModule( name, testEnvironment, modifiers ) {
	const parentModule = moduleStack.length ? moduleStack.slice( -1 )[ 0 ] : null;
	const moduleName = parentModule !== null ? [ parentModule.name, name ].join( " > " ) : name;
	const parentSuite = parentModule ? parentModule.suiteReport : globalSuite;

	const skip = parentModule !== null && parentModule.skip || modifiers.skip;
	const todo = parentModule !== null && parentModule.todo || modifiers.todo;

	const module = {
		name: moduleName,
		parentModule: parentModule,
		tests: [],
		moduleId: generateHash( moduleName ),
		testsRun: 0,
		unskippedTestsRun: 0,
		childModules: [],
		suiteReport: new SuiteReport( name, parentSuite ),

		// Pass along `skip` and `todo` properties from parent module, in case
		// there is one, to childs. And use own otherwise.
		// This property will be used to mark own tests and tests of child suites
		// as either `skipped` or `todo`.
		skip: skip,
		todo: skip ? false : todo
	};

	const env = {};
	if ( parentModule ) {
		parentModule.childModules.push( module );
		extend( env, parentModule.testEnvironment );
	}
	extend( env, testEnvironment );
	module.testEnvironment = env;

	config.modules.push( module );
	return module;
}

function processModule( name, options, executeNow, modifiers = {} ) {
	if ( objectType( options ) === "function" ) {
		executeNow = options;
		options = undefined;
	}

	let module = createModule( name, options, modifiers );

	// Move any hooks to a 'hooks' object
	const testEnvironment = module.testEnvironment;
	const hooks = module.hooks = {};

	setHookFromEnvironment( hooks, testEnvironment, "before" );
	setHookFromEnvironment( hooks, testEnvironment, "beforeEach" );
	setHookFromEnvironment( hooks, testEnvironment, "afterEach" );
	setHookFromEnvironment( hooks, testEnvironment, "after" );

	const moduleFns = {
		before: setHookFunction( module, "before" ),
		beforeEach: setHookFunction( module, "beforeEach" ),
		afterEach: setHookFunction( module, "afterEach" ),
		after: setHookFunction( module, "after" )
	};

	const currentModule = config.currentModule;
	if ( objectType( executeNow ) === "function" ) {
		moduleStack.push( module );
		config.currentModule = module;
		executeNow.call( module.testEnvironment, moduleFns );
		moduleStack.pop();
		module = module.parentModule || currentModule;
	}

	config.currentModule = module;

	function setHookFromEnvironment( hooks, environment, name ) {
		const potentialHook = environment[ name ];
		hooks[ name ] = typeof potentialHook === "function" ? [ potentialHook ] : [];
		delete environment[ name ];
	}

	function setHookFunction( module, hookName ) {
		return function setHook( callback ) {
			module.hooks[ hookName ].push( callback );
		};
	}
}

export default function module( name, options, executeNow ) {
	if ( focused ) {
		return;
	}

	processModule( name, options, executeNow );
}

module.only = function() {
	if ( focused ) {
		return;
	}

	config.modules.length = 0;
	config.queue.length = 0;

	module( ...arguments );

	focused = true;
};

module.skip = function( name, options, executeNow ) {
	if ( focused ) {
		return;
	}

	processModule( name, options, executeNow, { skip: true } );
};

module.todo = function( name, options, executeNow ) {
	if ( focused ) {
		return;
	}

	processModule( name, options, executeNow, { todo: true } );
};
