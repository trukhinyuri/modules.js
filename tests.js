import {Modules} from "./modules.js";
import sinon from './node_modules/sinon/pkg/sinon-esm.js';

let expect = chai.expect;
let assert = chai.assert;
let should = chai.should;
let before = chai.before;
let after = chai.after;
let counter = window.chai_counter;
chai.use(chai_counter.plugin);

describe('Modules', () =>  {
    it('Modules object exist', () =>  {
        counter.expect(1);
        let modules = new Modules();
        expect(modules).to.be.a('object').cc;
        counter.assert()
    });

    it('Check modules subobjects create correctly when modules instantiated', () =>  {
        counter.expect(2)
        let modules = new Modules();
        expect(modules.loader).to.be.a("object").cc;
        expect(modules.dom).to.be.a("object").cc;
        counter.assert()
    });

    describe('Modules.DOM', () => {
        it('Modules.DOM object exist', () =>  {
            counter.expect(1);
            let dom = new Modules.DOM();
            expect(dom).to.be.a('object').cc;
            counter.assert()
        });

        it('_getDocumentRootURL // getDocumentRootURL', () =>  {
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

        it('_buildDocumentURLWithPath // buildDocumentURLWithPath', () =>  {
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

        it('_buildDocumentURLWithPathAndModulePath', () => {
            counter.expect(1);
            let expected, actual;

            expected = "https://plugndo.com:8080/modules/footer/";
            actual = Modules.Loader._buildDocumentURLWithRelativePathAndModulePath('modules', 'footer', "https://plugndo.com:8080");
            expect(actual).to.equal(expected).cc;

            counter.assert();
        });

        it('makeRequest ("GET", "./modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.requestAsync("GET", "./modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

        it('makeRequest ("GET", "/modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.requestAsync("GET", "/modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

        it('makeRequest ("GET", "modulesForTests/first/first.js") // real file loading', async () => {
            counter.expect(1);

            let result = await Modules.Loader.requestAsync("GET", "modulesForTests/first/first.js");
            expect(result.split('\n')[0]).to.equal("let first = 0;").cc;

            counter.assert();
        });

        it('_writeModuleLoadingTreeHistory (parent, className, moduleName)', function () {
            counter.expect(40);
            //clean
            window.__________ModulesGlobalInternalInfo__________ = {};

            Modules.Loader._writeModuleLoadingTreeHistory(null, "modulePlace", "first");
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].parent).to.be.a('array').cc;
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].parent.length).to.equal(0).cc;
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].className).to.equal("modulePlace").cc;
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].moduleName).to.equal("first").cc;
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].child).to.be.a('array').cc;
            expect(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document[0].child.length).to.equal(0).cc;

            Modules.Loader._writeModuleLoadingTreeHistory(null, "modulePlace", "first");

            window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document.forEach(
                element => {
                    expect(element.parent).to.be.a('array').cc;
                    expect(element.parent.length).to.equal(0).cc;
                    expect(element.className).to.equal("modulePlace").cc;
                    expect(element.moduleName).to.equal("first").cc;
                    expect(element.child).to.be.a('array').cc;
                    expect(element.child.length).to.equal(0).cc;
                }
            );

            Modules.Loader._writeModuleLoadingTreeHistory("first", "firstPlace", "second");
            window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document.forEach(
                element => {
                    expect(element.parent).to.be.a('array').cc;
                    expect(element.parent.length).to.equal(0).cc;
                    expect(element.className).to.equal("modulePlace").cc;
                    expect(element.moduleName).to.equal("first").cc;
                    expect(element.child).to.be.a('array').cc;
                    expect(element.child.length).to.equal(1).cc;

                    element.child.forEach(
                        subElement => {
                            expect(subElement.parent).to.equal("first").cc;
                            expect(subElement.className).to.equal("firstPlace").cc;
                            expect(subElement.moduleName).to.equal("second").cc;
                            expect(subElement.child).to.be.a('array').cc;
                            expect(subElement.child.length).to.equal(0).cc;
                        }
                    )
                }
            );

            //clean
            window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document = {};
            counter.assert();
        });

        // it('loadSingleModuleInClassAsync (relativePath, moduleName, className) // stub', async () => {
        //     counter.expect(1);
        //
        //     let stub = sinon.stub(Modules.Loader, '_loadSingleModule').callsFake(() => {
        //         return "ok";
        //     });
        //
        //     let expected = "ok";
        //     let actual = await Modules.Loader.loadSingleModuleInClassAsync("document", "modulesForTests", "first", "modulesSpace");
        //     expect(expected).to.equal(actual).cc;
        //
        //     counter.assert();
        //
        //     stub.restore();
        // });

         it('loadSingleModuleInClassAsync (relativePathFromRoot, moduleName, className) // check cascade modules loading', function () {
             Modules.Loader.loadSingleModuleInClassAsync(null, "modulesForTests", "first", "modulesSpace");
             Modules.Loader.loadSingleModuleInClassAsync(null, "modulesForTests", "first", "modulesSpace");
             Modules.Loader.loadSingleModuleInClassAsync("first", "modulesForTests", "second", "first");
             Modules.Loader.loadSingleModuleInClassAsync("second", "modulesForTests", "third", "second");
             console.log(JSON.stringify(window.__________ModulesGlobalInternalInfo__________.ModulesLoadHistory_document));
         });

    });

});

