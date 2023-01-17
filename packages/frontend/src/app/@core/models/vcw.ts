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
