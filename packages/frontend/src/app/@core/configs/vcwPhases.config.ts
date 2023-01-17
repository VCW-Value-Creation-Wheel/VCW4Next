import { VCWPhase } from '@core';


const vcwPhasesNavigation: VCWPhase = {
    '1a': {
        id: '1a',
        name: 'Diagnostic',
        nextPhaseId: '1b'
    },
    '1b': {
        id: '1b',
        name: 'Challenge',
        nextPhaseId: '1c'
    },
    '1c': {
        id: '1c',
        name: 'Expected KPIs'
    }
};

export {vcwPhasesNavigation};
