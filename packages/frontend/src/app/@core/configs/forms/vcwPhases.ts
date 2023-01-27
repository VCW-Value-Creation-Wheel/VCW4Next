import {Validators} from '@angular/forms';

export const swotAnalysisConfig = {
    swotFields: [null]
};

export const swotFieldsConfig = {
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required]
};

export const challengeConfig = {
    challenge: [null, Validators.required]
}
