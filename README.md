# Next13-study
Repository for study the new version of nextjs


# Components
No next os componentes são server side como padrão, caso precisa de um componente client(precisamos geralmente para componentes que tenham ações de usuario), use *"use client"*

Layout.tsx -> é um arquivo "template" onde ele é compartilhado entre outros arquivos.
Ex.: Se adicionar um h1 em um arquivo layout, ele será compartilhado nos demais componentes

# Routes
O next cria rotas automaticamente, desde que voce crie uma pasta com um arquivo page.tsx dentro dela, exemplo:

-dashboard
-- page.tsx

Com isso uma rota /dashboad é criada na sua aplicação.

Existe também a possibilidade de criar rotas aninhadas, exemplo:

-dashboard
-- analytics
--- page.tsx
-- page.tsx

Assim você terá /dashboard, mas também terá /dashboard/analytics

# Layouts e Pages
Layout é um componente exclusivamente servidor e o Layout não tem acesso a stack de navegação.
Layouts e pages são ambos arquivos "reservados" pelo next13 e eles se complementam.
Como falado na parte de Routes: o page.tsx é um arquivo que o next vai entender que existe uma página e criará uma rota.
Já o layout.tsx é um arquivo que se aninha em pages.tsx para criação de um layout padrão naquela rota, para isso precisamos fazer:

-dashboard
-- layout.tsx
-- page.tsx

assim /dashboard terá um layout especifico assim como todas as rotas filhas de dashboard, ou seja, se tivemos a estrutura:

-dashboard
-- analytics
--- page.tsx
-- layout.tsx
-- page.tsx

O /dashboard/analytics herdará o layout que está em dashboard e assim por diante.

O arquivo "layout.tsx" da raiz precisa ter as tags <html><body>

# Links e Navegação

Primeiro de tudo, porque usar o link?
O componente link do next deixa a navegação mais limpa e rápida que a tag "a" por exemplo
Navegar com a tag <Link> dá a sensação para o usuario que ele está em uma SPA(single page application), pois ele n ve a página carregando.
Isso acontece pois esse componente tem um parametro padrão chamado "prefetch" setado como "true", ou seja, toda vez que o link aparece no viewport ele já pré renderiza a página em que ele está fazendo o link.
Mas temos comportamentos diferentes sobre o componente link em desenvolvimento e em produção, são eles:
quando estamos em desenvolvimento(npm run dev) essa pré renderização só acontece quando passamos o mouse por cima do link, mas quando estamos em produção, segue a regra de aparecer no viewport.

Conseguimos usar o componente link dessa forma: <Link href="/dashboard">Dashboard</Link>
Onde ele tem a sintaxe igual a de uma tag <a>

Mas conseguimos usar ele com chaves: <Link href={`/dashboard?name=Dev`}>Dashboard</Link>
Onde conseguimos passar a url com parametros que podem ser dinamicos, nesse caso por exemplo podemos aderir dev a uma variavel e mudar de forma dinamica dependendo da situação

Também conseguimos usar o componente assim: 
<Link href={{
          pathname: "/dashboard",
          query: {name: "dev"}
      }}>Dashboard</Link>

Nessa forma, nós conseguimos trabalhar com as partes da url de forma separada, como o pathname, query e etc. Esse jeito é bom para quando vamos usar hooks.

O componente Link tem outro parametro legal de trabalhar que é o "replace", ele é responsavel por alterar a url no historico do browse, sem adicionar uma nova url quando clica no link.

# Router Groups

Ignorando seguimentos de url por pastas:
Se nomearmos a pasta pai com "()" ela será ignorada na url.
exemplo:
    app
    --marketing
    ----blog
    Terá a url -> /marketing/blog

    app
    --(marketing)
    ----blog
    Terá a url /blog

Quando adicionamos uma pasta ignorada na url, o arquivo "page.tsx" do nivel da pasta é ignorado, passando a valer(se houver) o "page.tsx" da pasta.

Vale lembra que essa lógica se aplica caso tivermos duas pastas ignoradas, por exemplo:
Temos a seguinte estrutura:

    app
    --(marketing)
    ----blog
    --page.tsx

    --(shop)
    ----cart
    --page.tsx
    page.tsx

Nesse contexto teremos 1 erro acontecendo 2 vezes, que é algo como:
"You cannot have two parallel pages that resolve to the same path. Please check[...]"
E para resolução desse ponto, precisaremos ter apenas um "page.tsx" para aquele nivel, sendo algo como:
    app
    --(marketing)
    ----blog
    --page.tsx

    --(shop)
    ----cart
Vale salientar que "--page.tsx" e "page.tsx" tem o mesmo nivel nesse contexto por que estamos ignorando marketing e shop e um dos pincipios mais basicos dos next13.4+ é ter só 1 "page.tsx" por nivel.

Para fins de organização, com o conhecimento que eu tenho hoje sobre next, eu faria da seguinte forma:

    app
    --(marketing)
    ----blog

    --(shop)
    ----cart
    page.tsx
Na minha mente, pastas ignoradas na url devem ficar sem o "page.tsx", deixando somente na pasta pai, com isso temos uma organização de pastas mais "intuítivo"

Por outro lado, essa pasta ignorada pode ter "layout.tsx" trazendo uma funcionalidade mais prática do que só organizar pastas.

# Rotas dinamicas 

Como sabemos, em um projeto com NextJs, para rotas, nós somos orientados por pastas, ou seja:

    blog
    --post
    ----page.tsx
teriamos a url: /blog/post.

- Mas como fariamos se a rota precisasse ser dynamica?
No caso da rota dinamica, nós precisamos colocar o nome da pasta entre colchetes( [] ), com isso o NextJs vai entender que naquele ponto da rota, teremos um valor variavel, ou seja:
    blog
    --[postId]
    ----page.tsx
Nesse caso teriamos como url: /blog/{postId}, com o postId sendo qualquer valor.

- Como fica o tratamento de varias rotas dinamicas?
Para varias rotas que podem ser variaveis, precisamos tratar o nome da pasta com spread, para termos um array de rotas dinamicas, exemplo:
    shop
    --[...slug]
    ----page.tsx
Aqui poderemos ter /shop/path1/path2..... 
se formos pegar os parametros da url, eles virão em um array, ou seja: ['path1', 'path2'....]
Isso nos ajuda com o SEO e ajuda a tratar muitos paths dinamicos.

- E se entrarmos em /shop ?
Como essa pasta não tem um page.tsx, pegariamos um erro 404, porém, se tratarmos a pasta [...slug] diferente, poderemos acessar /shop sem problemas com o page que está dentro de [...slug], basta adicionar um colchete a mais no nome da pasta, ficando[[...slug]], porém vale salientar que quando fazermos isso, aquele array de path(falamos acima) e o parametro 'slug' no parametro 'params' da url vem vazio, vamos checar o retorno de forma visual:

/shop/path1/path2
Teremos {params: {slug: ['path1', 'path2']}}

/shop
Teremos {}

Então temos que tomar cuidado com a lógica que iremos usar.


# Meta dados

Junto com as rotas dinamicas, também precisamos abordar a parte de meta dado, mas por que esse assunto é importante?
Trabalhar com meta dados é importante para o SEO do seu site e ranqueamento em sites de busca, como google, e dependendo da página, teremos esses valores diferentes, exemplo:
Em uma pagina de post de blog, poderemos ter o metadado de description o post da página, já em uma página do produto X, poderemos ter um description com a descrição desse produto, tudo isso no mesmo site.

tá, e como fazemos isso no NextJs?
No NextJs, temos a função generateMetadata() onde ela retorna um objeto que podemos ter "title" ou "description" por exemplo.
Exemplo da função sendo aplicada:

export async function generate metadata(){
    return{
        title: "pagina X",
        description: "descrição da página X"
    }
}


# Parametros estáticos 
Precisamos falar também sobre a função generateStaticParams() que irá funcionar em conjunto das rotas dinamicas.
Basicamente essa função irá "buildar"(não tenho certeza se esse é o termo correto) os parametros de possiveis páginas sobre determinada parte do seu site, exemplo de código:

export async function generateStaticParams({params}: Iparams) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
    const posts = await res.json()
    return posts.map( (post: any) =>({
        postId: String(post.id)
    }))
}

# Componente Loading
O Next traz também um tratamento para o loading, tendo um arquivo com nome pré-definido chamado loading.{js | tsx}.
Esse componente quanto a estruturação é normal, como page.tsx ou layout.tsx
A função do loading é bem clara e simples, trazer uma estrutura de loading enquanto carrega o componente.

Mas por que ele é bom?
Ele é bom por trazer um "esqueleto do componente" ao invés de ficar travado visualmente para o usuario, melhorando a experiencia. 

Observações
O componente loading funciona para o carregamento de um componente e todos os componentes filhos desse mesmo, ou seja:

componente X
-componente Y
--page.tsx
-componente Z
--page.tsx
-loading.tsx
-page.tsx

Nesse caso o loading só irá parar de ser mostrado pro usuario quando o componente X, Y e Z forem carregados, quanto a filhos, funciona parecido com o layoutx.tsx, trazendo a ideia de herança.



# Hooks - clients

## usePathname()
Hook responsavel por pegar o pathname da  página
## useRouter()
Hook que vem com um pacote de funções
- back -> volta a página
- fastRefresh -> carregamento rápido
- forward -> avança a página
- refresh -> reload da página
- replace -> faz o replace do pathname 
- push -> seta nova url de destino, indo para o mesmo