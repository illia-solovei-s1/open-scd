import { expect } from '@open-wc/testing';

import { getDataChildren } from "../../../../../src/editors/protocol104/wizards/selectDoi.js";

describe('data model nodes child getter', () => {
  let doc: XMLDocument;

  describe('getDataChildren', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/104/valid-empty-addresses.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('returns empty array for invalid tag', () => {
      const parent = doc.querySelector('Substation')!;
      expect(getDataChildren(parent)).to.be.empty;
    });

    it('returns direct children for a SCL', () => {
      const parent = doc.querySelector('SCL')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(1);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('IED');
      expect(getDataChildren(parent)[0]).to.have.attribute('name', 'B1');
    });

    it('returns direct children for a IED', () => {
      const parent = doc.querySelector('IED[name="B1"]')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(1);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('LDevice');
      expect(getDataChildren(parent)[0]).to.have.attribute('inst', 'LD0');
    });

    it('returns direct children for a LDevice', () => {
      const parent = doc.querySelector('IED[name="B1"] LDevice[inst="LD0"]')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(6);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('LN0');
      expect(getDataChildren(parent)[0]).to.have.attribute('lnClass', 'LLN0');
      expect(getDataChildren(parent)[1].tagName).to.be.equal('LN');
      expect(getDataChildren(parent)[1]).to.have.attribute('lnClass', 'GAPC');
    });

    it('returns referenced children for LN', () => {
      const parent = doc.querySelector('IED[name="B1"] LDevice[inst="LD0"] > LN0[lnClass="LLN0"]')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.equal(1);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('DOI');
      expect(getDataChildren(parent)[0]).to.have.attribute('name', 'MltLev');
    });
  });
});
