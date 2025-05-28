import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
    nameInSchema: string;
    label: string;
    placeholder?: string;
    inputType?: string;
}

const CustomInput = ({
    nameInSchema,
    label,
    placeholder,
    inputType,
}: Props) => {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={inputType ?? "text"}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomInput;
