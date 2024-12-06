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
        previousPhaseId: '1b',
        nextPhaseId: '2a'
    },
    '2a': {
        id: '2a',
        name: 'Ideas',
        previousPhaseId: '1c',
        nextPhaseId: '2b'
    },
    '2b': {
        id: '2b',
        name: 'Criteria',
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
    },
    '3b': {
        id: '3b',
        name: 'Select Criteria',
        previousPhaseId: '3a',
        nextPhaseId: '3c'
    },
    '3c': {
        id: '3c',
        name: 'Rank/Weight Criteria',
        previousPhaseId: '3b',
        nextPhaseId: '4a'
    },
    '4a': {
        id: '4a',
        name: 'Value Creation Funnel',
        previousPhaseId: '3c',
        nextPhaseId: '4A'
    },
    '4A': {
        id: '4a',
        name: 'MCDA',
        previousPhaseId: '4a',
        nextPhaseId: '4b'
    },
    '4b': {
        id: '4b',
        name: 'Concept & Value Proposition',
        previousPhaseId: '4a',
        nextPhaseId: '4c'
    },
    '4c': {
        id: '4c',
        name: 'Prototype',
        previousPhaseId: '4b',
        nextPhaseId: '5a'
    },
    '5a': {
        id: '5a',
        name: '3 Ms & Business Model',
        previousPhaseId: '4c',
        nextPhaseId: '5b'
    },
    '5b': {
        id: '5b',
        name: 'Test & KPIs Evaluation',
        previousPhaseId: '5a',
        nextPhaseId: '5c'
    },
    '5c': {
        id: '5c',
        name: 'Implementation & Control',
        previousPhaseId: '5b',
        nextPhaseId: 'finalVCWReport'
    },
    'finalVCWReport':{
        id: 'Final',
        name: 'VCW Report',
        previousPhaseId:'5c',
        nextPhaseId: '../'
    }
};

export {vcwPhasesNavigation};
