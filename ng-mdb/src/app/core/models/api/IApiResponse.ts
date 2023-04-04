export interface ISuccessResponse<T> {
    results: T
    page: number;
    total_pages: number;
    total_results: number;
}

export interface IErrorResponse {
    status_code: number;
    status_message: string;
    success: boolean;
    errors?: string[]
}

export type IApiResponse<T> = ISuccessResponse<T> | IErrorResponse