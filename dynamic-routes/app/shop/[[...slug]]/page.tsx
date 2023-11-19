interface Iparams{
    params: Islug
}
interface Islug{
    slug: string[] | string
}
const Post = ({params}: Iparams) => {
    return (
        <span>
            dado dinamico
        </span>
    )
}
export default Post

export async function generateMetadata({params}: Iparams){
    console.log(params)
    const currentPage = params.slug ? params.slug.at(-1) : 'shop'

    return{
        title: `página ${currentPage}`,
        description: `descrição dá página ${currentPage}`
    }
}