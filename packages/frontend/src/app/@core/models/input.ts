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