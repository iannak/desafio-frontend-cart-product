'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace('/products')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="bg-white p-8 rounded-md shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h1>
        <Input
          className="h-12 rounded-md p-2 text-black bg-transparent border border-gray-300 w-full"
          type="text"
          name="name"
          placeholder="Digite seu name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          className="h-12 rounded-md p-2 bg-transparent text-black border border-gray-300 mt-4 w-full"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-4"
        >
          Entrar
        </Button>

        <p className="text-sm text-gray-600 mt-3">
          Ainda não tem uma conta?{" "}
          <a className="text-blue-500 hover:underline" href="#">
            Registre-se
          </a>
        </p>
      </form>
    </div>
  )
}
