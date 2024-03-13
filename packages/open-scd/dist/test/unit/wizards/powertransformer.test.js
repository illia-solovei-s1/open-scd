import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/addons/Wizards.js';
import { replaceNamingAction } from '../../../src/wizards/foundation/actions.js';
import { createAction, createPowerTransformerWizard, editPowerTransformerWizard, } from '../../../src/wizards/powertransformer.js';
import { executeWizardCreateAction, executeWizardReplaceAction, expectWizardNoUpdateAction, fetchDoc, setWizardTextFieldValue, } from './test-support.js';
describe('Wizards for SCL element Power Transformer', () => {
    let doc;
    let powerTransformer;
    let element;
    let inputs;
    describe('edit existing Power Transformer', () => {
        beforeEach(async () => {
            doc = await fetchDoc('/test/testfiles/valid2007B4withSubstationXY.scd');
            powerTransformer = doc.querySelector('PowerTransformer[name="TA1"]');
            element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
            const wizard = editPowerTransformerWizard(powerTransformer);
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
        });
        it('update name should be updated in document', async function () {
            await setWizardTextFieldValue(inputs[0], 'OtherTA1');
            const updateAction = executeWizardReplaceAction(replaceNamingAction(powerTransformer), element.wizardUI, inputs);
            expect(updateAction.old.element).to.have.attribute('name', 'TA1');
            expect(updateAction.new.element).to.have.attribute('name', 'OtherTA1');
        });
        it('update description should be updated in document', async function () {
            await setWizardTextFieldValue(inputs[1], 'Some description');
            const updateAction = executeWizardReplaceAction(replaceNamingAction(powerTransformer), element.wizardUI, inputs);
            expect(updateAction.old.element).to.not.have.attribute('desc');
            expect(updateAction.new.element).to.have.attribute('desc', 'Some description');
        });
        it('when no fields changed there will be no update action', async function () {
            expectWizardNoUpdateAction(replaceNamingAction(powerTransformer), element.wizardUI, inputs);
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
    describe('add new Power Transformer', () => {
        let parent;
        beforeEach(async () => {
            doc = await fetchDoc('/test/testfiles/valid2007B4withSubstationXY.scd');
            parent = doc.querySelector('Substation[name="AA1"]');
            element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
            const wizard = createPowerTransformerWizard(parent);
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
        });
        it('create new Power Transformer', async function () {
            await setWizardTextFieldValue(inputs[0], 'NewTA1');
            const createAC = executeWizardCreateAction(createAction(parent), element.wizardUI, inputs);
            expect(createAC.new.element).to.have.attribute('name', 'NewTA1');
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        });
    });
});
//# sourceMappingURL=powertransformer.test.js.map