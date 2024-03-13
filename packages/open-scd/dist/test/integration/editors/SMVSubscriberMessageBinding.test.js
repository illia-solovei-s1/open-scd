import { __decorate } from "tslib";
import { expect, fixture, html } from '@open-wc/testing';
import SMVSubscriberMessageBindingPlugin from '../../../src/editors/SMVSubscriberMessageBinding.js';
import { MockOpenSCD } from '../../mock-open-scd.js';
import '../../mock-open-scd.js';
import { html as litHTML } from 'lit';
import { customElement, query } from 'lit/decorators.js';
customElements.define('smv-plugin', SMVSubscriberMessageBindingPlugin);
let SmvMockOpenSCD = class SmvMockOpenSCD extends MockOpenSCD {
    renderHosting() {
        return litHTML `<smv-plugin
      .doc=${this.doc}
      .editCount=${this.editCount}
      .nsdoc=${this.nsdoc}
    ></smv-plugin>`;
    }
};
__decorate([
    query('smv-plugin')
], SmvMockOpenSCD.prototype, "plugin", void 0);
SmvMockOpenSCD = __decorate([
    customElement('smv-mock-open-scd')
], SmvMockOpenSCD);
describe('Sampled Values Plugin', () => {
    let element;
    let parent;
    let doc;
    beforeEach(async () => {
        doc = await fetch('/test/testfiles/editors/MessageBindingSMV2007B4.scd')
            .then(response => response.text())
            .then(str => new DOMParser().parseFromString(str, 'application/xml'));
        parent = await fixture(html `<smv-mock-open-scd .doc=${doc}></smv-mock-open-scd>`);
        await parent.updateComplete;
        element = parent.plugin;
        await element.updateComplete;
    });
    describe('in Publisher view', () => {
        describe('initially', () => {
            it('the plugin looks like the latest snapshot', async () => {
                await expect(element).shadowDom.to.equalSnapshot();
            });
            it('the Sampled Values list looks like the latest snapshot', async () => {
                await expect(element.shadowRoot?.querySelector('smv-list')).shadowDom.to.equalSnapshot();
            });
            it('the subscriber list looks like the latest snapshot', async () => {
                await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
            });
        });
        describe('when selecting a Sampled Values message', () => {
            const nthSampledValueStream = 0;
            let fCDAs;
            let smvControlBlock;
            let smv;
            beforeEach(async () => {
                smvControlBlock = doc.querySelectorAll('SampledValueControl')[nthSampledValueStream];
                fCDAs = Array.from(smvControlBlock.parentElement?.querySelectorAll(`DataSet[name="${smvControlBlock.getAttribute('datSet')}"] > FCDA`) ?? []);
                smv = Array.from(element.shadowRoot
                    ?.querySelector('smv-list')
                    ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []).filter(item => !item.noninteractive)[nthSampledValueStream];
                smv.click();
                await element.updateComplete;
            });
            it('the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
                await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
            });
            describe('and subscribing an unsubscribed IED', () => {
                it('initially no ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(0);
                });
                it('it looks like the latest snapshot', async () => {
                    getItemFromSubscriberList('IED2').click();
                    await element.updateComplete;
                    await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
                });
                it('adds the required ExtRefs to the subscriber IED', async () => {
                    getItemFromSubscriberList('IED2').click();
                    await element.updateComplete;
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(fCDAs.length);
                });
                it('makes sure that Ed1 attributes are added properly', async () => {
                    getItemFromSubscriberList('IED2').click();
                    await element.requestUpdate();
                    fCDAs.forEach(fcda => expect(element.doc.querySelector(`IED[name="IED2"] ExtRef[iedName="IED3"][ldInst="${fcda.getAttribute('ldInst')}"][prefix="${fcda.getAttribute('prefix')}"][lnClass="${fcda.getAttribute('lnClass')}"][lnInst="${fcda.getAttribute('lnInst')}"][doName="${fcda.getAttribute('doName')}"][daName="${fcda.getAttribute('daName')}"]`)).to.exist);
                });
                it('makes sure that Ed2 attributes are added properly', async () => {
                    getItemFromSubscriberList('IED2').click();
                    await element.requestUpdate();
                    fCDAs.forEach(fcda => expect(element.doc.querySelector(`IED[name="IED2"] ExtRef[iedName="IED3"][srcLDInst="${fcda
                        .closest('LDevice')
                        ?.getAttribute('inst')}"][srcPrefix="${fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                    }"][srcLNClass="${fcda
                        .closest('LN0')
                        ?.getAttribute('lnClass')}"][srcCBName="${smvControlBlock.getAttribute('name')}"][serviceType="SMV"]`)).to.exist);
                });
            });
            describe('and you unsubscribe a subscribed IED', () => {
                it('initially all the ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(16);
                });
                it('it looks like the latest snapshot', async () => {
                    getItemFromSubscriberList('IED1').click();
                    await element.updateComplete;
                    await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
                });
                it('removes the required ExtRefs from the subscriber IED', async () => {
                    getItemFromSubscriberList('IED1').click();
                    await element.updateComplete;
                    expect(element.doc.querySelectorAll('IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED1"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(0);
                });
            });
            describe('and you subscribe a partially subscribed IED', () => {
                it('initially only 10 ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"],' +
                        'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(10);
                });
                it('it looks like the latest snapshot', async () => {
                    getItemFromSubscriberList('IED4').click();
                    await element.updateComplete;
                    await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
                });
                it('adds the required ExtRefs to the subscriber IED', async () => {
                    getItemFromSubscriberList('IED4').click();
                    await element.updateComplete;
                    expect(element.doc.querySelectorAll('IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"],' +
                        'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(16);
                });
            });
        });
    });
    describe('in Subscriber view', () => {
        beforeEach(async () => {
            (element.shadowRoot?.querySelector('#smvSubscriberView')).click();
            await element.updateComplete;
        });
        describe('initially', () => {
            it('the plugin looks like the latest snapshot', async () => {
                await expect(element).shadowDom.to.equalSnapshot();
            });
            it('the IED list looks like the latest snapshot', async () => {
                await expect(element.shadowRoot?.querySelector('ied-list')).shadowDom.to.equalSnapshot();
            });
            it('the subscriber list looks like the latest snapshot', async () => {
                await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
            });
        });
        describe('when selecting an IED', () => {
            let ied;
            beforeEach(async () => {
                ied = Array.from(element.shadowRoot
                    ?.querySelector('ied-list')
                    ?.shadowRoot?.querySelectorAll('mwc-list-item') ?? []).filter(item => !item.noninteractive)[1];
                ied.click();
                await element.updateComplete;
            });
            it('the subscriber list will initially show the subscribed / partially subscribed / not subscribed IEDs', async () => {
                await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
            });
            describe('and subscribing a unsubscribed Sampled Value message', () => {
                it('initially no ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(0);
                });
                describe('clicking on a SampledValueControl list item', () => {
                    let fCDAs;
                    let smvControlBlock;
                    beforeEach(async () => {
                        smvControlBlock = element.doc.querySelector('IED[name="IED3"] SampledValueControl[name="MSVCB01"]');
                        fCDAs = Array.from(smvControlBlock.parentElement?.querySelectorAll(`DataSet[name="${smvControlBlock.getAttribute('datSet')}"] > FCDA`) ?? []);
                        getItemFromSubscriberList('MSVCB01').click();
                        await element.requestUpdate();
                    });
                    it('it looks like the latest snapshot', async () => await expect(getSubscriberList()).shadowDom.to.equalSnapshot());
                    it('adds the required ExtRefs to the subscriber IED', async () => {
                        expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                            'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(fCDAs.length);
                    });
                    it('makes sure that Ed1 attributes are added properly', async () => {
                        fCDAs.forEach(fcda => expect(element.doc.querySelector(`IED[name="IED2"] ExtRef[iedName="IED3"][ldInst="${fcda.getAttribute('ldInst')}"][prefix="${fcda.getAttribute('prefix')}"][lnClass="${fcda.getAttribute('lnClass')}"][lnInst="${fcda.getAttribute('lnInst')}"][doName="${fcda.getAttribute('doName')}"][daName="${fcda.getAttribute('daName')}"]`)).to.exist);
                    });
                    it('makes sure that Ed2 attributes are added properly', async () => {
                        fCDAs.forEach(fcda => expect(element.doc.querySelector(`IED[name="IED2"] ExtRef[iedName="IED3"][srcLDInst="${fcda
                            .closest('LDevice')
                            ?.getAttribute('inst')}"][srcPrefix="${fcda.closest('LN0')?.getAttribute('prefix') ?? '' //prefix is mendatory in ExtRef!!
                        }"][srcLNClass="${fcda
                            .closest('LN0')
                            ?.getAttribute('lnClass')}"][srcCBName="${smvControlBlock.getAttribute('name')}"][serviceType="SMV"]`)).to.exist);
                    });
                });
            });
            describe('and unsubscribing a subscribed Sampled Value message', () => {
                beforeEach(async () => {
                    getItemFromSubscriberList('MSVCB01').click();
                    await element.updateComplete;
                    await parent.updateComplete;
                });
                it('initially all ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(16);
                });
                it('it looks like the latest snapshot', async () => {
                    getItemFromSubscriberList('MSVCB01').click();
                    await element.updateComplete;
                    await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
                });
                it('removes the required ExtRefs to the subscriber IED', async () => {
                    getItemFromSubscriberList('MSVCB01').click();
                    await element.updateComplete;
                    await parent.updateComplete;
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED3"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED3"]').length).to.eql(0);
                });
            });
            describe('and subscribing a partially subscribed Sampled Value message', () => {
                it('initially some ExtRefs are available in the subscriber IED', async () => {
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]').length).to.eql(2);
                });
                it('it looks like the latest snapshot', async () => {
                    getItemFromSubscriberList('MSVCB02').click();
                    await element.updateComplete;
                    await expect(getSubscriberList()).shadowDom.to.equalSnapshot();
                });
                it('adds the required ExtRefs to the subscriber IED', async () => {
                    getItemFromSubscriberList('MSVCB02').click();
                    await element.updateComplete;
                    expect(element.doc.querySelectorAll('IED[name="IED2"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED4"], ' +
                        'IED[name="IED2"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED4"]').length).to.eql(16);
                });
            });
        });
    });
    function getSubscriberList() {
        return element.shadowRoot?.querySelector('subscriber-list-smv');
    }
    function getItemFromSubscriberList(textInListItem) {
        return (Array.from(getSubscriberList().shadowRoot?.querySelectorAll('mwc-list-item') ?? []).filter(listItem => listItem.innerHTML.includes(textInListItem))[0] ??
            undefined);
    }
});
//# sourceMappingURL=SMVSubscriberMessageBinding.test.js.map