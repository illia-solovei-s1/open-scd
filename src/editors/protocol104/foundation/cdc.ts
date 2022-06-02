import { Create } from "../../../foundation.js";

import {addPrefixAndNamespaceToDocument, createPrivateAddress, createPrivateElement} from "./private.js";

/**
 * List of supported Common Data Classes in the 104 protocol.
 */
export const supportedCdcTypes =
  [ 'ACT', 'APC', 'ASG', 'BAC', 'BCR', 'BSC', 'CMV',
    'DPC', 'DPS', 'INC', 'ING', 'INS', 'ISC', 'MV',
    'SEC', 'SPC', 'SPG', 'SPS'] as const;
export type SupportedCdcType = typeof supportedCdcTypes[number];

export type CreateFunction = (daiElement: Element, selectedTi: string, inverted: boolean) => Create[];
export interface TiInformation {
  filter: string;
  create: CreateFunction;
  inverted?: boolean;
}

/**
 * Record with configuration information on how to create Address elements for the 104 protocol.
 * Per supported Common Data Class (CDC) two record sets can be configured, one for the monitoring part
 * and one for the control part.
 * Per set the key of the record will be the ti value, meaning the list of keys will be the supported
 * ti values allowed for the CDC.
 * For each supported ti value there is information on how to find the DAI Element to which to create
 * the Address element(s).
 */
export const cdcProcessings: Record<
  SupportedCdcType,
  {
    monitor: Record<string, TiInformation>,
    control: Record<string, TiInformation>,
  }
  > = {
  ACT: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="general"], ' +
          ':scope > DAI[name="phsA"], ' +
          ':scope > DAI[name="phsB"], ' +
          ':scope > DAI[name="phsC"], ' +
          ':scope > DAI[name="neut"]',
        create: createSimpleAddressAction,
        inverted: true
      },
      '39': {
        filter: ':scope > DAI[name="general"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  APC: {
    monitor: {
      '36': {
        filter: ':scope > SDI[name="mxVal"] > DAI[name="f"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '63': {
        filter: ':scope > SDI[name="Oper"] > SDI[name="ctlVal"] > DAI[name="f"]',
        create: createSimpleAddressAction
      },
    }
  },
  ASG: {
    monitor: {
      '63': {
        filter: ':scope > SDI[name="setMag"] > DAI[name="f"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  BAC: {
    monitor: {
      '36': {
        filter: ':scope > SDI[name="mxVal"] > DAI[name="f"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '60': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSimpleAddressAction
      },
    }
  },
  BCR: {
    monitor: {
      '37': {
        filter: ':scope > DAI[name="actVal"], ' +
          ':scope > DAI[name="frVal"]',
        create: createSimpleAddressAction
      },
    },
    control: {}
  },
  BSC: {
    monitor: {
      '32': {
        filter: ':scope > SDI[name="valWTr"] > DAI[name="posVal"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '60': {
        filter: ':scope > SDI[name="Oper"] > DAI[name=“ctlVal”]',
        create: createSimpleAddressAction
      },
    }
  },
  CMV: {
    monitor: {
      '35': {
        filter: ':scope > SDI[name="mag"] > DAI[name="i"], ' +
          ':scope > SDI[name="ang"] > DAI[name="i"]',
        create: createSimpleAddressAction
      },
      '36': {
        filter: ':scope > SDI[name="mag"] > DAI[name="f"], ' +
          ':scope > SDI[name="ang"] > DAI[name="f"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  DPC: {
    monitor: {
      '31': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '59': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSimpleAddressAction
      },
    }
  },
  DPS: {
    monitor: {
      '31': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  INC: {
    monitor: {
      '35': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '62': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSimpleAddressAction
      },
    }
  },
  ING: {
    monitor: {
      '62': {
        filter: ':scope > DAI[name="setVal"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  INS: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction,
        inverted: true
      },
      '33': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction
      },
      '35': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  ISC: {
    monitor: {
      '32': {
        filter: ':scope > SDI[name="valWTr"] > DAI[name="posVal"]',
        create: createSimpleAddressAction
      },
    },
    control: {
      '62': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSimpleAddressAction
      },
    }
  },
  MV: {
    monitor: {
      '35': {
        filter: ':scope > SDI[name="mag"] > DAI[name="i"]',
        create: createSimpleAddressAction
      },
      '36': {
        filter: ':scope > SDI[name="mag"] > DAI[name="f"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  SEC: {
    monitor: {
      '37': {
        filter: ':scope > DAI[name="cnt"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  SPC: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction,
        inverted: true
      },
    },
    control: {
      '58': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSimpleAddressAction
      },
    }
  },
  SPG: {
    monitor: {
      '58': {
        filter: ':scope > DAI[name="setVal"]',
        create: createSimpleAddressAction
      }
    },
    control: {}
  },
  SPS: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSimpleAddressAction,
        inverted: true
      }
    },
    control: {}
  },
};

/**
 * Create a new SCL Private element and add 104 Address element(s) below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param daiElement - The DAI Element to use to set namespace on the root element and create new elements.
 * @param ti         - The value to be set on the attribute 'ti'.
 * @param inverted   - Indicates if extra Address Elements should be created with 'inverted=true'.
 */
function createSimpleAddressAction(daiElement: Element, ti: string, inverted: boolean): Create[] {
  addPrefixAndNamespaceToDocument(daiElement);

  const privateElement = createPrivateElement(daiElement);
  createPrivateAddress(daiElement, privateElement, ti);
  if (inverted) {
    const invertedAddressElement = createPrivateAddress(daiElement, privateElement, ti);
    invertedAddressElement.setAttribute('inverted', 'true');
  }
  return [{new: {parent: daiElement, element: privateElement}}];
}
