import { Validators } from '@angular/forms';

export const projectConfig = {
    name: [null, Validators.required],
    description: [null, Validators.required],
    lang: [null, Validators.required]
};
