import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../../src/addons/Wizards.js';
import { identity, isSimple, } from '../../../../src/foundation.js';
import { eNumTypeEditWizard } from '../../../../src/editors/templates/enumtype-wizard.js';
describe('wizards for EnumType element', () => {
    let doc;
    let element;
    let inputs;
    let input;
    let primaryAction;
    let actionEvent;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        actionEvent = spy();
        window.addEventListener('editor-action', actionEvent);
    });
    describe('include an edit wizard that', () => {
        beforeEach(async () => {
            doc = await fetch('/test/testfiles/valid2003.scd')
                .then(response => response.text())
                .then(str => new DOMParser().parseFromString(str, 'application/xml'));
            const wizard = eNumTypeEditWizard(identity(doc.querySelector('EnumType')), doc);
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        describe('allows to edit id attribute', () => {
            beforeEach(() => {
                input = inputs.find(input => input.label === 'id');
            });
            it('as wizard input', () => expect(input).to.exist);
            it('triggers a complex action', () => {
                input.value = 'someTestId';
                primaryAction.click();
                expect(actionEvent).to.be.calledOnce;
                const action = actionEvent.args[0][0].detail.action;
                expect(action).to.not.satisfy(isSimple);
            });
            it('that edits the id attribute of EnumType', () => {
                input.value = 'someTestId';
                primaryAction.click();
                const complexAction = (actionEvent.args[0][0].detail.action);
                const actions = complexAction.actions;
                expect(actions[0].new.element).to.have.attribute('id', 'someTestId');
            });
            it('that edits all referenced lnType attribute as well', () => {
                const oldId = input?.value;
                const numReferences = doc.querySelectorAll(`DOType > DA[type="${oldId}"], DAType > BDA[type="${oldId}"]`).length;
                input.value = 'someTestId';
                primaryAction.click();
                const complexAction = (actionEvent.args[0][0].detail.action);
                const actions = complexAction.actions;
                expect(actions).to.have.lengthOf(numReferences + 1);
                actions.shift(); //the first updates the EnumType itself and has no 'id'
                for (const action of actions)
                    expect(action.new.element).to.have.attribute('type', 'someTestId');
            });
        });
    });
});
//# sourceMappingURL=enumtype.test.js.map