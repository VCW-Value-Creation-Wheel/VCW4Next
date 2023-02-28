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

export const createCriteriasConfig = {
    name: [null, Validators.required],
    file: [null, Validators.required],
    sourceName: [null],
    sourceUrl: [null],
    id: [null]
};
