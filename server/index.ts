import type { ErrorResponse } from "@/shared/types";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (context) => {
	return context.text("Hello Hono!");
});

app.onError((error, context) => {
	if (error instanceof HTTPException) {
		const errorResponse =
			error.res ??
			context.json<ErrorResponse>(
				{
					success: false,
					error: error.message,
					isFormError:
						error.cause &&
						typeof error.cause === "object" &&
						"form" in error.cause
							? error.cause.form === true
							: false
				},
				error.status
			);

		return errorResponse;
	}

	return context.json<ErrorResponse>(
		{
			success: false,
			error:
				process.env.NODE_ENV === "production"
					? "Internal Server Error"
					: error.stack ?? error.message
		},
		500
	);
});

export default app;
