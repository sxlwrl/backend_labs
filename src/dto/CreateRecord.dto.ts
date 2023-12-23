export interface CreateRecordDto {
    userId: number;
    categoryId: number;
    date: Date;
    costs: number;
    currency?: string;
}