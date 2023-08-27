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