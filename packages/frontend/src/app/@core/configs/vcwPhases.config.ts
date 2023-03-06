import { VCWPhase } from '@core';


const vcwPhasesNavigation: VCWPhase = {
    '1a': {
        id: '1a',
        name: 'Diagnostic',
        nextPhaseId: '1b',
        previousPhaseId: '../'
    },
    '1b': {
        id: '1b',
        name: 'Challenge',
        nextPhaseId: '1c',
        previousPhaseId: '1a'
    },
    '1c': {
        id: '1c',
        name: 'Expected KPIs',
        previousPhaseId: '1b'
    },
    '2a': {
        id: '2a',
        name: 'Ideas',
        previousPhaseId: '1c',
        nextPhaseId: '2b'
    },
    '2b': {
        id: '2b',
        name: 'Criterias',
        previousPhaseId: '2a',
        nextPhaseId: '2c'
    },
    '2c': {
        id: '2c',
        name: 'Purification',
        previousPhaseId: '2b',
        nextPhaseId: '3a'
    },
    '3a': {
        id: '3a',
        name: 'Select Ideas',
        previousPhaseId: '2c',
        nextPhaseId: '3b'
    }
};

export {vcwPhasesNavigation};
