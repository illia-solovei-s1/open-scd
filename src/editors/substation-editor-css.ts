import { css } from 'lit-element';

export const styles = css`
  :host {
    height: calc(100vh - 140px);
    width: calc(100vw - 2 * 5px);
    overflow: auto;
    position: absolute;
    bottom: 0px;
    left: 0px;
    margin: 5px;
    background: var(--light-4);

    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
    --dark-4: #3b434f;
    --dark-3: #4f5a69;
    --dark-2: #637183;
    --dark-1: #7b889b;
    --light-1: #95a0af;
    --light-2: #afb7c3;
    --light-3: #cacfd7;
    --light-4: #e4e7eb;
  }

  @media screen and (max-width: 600px) {
    :host {
      height: calc(100vh - 104px);
    }
  }

  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
    --dark-4: #3b434f;
    --dark-3: #4f5a69;
    --dark-2: #637183;
    --dark-1: #7b889b;
    --light-1: #95a0af;
    --light-2: #afb7c3;
    --light-3: #cacfd7;
    --light-4: #e4e7eb;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    background: var(--dark-1);
    color: var(--light-4);
    margin: 0px;
    padding-left: 0.5em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }

  h1 > mwc-icon-button {
    float: right;
    position: relative;
    top: -5px;
  }

  mwc-dialog {
    display: flex;
    flex-direction: column;
  }

  mwc-dialog > * {
    display: block;
    margin-top: 24px;
  }

  pre {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }

  mwc-fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
  }
`;
