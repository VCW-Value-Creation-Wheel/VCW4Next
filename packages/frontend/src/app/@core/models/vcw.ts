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

export interface ExpectedKPIs {
    kpis: string;
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
    source: any,
    entryTypeId: number,
    id?: number,
    isSelected: boolean,
};

export type Criteria = {
    name: string,
    source: any,
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

export interface VCWHasIdea {
    vcwId: number;
    selected: boolean;
    id: number;
}

export interface VCWHasCriteria {
    vcwId: number;
    selected: boolean;
    id: number;
}

export interface CriteriaRanking {
    type: string;
    ranking: number;
    weight: number;
    intervalMin: number;
    intervalMax: number;
    id: number;
}

export interface VCWPrototype {
    prototype: string;
}

export interface VCWTestAndKpisEvaluation{
    testAndKpisEvaluation: string;
}

export interface VCWImplementationAndControl{
    executiveSummary: string;
}

export interface VCWAttachment{
    id: number;
    vcwId: number;
    name: string;
    data: number;
    fileType: string;
    createdAt: string;
    createdBy: string;
    updateAt: string;
    updateBy: string;
}