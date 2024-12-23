import {Validators} from '@angular/forms';

export const swotFieldRowConfig = {
    name: [null, Validators.required],
    description: [null],
    swotField: [null, Validators.required],
    id: [null]
};

export const challengeConfig = {
    challenge: [null, Validators.required]
};

export const expectedKPIsConfig = {
    kpis: [null, Validators.required]
};



export const createIdeasConfig = {
    name: [null, Validators.required],
    file: [null, Validators.required],
    entryTypeId: [null],
    source: [null],
    id: [null]
};

export const createCriteriasConfig = {
    name: [null, Validators.required],
    file: [null, Validators.required],
    source: [null],
    id: [null],
    entryTypeId: [null],
    valueType: ['number', Validators.required]
};

export const sourceConfig = {
    name: [null],
    url: [null]
};

export const createPairConfig = {
    ideaId: [0, Validators.required],
    ideaName: [null],
    criteriaId: [0, Validators.required],
    criteriaName: [null],
    value: [null, Validators.required],
    id: [null]
};

export const createRankCriteriaConfig = {
    type: [null, Validators.required],
    ranking: [null],
    weight: [null],
    intervalMin: [null],
    intervalMax: [null],
    id: [null]
};

export const conceptConfig = {
    concept: [null, Validators.required]
};

export const valuePropositionConfig = {
    valueProposition: [null, Validators.required]
};

export const prototypeConfig = {
    prototype: [null, Validators.required]
};

export const threeMsConfig = {
    threeMs: [null, Validators.required]
};

export const BusinessModelConfig = {
    customerSegments: [null],
    valuePropositions: [null],
    channels: [null],
    customerRelationships: [null],
    revenueStreams: [null],
    keyResources: [null],
    keyActivities: [null],
    keyPartnerships: [null],
    costStructure: [null]
};

export const testAndKpisEvaluationConfig = {
    testAndKpisEvaluation: [null, Validators.required]
};

export const implementationAndControlConfig = {
    executiveSummary: [null, Validators.required]
};

