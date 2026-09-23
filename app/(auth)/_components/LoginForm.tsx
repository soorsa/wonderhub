"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Input from "@/components/form/Input";
// import { Button } from "@/components/ui/button";
import Button from "@/components/General/Button";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/validations/auth";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setshowPassword] = useState(false);
  const router = useRouter();
  const togglePassword = () => {
    setshowPassword(!showPassword);
  };
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values: typeof initialValues) => {
    if (
      values.username === "richtec" &&
      values.password === "Alaba.Market123"
    ) {
      toast.success("Logged in successfully");
      Cookies.set("user", "Richtec Africa");
      router.push("/dashboard");
    } else {
      toast.error("Invalid Username & Password");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="text-center">
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Log In to Your Account
        </h2>
        <p>Enter your details to continue where you left off.</p>
      </div>

      <div className="text-muted w-full">
        <div className="h-px bg-gray-300 w-full" />
      </div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={signInSchema}
        onSubmit={handleLogin}
      >
        {({ isValid }) => (
          <Form className="space-y-4">
            <div className="space-y-6">
              <Input
                label="username"
                name="username"
                placeholder="Enter username"
              />
              <div className="">
                <div className="flex justify-end -mb-5">
                  <Link
                    href={"/auth/forgot-password"}
                    className="capitalize text-xs text-primary"
                  >
                    {" "}
                    forgot password?
                  </Link>
                </div>
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? (
                      <EyeOff onClick={togglePassword} size={18} />
                    ) : (
                      <Eye onClick={togglePassword} size={18} />
                    )
                  }
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                label="Login"
                type="submit"
                disabled={!isValid}
                className="bg-primary! text-white! p-3! font-semibold tracking-[1rem]"
              />
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-semibold">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
