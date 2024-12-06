export interface PropositionUserData {
    [user: string]: PropositionValuesData;
};

export interface PropositionValuesData {
    [label: string]: number;
}