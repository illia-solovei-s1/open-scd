import { expect, fixture, html } from '@open-wc/testing';
import '../../../src/addons/Wizards.js';
import { editConnectivityNodeWizard } from '../../../src/wizards/connectivitynode.js';
describe('Wizards for SCL element ConnectivityNode', () => {
    let doc;
    let element;
    beforeEach(async () => {
        element = await fixture(html `<oscd-wizards .host=${document}></oscd-wizards>`);
        doc = await fetch('/test/testfiles/valid2007B4withSubstationXY.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        const wizard = editConnectivityNodeWizard(doc.querySelector('ConnectivityNode'));
        element.workflow.push(() => wizard);
        await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
});
//# sourceMappingURL=connectivitynode.test.js.map