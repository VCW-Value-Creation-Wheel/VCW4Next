export interface Project {
    id: number;
    name: string;
    description: string;
    thumbnailURL?: string;
    lang: string;
}

export interface Thumbnail {
    id: number;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    createdBy: string;
    name: string;
    path: string;
    fileType: string;
}
