import Image from 'next/image'

export default async function Home() {
  
  await new Promise( (resolve: any) => setTimeout(resolve, 4000))
  return (
    <>Carregado!</>
  )
}
