/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useField, ErrorMessage } from "formik";
import { useEffect } from "react";

export const Input = (props) => {
	const [field, meta] = useField(props);
	useEffect(() => {
		props?.changeHandler?.(field.name, meta.value);
	}, [field.name, meta.value]);
	return (
		<>
			<input
				className={`${meta.error && "border-red-400"} p-2 bg-[#EEF0F6] mt-3 w-full border outline-none rounded-lg`}
				{...field}
				{...props}
			/>
			<ErrorMessage
				name={field.name}
				component="div"
				className="text-red-600"
			/>
		</>
	);
};
