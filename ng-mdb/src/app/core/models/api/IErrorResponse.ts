export interface IErrorResponse {
    status_code: number;
    status_message: string;
    success: boolean;
    errors?: string[];
}
