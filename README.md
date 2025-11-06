# 🎮 GameTracker

Uma aplicação web full-stack moderna construída com Next.js (App Router) para descoberta, rastreamento e avaliação de jogos. Este projeto permite que os usuários pesquisem uma vasta biblioteca de jogos da API da RAWG, gerenciem suas coleções pessoais e acompanhem seu progresso.

![Banner do GameTracker](placeholder_para_seu_screenshot.png)
*(Recomendação: Tire um screenshot bem bonito da sua página de detalhes do jogo ou do dashboard e substitua o nome do arquivo acima)*

---

## 🚀 Principais Funcionalidades

Este projeto foi construído do zero e inclui um conjunto completo de funcionalidades de uma aplicação web moderna:

* **Autenticação Completa:** Sistema de registro e login de usuários usando **NextAuth.js**, com proteção de rotas via Middleware do Next.js.
* **Dashboard de Descoberta:** Uma página principal para usuários logados com "prateleiras" (carrosséis) dinâmicas para "Jogos Populares", "Lançamentos Recentes" e "Gemas Escondidas", com lógica de filtragem de qualidade no back-end.
* **Página de Detalhes:** Geração de páginas dinâmicas para cada jogo (`/game/[slug]`), exibindo informações detalhadas, galeria de screenshots (com lightbox), nota do Metacritic, gêneros e plataformas.
* **Sistema de Recomendação:** Lógica de "Jogos da Franquia" e "Jogos Similares" baseada em tags e gêneros, com chamadas de API específicas no back-end.
* **Coleção Pessoal (Página "Meus Jogos"):**
    * **CRUD Completo:** Usuários podem adicionar, remover e atualizar jogos em sua coleção pessoal.
    * **Gerenciamento de Status:** Capacidade de mover jogos entre listas (Backlog, Jogando, Finalizado, Wishlist).
    * **Avaliação Pessoal:** Funcionalidade para o usuário dar uma nota pessoal (0-10) para cada jogo de sua coleção.
* **Busca Inteligente:** Uma página de busca que consome uma API de back-end com filtros para remover DLCs e jogos de baixa relevância, melhorando a qualidade dos resultados.
* **Perfil de Usuário:** Página de perfil que exibe estatísticas do usuário (total de jogos, finalizados, etc.) com base nos dados de sua coleção.

---

## 🛠️ Stack de Tecnologias (Tech Stack)

Este projeto utiliza um stack JavaScript moderno, focado em performance e na melhor experiência de desenvolvedor.

* **Front-End:**
    * **React 18** (com Hooks e Componentes de Cliente/Servidor)
    * **Next.js 14+** (App Router)
    * **Tailwind CSS** (Estilização)
    * **Embla Carousel** (Carrosséis)
    * **react-hot-toast** (Notificações)
    * `lucide-react` & `react-icons` (Ícones)

* **Back-End:**
    * **Next.js (API Routes / Proxy)**
    * **NextAuth.js** (Autenticação e gerenciamento de sessão)

* **Banco de Dados & API:**
    * **Supabase** (Hospedagem PostgreSQL)
    * **Prisma** (ORM para comunicação com o banco de dados)
    * **RAWG API** (Fonte de dados externa para informações de jogos)

---

## 🏁 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

### Pré-requisitos
* [Node.js](https://nodejs.org/en) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* Uma conta no [Supabase](https://supabase.com/) para criar o banco de dados.
* Uma chave de API do [RAWG](https://rawg.io/apikey).

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Joran-Vini/projeto-gametracker.git](https://github.com/Joran-Vini/projeto-gametracker.git)
cd projeto-gametracker
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```env
# URL do seu banco de dados (use a Conexão Direta, porta 5432, para o Prisma)
DATABASE_URL="postgresql://postgres:[SUA_SENHA]@db.[SEU_PROJETO_SUPABASE].supabase.co:5432/postgres"

# Chave da API da RAWG
RAWG_API_KEY="SUA_CHAVE_DA_RAWG"

# Segredo para o NextAuth (gere um em [https://generate-secret.vercel.app/](https://generate-secret.vercel.app/))
NEXTAUTH_SECRET="SEU_SEGREDO_GERADO"

# URL base para o NextAuth
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Sincronizar o Banco de Dados
Execute o comando do Prisma para aplicar o schema no seu banco Supabase. (Lembre-se que talvez você precise usar o comando `set DATABASE_URL=... && npx prisma db push` se o `npm run` falhar).

```bash
npm run db:push
```

### 5. Gerar o Cliente Prisma
Gere o cliente Prisma atualizado com base no seu schema.
```bash
npx prisma generate
```

### 6. Rodar o Servidor de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto funcionando!