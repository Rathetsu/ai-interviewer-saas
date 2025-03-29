import { Input } from "@/components/ui/input";

import {
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "./ui/form";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	description?: string;
	type?: "text" | "email" | "password" | "number" | "file";
}

const FormField = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	description,
	type = "text",
}: FormFieldProps<T>) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<FormItem>
				<FormLabel className="label">{label}</FormLabel>
				<FormControl>
					<Input {...field} placeholder={placeholder} type={type} />
				</FormControl>
				{description && <FormDescription>{description}</FormDescription>}
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default FormField;
