export interface VCW {
    id: number;
    projectId: number;
    title: string;
    challenge: string;
    description: string;
    thumbnailUrl?: string;
}

export interface SwotField {
    categoryId: number;
    title: string;
    description: string;
    id?: number;
}

export interface VCWPhase {
    [key: string]: {
        id: string;
        name: string;
        previousPhaseId?: string;
        nextPhaseId?: string;
    };
}

export type Idea = {
    name: string,
    sourceName: string,
    sourceURL: string,
    entryType: string
};
