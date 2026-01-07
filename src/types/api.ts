export interface HydrationResponse {
    id: string;
    userId: string;
    totalMl: number;
    date: string;
    createdAt: string;
}

export interface MoodResponse {
    id: string;
    userId: string;
    date: string;
    mood: string;
    tags: string;
    comment?: string;
    updatedAt: string;
}

export interface MoodDTO {
    mood: string;
    tags: string[];
    comment?: string;
}
