"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Checkbox from "@/components/form/Checkbox";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/auth";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
const SignUpForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword1, setshowPassword1] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };
  const togglePassword1 = () => {
    setshowPassword1(!showPassword1);
  };
  const handleSignUp = async (values: typeof initialValues) => {};

  return (
    <div className={cn("grid gap-6")}>
      <div className="text-center">
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Create Your Account
        </h2>
        <p>Start building in minutes.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {({ isValid }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <Input
                label="Email Address"
                name="email"
                placeholder="name@company.com"
              />
              <Input
                label="Username"
                name="username"
                placeholder="Enter Username"
              />
              <Input
                label="Password"
                name="password"
                placeholder="Min. 8 characters"
                type={showPassword1 ? "text" : "password"}
                rightIcon={
                  showPassword1 ? (
                    <EyeOff onClick={togglePassword1} size={18} />
                  ) : (
                    <Eye onClick={togglePassword1} size={18} />
                  )
                }
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Checkbox
                name="agree"
                className="mt-4"
                label={
                  <div>
                    I agree to the{" "}
                    <Link
                      href={"/terms"}
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={"/policy"}
                      className="text-primary hover:underline"
                    >
                      {" "}
                      Privacy Policy
                    </Link>
                    .
                  </div>
                }
              />
              <Button type="submit" className="w-full p-6">
                Create Account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};
export default SignUpForm;
