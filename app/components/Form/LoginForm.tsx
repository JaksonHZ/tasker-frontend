'use client'

import { useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './index'

const createUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "*Campo Obrigatório" })
    .email("Digite um e-mail válido"),
  password: z
    .string()
    .min(6, { message: "Campo deve haver 6 números"})
})

type CreateUserData = z.infer<typeof createUserSchema>

export function LoginForm() {

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const { 
    handleSubmit, 
    formState: { isSubmitting }, 
    watch,
  } = createUserForm;

  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userPassword)

  return (
    <main className="h-screen w-full flex flex-row gap-6 items-center justify-center">
      <FormProvider {...createUserForm}>
        <form 
          onSubmit={handleSubmit((data) => {console.log(data)})}
          className="flex flex-col gap-4 w-full max-w-xs"
        >

          <Form.Field>
            <Form.Label htmlFor="email">
              E-mail
            </Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">
              Senha

              {isPasswordStrong 
                ? <span className="text-xs text-emerald-600">Senha forte</span>
                : <span className="text-xs text-red-500">Senha fraca</span>}
            </Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          <div className='w-full flex flex-col gap-2'>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#FF7550] text-white rounded px-3 h-10 font-semibold text-sm hover:bg-[#FFA992]"
            >
              LOGIN
            </button>

            <span className='text-center text-gray-500'>ou</span>

            <button 
              type='button'
              disabled={isSubmitting}
              className="bg-white text-white rounded px-3 h-10 font-semibold text-sm text-orange-primary border-[#FF7550] border-2 hover:bg-orangev hover:text-white"
            >
              Registrar
            </button>
          </div>
        </form>
      </FormProvider>

    </main>
  )
}
