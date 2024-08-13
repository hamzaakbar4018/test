/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useField, ErrorMessage } from "formik";
import { useEffect } from "react";

export const Select = (props) => {
	const [field, meta] = useField(props);

	useEffect(() => {
		props.changeHandler?.(field.name, meta.value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meta.value]);

	return (
		<>
			<select
				className={`${meta.error ? "border-red-400" : "border-gray-300"} my-2 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
				{...field}
				{...props}
			>
				<option value="">Search {props.label}</option>
				{props.data.map((e, i) => (
					<option key={i} value={e[props.searchKey]}>
						{e[props.searchValue]}
					</option>
				))}
			</select>
			<ErrorMessage
				name={field.name}
				component="div"
				className="text-red-600"
			/>
		</>
	);
};

