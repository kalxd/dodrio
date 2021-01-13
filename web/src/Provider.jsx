import React from "react";
import { FormProvider } from "rc-field-form";

import SiteInfoProvider from "./lib/UI/SiteInfo";

const vMessage = {
	required: "此处必填"
};

export default function Provider({ children }) {
	return (
		<FormProvider validateMessages={vMessage}>
			<SiteInfoProvider>
				{children}
			</SiteInfoProvider>
		</FormProvider>
	);
}
