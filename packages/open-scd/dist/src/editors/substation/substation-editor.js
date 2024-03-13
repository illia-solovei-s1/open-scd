var SubstationEditor_1;
import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { translate } from 'lit-translate';
import '@material/mwc-icon-button';
import '../../action-pane.js';
import './ied-editor.js';
import './powertransformer-editor.js';
import './voltage-level-editor.js';
import './general-equipment-editor.js';
import { getChildElementsByTagName, newActionEvent, newWizardEvent, tags, } from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import { cloneSubstationElement, renderGeneralEquipment, redirectDialog, selectors, startMove, styles, } from './foundation.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
/** [[`Substation`]] plugin subeditor for editing `Substation` sections. */
let SubstationEditor = SubstationEditor_1 = class SubstationEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.readonly = false;
        /** Whether `Function` and `SubFunction` are rendered */
        this.showfunctions = false;
        this.getAttachedIeds = () => {
            return [];
        };
        this.cloneUI = false;
    }
    get header() {
        const name = this.element.getAttribute('name') ?? '';
        const desc = this.element.getAttribute('desc');
        return `${name} ${desc ? `- ${desc}` : ''}`;
    }
    /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
    openEditWizard() {
        const wizard = wizards['Substation'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
    openLNodeWizard() {
        const wizard = wizards['LNode'].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    /** Deletes [[`element`]]. */
    remove() {
        this.dispatchEvent(newActionEvent({
            old: {
                parent: this.element.parentElement,
                element: this.element,
                reference: this.element.nextSibling,
            },
        }));
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    updated() {
        this.addMenu.anchor = this.addButton;
    }
    renderRedirectUI() {
        if (!this.cloneUI)
            return html ``;
        return redirectDialog(this.element);
    }
    renderLNodes() {
        if (!this.showfunctions)
            return html ``;
        const lNodes = getChildElementsByTagName(this.element, 'LNode');
        return lNodes.length
            ? html `<div class="container lnode">
          ${lNodes.map(lNode => html `<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>`
            : html ``;
    }
    renderFunctions() {
        if (!this.showfunctions)
            return html ``;
        const functions = getChildElementsByTagName(this.element, 'Function');
        return html ` ${functions.map(fUnction => html `<function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${fUnction}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`)}`;
    }
    renderIedContainer() {
        const ieds = this.getAttachedIeds?.(this.element) ?? [];
        return ieds?.length
            ? html `<div id="iedcontainer">
          ${ieds.map(ied => html `<ied-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ied}
              ></ied-editor>`)}
        </div>`
            : html ``;
    }
    renderPowerTransformerContainer() {
        const pwts = Array.from(this.element?.querySelectorAll(selectors.Substation + ' > PowerTransformer') ?? []);
        return pwts?.length
            ? html `<div
          class="${classMap({
                ptrContent: true,
                actionicon: !this.showfunctions,
            })}"
        >
          ${pwts.map(pwt => html `<powertransformer-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`)}
        </div>`
            : html ``;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    render() {
        return html `${this.renderRedirectUI()}<action-pane label="${this.header}">
        <abbr slot="action" title="${translate('lnode.tooltip')}">
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('duplicate')}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneSubstationElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('move')}">
          <mwc-icon-button
            icon="forward"
            @click=${() => startMove(this, SubstationEditor_1, [SubstationEditor_1])}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button
        ></abbr>
        <abbr
          slot="action"
          style="position:relative;"
          title="${translate('add')}"
        >
          <mwc-icon-button
            icon="playlist_add"
            @click=${() => (this.addMenu.open = true)}
          ></mwc-icon-button
          ><mwc-menu
            corner="BOTTOM_RIGHT"
            menuCorner="END"
            @action=${(e) => {
            const tagName = e.target.selected.value;
            this.openCreateWizard(tagName);
        }}
            >${this.renderAddButtons()}</mwc-menu
          >
        </abbr>
        ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
        ${this.renderIedContainer()}${this.renderLNodes()}${this.renderFunctions()}
        ${this.renderPowerTransformerContainer()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(voltageLevel => html `<voltage-level-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${voltageLevel}
              .getAttachedIeds=${this.getAttachedIeds}
              ?readonly=${this.readonly}
              ?showfunctions=${this.showfunctions}
            ></voltage-level-editor>`)}</action-pane
      >`;
    }
};
SubstationEditor.styles = css `
    ${styles}
  `;
__decorate([
    property({ attribute: false })
], SubstationEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SubstationEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], SubstationEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], SubstationEditor.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], SubstationEditor.prototype, "showfunctions", void 0);
__decorate([
    property({ type: String })
], SubstationEditor.prototype, "header", null);
__decorate([
    property({ attribute: false })
], SubstationEditor.prototype, "getAttachedIeds", void 0);
__decorate([
    state()
], SubstationEditor.prototype, "cloneUI", void 0);
__decorate([
    query('mwc-dialog')
], SubstationEditor.prototype, "dialog", void 0);
__decorate([
    query('mwc-menu')
], SubstationEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], SubstationEditor.prototype, "addButton", void 0);
SubstationEditor = SubstationEditor_1 = __decorate([
    customElement('substation-editor')
], SubstationEditor);
export { SubstationEditor };
//# sourceMappingURL=substation-editor.js.map