interface Iparams{
    params: string
}
const Post = ({params}: Iparams) => {
    console.log({params})
    return (
        <span>
            eu post 1
        </span>
    )
}
export default Post

export async function generateMetadata({params}: Iparams){
    const currentPage = params

    return{
        title: `página ${currentPage}`,
        description: `descrição dá página ${currentPage}`
    }
}

export async function generateStaticParams({params}: Iparams) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
    const posts = await res.json()
    return posts.map( (post: any) =>({
        postId: String(post.id)
    }))
}