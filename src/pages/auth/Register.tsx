import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomSelect from "@/components/common/inputs/custom-select";
import CustomInput from "@/components/common/inputs/custom-input";
import PasswordInput from "@/components/common/inputs/password-input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useAuth";

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, `Password must be at least 8 characters`)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phoneNumber: z.string().optional(),
    role: z.enum(["CUSTOMER", "SELLER", "ADMIN"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function Register() {
    const { register } = useRegister();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            role: "CUSTOMER",
        },
    });

    const onSubmit = (data: RegisterFormValues) => {
        const submitData = {
            ...data,
            role: data.role === "CUSTOMER" ? undefined : data.role,
        };
        register(submitData);
    };

    const roleOptions = [
        { value: "CUSTOMER", label: "Customer" },
        { value: "SELLER", label: "Seller" },
        { value: "ADMIN", label: "Admin" },
    ];

    return (
        <div className="container max-w-md mx-auto py-10">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground">
                        Enter your information to create an account
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <CustomSelect
                            nameInSchema="role"
                            label="Account type"
                            placeholder="Select account type"
                            options={roleOptions}
                            className="my-4"
                        />
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6">
                            <CustomInput
                                nameInSchema="firstName"
                                label="First name"
                                placeholder="Enter your first name"
                            />
                            <CustomInput
                                nameInSchema="lastName"
                                label="Last name"
                                placeholder="Enter your last name"
                            />
                        </div>
                        <CustomInput
                            nameInSchema="email"
                            label="Email address"
                            placeholder="Enter your email"
                        />
                        <CustomInput
                            nameInSchema="phoneNumber"
                            label="Phone number"
                            placeholder="Enter your phone number"
                        />
                        <PasswordInput />
                        <Button
                            type="submit"
                            className="w-full mt-8"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? `Creating account ...`
                                : `Create account`}
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm">
                    Already have an account?
                    <Link to="/login">Sign in here</Link>
                </div>
            </div>
        </div>
    );
}
