"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from 'axios';
import { ArrowRight } from "lucide-react";
import ShowError from "../forms/Error";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HTTP_URL } from "@/config";
import { useUserStore } from "@/store/store";
import Input from "../forms/Input";
import Button from "../forms/Button";

export const signInSchema = z.object({
    email: z.string().email({ message: 'Provide correct email format' }),
    password: z.string().min(5, { message: 'Password must be atleast 5 characters' }).max(20, { message: 'Password must be between 5 and 20 characters' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, { message: "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character" })
})

export const signin = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${HTTP_URL}/user/signin`, userData);
        return response.data.result;
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        throw new Error(err.response?.data.error || 'Signin failed');
    }
}

type signinForm = z.infer<typeof signInSchema>;

export default function Signin() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<signinForm>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: signinForm) => {
        try {
            const userData = {
                email: data.email,
                password: data.password,
            };
            const response = await signin(userData);
            useUserStore.getState().setUser({ name: response.user.name, email: response.user.email });
            localStorage.setItem("token", response.token.encoded);
            toast.success("Signed in successfully! Let’s get creative with your doodles.");
            router.push('/dashboard');
        } catch (error: unknown) {
            let errorMessage = "Oops! Something went wrong during signin. Please check your details and try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            reset();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen py-24 px-3 sm:px-10">
            <div className="flex flex-col gap-5 items-start sm:w-sm w-80">
                <div className="text-3xl sm:text-4xl text-black tracking-normal flex gap-2 justify-center items-center text-wrap">
                    Welcome to APEX <ArrowRight size={24} />
                </div>
                <div className="text-xl text-neutral-700">
                    Sign in and continue creating incredible doodles and designs
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Input
                        {...register("email")}
                        label="Email"
                        type="Email"
                        placeholder="John@example.com"
                        className="w-80 sm:w-sm"
                    />

                    <Input
                        {...register("password")}
                        label="Password"
                        type="password"
                        placeholder="John@100x"
                        className="w-80 sm:w-sm"
                    />
                    {errors.email ? (
                        <ShowError text={errors.email?.message} />
                    ) : (
                        <ShowError text={errors.password?.message} />
                    )}
                    <Button
                        disabled={isSubmitting}
                        className={`${isSubmitting ? "bg-accent-dark/70" : "bg-accent-dark"}`}
                    >
                        {isSubmitting ? "Signing in...." : "Signin"}
                    </Button>
                </form>
            </div>
            <div className="text-xl mt-3 text-neutral-700">Dont have an account, <Link href={'/signup'} className="text-black hover:underline underline-offset-4">Sign up</Link></div>
        </div>
    );
}
