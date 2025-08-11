"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { ArrowRight } from "lucide-react";
import ShowError from "../forms/Error";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import axios, { AxiosError } from "axios";
import { HTTP_URL } from "@/config";
import { CreateUserSchema } from "@/lib/schema";

export const signup = async (userData: { name: string, email: string, password: string }) => {
  try {
    const response = await axios.post(`${HTTP_URL}/user/signup`, userData);
    return response.data.result;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    throw new Error(err.response?.data.error || 'Signup failed');
  }
}

type signupForm = z.infer<typeof CreateUserSchema>;

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<signupForm>({
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit = async (data: signupForm) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password
      }
      const response = await signup(userData);
      useUserStore.getState().setUser({ name: response.user.name, email: response.user.email });
      localStorage.setItem('token', response.token.encoded);
      toast.success('Your account has been created successfully. Start doodling your ideas now!');
      router.push('/draw-mode');
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
      <div className="flex flex-col gap-5 items-start w-80 sm:w-sm">
        <div className="text-3xl sm:text-4xl text-black tracking-normal flex gap-2 justify-center items-center">
          Welcome to APEX <ArrowRight size={24} />
        </div>
        <div className="text-xl text-neutral-700">
          Create your doodle space account and start drawing
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex sm:gap-4 flex-col sm:flex-row gap-5">
            <Input
              {...register('name')}
              label="Name"
              type="text"
              placeholder="John Doe"
              className="w-80 sm:w-36"
            />
            <Input
              {...register('password')}
              label="Password"
              type="password"
              placeholder="John@100x"
              className="w-80 sm:w-56"
            />
          </div>
          <Input
            {...register('email')}
            label="Email"
            type="Email"
            placeholder="John@example.com"
            className="w-80 sm:w-sm"
          />
          {errors.name ? <ShowError text={errors.name?.message} /> : errors.password ? <ShowError text={errors.password?.message} /> : <ShowError text={errors.email?.message} />}
          <Button disabled={isSubmitting} className={`${isSubmitting ? 'bg-accent-light/50' : 'bg-accent-dark'}`}>
            {isSubmitting ? "Signing up...." : "Signup"}
          </Button>
        </form>
      </div>
      <div className="text-xl mt-3 text-neutral-700">Already have an account, <Link href={'/signin'} className="text-black hover:underline underline-offset-4">Sign in</Link></div>
    </div>
  );
}
