export interface EventOption {
    value: number | string | null | boolean;
    id: string | number;
}

export interface Option {
    label: number | string;
    value: any;
    id?: number;
    checked?: boolean;
}

export interface InputEvent {
    target: HTMLInputElement;
}

export interface InputMap {
    [key: string]: any;
}

export interface CheckboxItemInput {
    label: string;
    value: string | number;
}

export interface MinMaxMap {
    [key: string]: {
        min: number;
        max: number;
    }
}
