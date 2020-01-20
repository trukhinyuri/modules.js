import {Modules} from "./modules.js";
import sinon from './node_modules/sinon/pkg/sinon-esm.js';

let expect = chai.expect;
let assert = chai.assert;
let should = chai.should;
let before = chai.before;
let after = chai.after;
let counter = window.chai_counter;
chai.use(chai_counter.plugin);

describe('Modules', function () {
    it('Modules object exist', function () {
        counter.expect(1);
        let modules = new Modules();
        expect(modules).to.be.a('object').cc;
        counter.assert()
    });

    it('Check modules subobjects create correctly when modules instantiated', function () {
        counter.expect(2)
        let modules = new Modules();
        expect(modules.loader).to.be.a("object").cc;
        expect(modules.dom).to.be.a("object").cc;
        counter.assert()
    });

    describe('Modules.DOM', function () {
        it('Modules.DOM object exist', function () {
            counter.expect(1);
            let dom = new Modules.DOM();
            expect(dom).to.be.a('object').cc;
            counter.assert()
        });

        it('_getDocumentRootURL // getDocumentRootURL', function () {
            counter.expect(1);

            let expected = "https://plugndo.com:8080";
            let actual = Modules.DOM._getDocumentRootURL("https://plugndo.com:8080");
             expect(actual).to.equal(expected).cc;
             counter.assert()
        });
    });

    describe('Modules.Loader', function () {
        it('Modules.Loader object exist', function () {
            let loader = new Modules.Loader();
            expect(loader).to.be.a('object');
        });

        it('_buildDocumentURLWithPath // buildDocumentURLWithPath', function () {
            counter.expect(4);
            let expected, actual;

            expected = "https://plugndo.com:8080/modules/";
            actual = Modules.Loader._buildDocumentURLWithRelativePath('modules', "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            actual = Modules.Loader._buildDocumentURLWithRelativePath('modules/', "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            actual = Modules.Loader._buildDocumentURLWithRelativePath('/modules/', "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            expected = "https://plugndo.com:8080/";

            actual = Modules.Loader._buildDocumentURLWithRelativePath(null, "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            counter.assert();
        });

        it('_buildDocumentURLWithPathAndModulePath', function () {
            counter.expect(1);
            let expected, actual;

            expected = "https://plugndo.com:8080/modules/footer/";
            actual = Modules.Loader._buildDocumentURLWithRelativePathAndModulePath('modules', 'footer', "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            counter.assert();
        });

        it('makeRequest ("GET", "./modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.asyncRequest("GET", "./modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

        it('makeRequest ("GET", "/modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.asyncRequest("GET", "/modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

        it('makeRequest ("GET", "modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.asyncRequest("GET", "modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

    });

});

