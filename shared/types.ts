// Shared zod schemas and typescript types. Can be accessed by both frontend and backend.

// Success and Error Response types
export type SuccessResponse<T = void> = {
	success: true;
	message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
	success: false;
	error: string;
	isFormError?: boolean;
};
