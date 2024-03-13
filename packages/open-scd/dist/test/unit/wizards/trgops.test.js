import { expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import '../../../src/addons/Wizards.js';
import { isReplace, } from '../../../src/foundation.js';
import { editTrgOpsWizard } from '../../../src/wizards/trgops.js';
describe('Wizards for SCL TrgOps element', () => {
    let element;
    let trgOps;
    let inputs;
    let primaryAction;
    let actionEvent;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        trgOps = (new DOMParser().parseFromString(`<TrgOps dchg="true" gi="false"></TrgOps>`, 'application/xml').documentElement);
        actionEvent = spy();
        window.addEventListener('editor-action', actionEvent);
    });
    describe('define an edit wizard that', () => {
        beforeEach(async () => {
            const wizard = editTrgOpsWizard(trgOps);
            element.workflow.push(() => wizard);
            await element.requestUpdate();
            inputs = Array.from(element.wizardUI.inputs);
            await element.requestUpdate();
            primaryAction = (element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]'));
        });
        it('looks like the latest snapshot', async () => {
            await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
        }).timeout(5000);
        it('does not update the TrgOps element with no changed attributes', async () => {
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent.notCalled).to.be.true;
        });
        it('updates the TrgOps element with changed dchg attribute', async () => {
            const input = inputs[0];
            input.maybeValue = 'false';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const updateAction = action;
            expect(updateAction.old.element).to.have.attribute('dchg', 'true');
            expect(updateAction.new.element).to.have.attribute('dchg', 'false');
        });
        it('updates the TrgOps element with changed qchg attribute', async () => {
            const input = inputs[1];
            input.nullSwitch?.click();
            input.maybeValue = 'false';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const updateAction = action;
            expect(updateAction.old.element).to.not.have.attribute('qchg');
            expect(updateAction.new.element).to.have.attribute('qchg', 'false');
        });
        it('updates the TrgOps element with changed dupd attribute', async () => {
            const input = inputs[2];
            input.nullSwitch?.click();
            input.maybeValue = 'true';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const updateAction = action;
            expect(updateAction.old.element).to.not.have.attribute('dupd');
            expect(updateAction.new.element).to.have.attribute('dupd', 'true');
        });
        it('updates the TrgOps element with changed gi attribute', async () => {
            const input = inputs[4];
            input.maybeValue = 'true';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const updateAction = action;
            expect(updateAction.old.element).to.have.attribute('gi', 'false');
            expect(updateAction.new.element).to.have.attribute('gi', 'true');
        });
        it('updates the TrgOps element with changed period attribute', async () => {
            const input = inputs[3];
            input.nullSwitch?.click();
            input.maybeValue = 'true';
            await input.requestUpdate();
            primaryAction.click();
            await element.requestUpdate();
            expect(actionEvent).to.be.calledOnce;
            const action = actionEvent.args[0][0].detail.action;
            expect(action).to.satisfy(isReplace);
            const updateAction = action;
            expect(updateAction.old.element).to.not.have.attribute('period');
            expect(updateAction.new.element).to.have.attribute('period', 'true');
        });
    });
});
//# sourceMappingURL=trgops.test.js.map