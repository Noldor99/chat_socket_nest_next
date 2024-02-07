"use client"

import { useRouter } from "next/navigation"

import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useAuthLogin } from "@/hooks/useAuth"

import { zodResolver } from "@hookform/resolvers/zod"

import { useUserStore } from "@/store"
import { AuthSchema, AuthSchemaType } from "@/actions/authAction"
import FormInput from "@/components/form/FormInput"
import Link from "next/link"

const LoginForm = () => {
  const { user } = useUserStore()
  const { push } = useRouter()
  const { mutate: login, isError } = useAuthLogin()
  const form = useForm<AuthSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (body: AuthSchemaType) => login(body)

  useEffect(() => {
    if (user) {
      push("/home")
    }
  }, [user, push])

  return (
    <Form {...form}>
      <section className="flex flex-1 items-center justify-center p-3">
        <div className="mx-auto w-full max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput name="username" placeholder="Log in" />
            <FormInput name="password" placeholder="Password" type="password" />
            <Button
              className="!mt-6 w-full"
              disabled={!form.formState.isValid}
              type="submit"
            >
              Enter
            </Button>
          </form>
          {isError && (
            <p className="text-s mt-4 w-max text-destructive">
              Wrong email or password!
            </p>
          )}
          <Link
            href="/registration"
            className="text-blue-500 underline mt-4 block"
          >
            Don't have an account? Register here.
          </Link>
        </div>
      </section>
    </Form>
  )
}

export default LoginForm
