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