export interface VCW {
    id: number;
    type: string;
    projectId: number;
    name: string;
    challenge: string;
    description: string;
    thumbnailUrl?: string;
}

export interface VCWChallenge {
    challenge: string;
}

export interface SwotFieldRow {
    swotField: string;
    name: string;
    description: string;
    id?: number;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    createdBy: string;
    vcwId: number;
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
    sourceUrl: string,
    entryTypeId: number,
    id?: number,
    isSelected: boolean,
};

export type Criteria = {
    name: string,
    sourceName: string,
    sourceUrl: string,
    entryTypeId: number,
    id?: number,
    isSelected: boolean,
    valueType: string
};

export type IdeaCriteriaPair = {
    idea: Idea;
    criteria: Criteria;
    value: number | string;
    id?: number;
};
