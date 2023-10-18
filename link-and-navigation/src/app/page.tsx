import Link from 'next/link'

export default function Home() {
  const name = "Lucas"
  return (
    <>
      <h2>Página inicial</h2>
      <Link href={{
          pathname: "/dashboard",
          query: {name: "dev"}
      }}>Dashboard</Link>
    </>
  )
}
