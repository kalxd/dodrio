import React from "react";
import { FormProvider } from "rc-field-form";

const vMessage = {
	required: "此处必填"
};

export default function Provider({ children }) {
	return (
		<FormProvider validateMessages={vMessage}>
			{children}
		</FormProvider>
	);
}
