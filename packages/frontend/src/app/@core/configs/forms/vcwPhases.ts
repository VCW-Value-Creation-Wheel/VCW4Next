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


export const createIdeasConfig = {
    name: [null, Validators.required],
    file: [null, Validators.required],
    sourceName: [null],
    sourceUrl: [null],
    id: [null]
};

export const createCriteriaConfig = {
    name: [null, Validators.required],
    file: [null, Validators.required],
    sourceName: [null],
    sourceUrl: [null],
    id: [null]
};

export const createPairConfig = {
    ideaId: [null, Validators.required],
    ideaName: [null],
    criteriaId: [null, Validators.required],
    criteriaName: [null],
    value: [null, Validators. required]
};
