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
    ideaId: [null, Validators.required],
    ideaName: [null],
    criteriaId: [null, Validators.required],
    criteriaName: [null],
    value: [null, Validators.required],
    id: [null]
};
