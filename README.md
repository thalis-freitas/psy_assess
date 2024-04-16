# PsyAccess

## Sumário
  * [Descrição do projeto](#descrição-do-projeto)
  * [Demonstração](#demonstração)
  * [Funcionalidades](#funcionalidades)
  * [Dependências](#dependências)
  * [Passo a passo para rodar o projeto localmente](#passo-a-passo-para-rodar-o-projeto-localmente)

## Descrição do projeto

<p align="justify"> PsyAssess é um sistema que tem como objetivo permitir que psicólogos administrem avaliações psicológicas online, substituindo os tradicionais questionários em papel. Com interfaces separadas para profissionais e pacientes, o sistema simplifica o processo de cadastramento de avaliados, aplicação de instrumentos e análise de resultados. Ele oferece uma solução segura e eficiente para coletar e armazenar dados de avaliações, proporcionando aos psicólogos acesso imediato aos resultados dos testes, mantendo a confidencialidade e a integridade dos dados do avaliado. </p>

## Demonstração

<div align="center" style="margin: 20px;">
  <img src="https://github.com/thalis-freitas/psy_assess/blob/b862f116d715bea90c558718aafdd1ec7e08c93d/src/assets/demo/demo.gif" width="85%">
</div>

## Funcionalidades

### Psicólogos

#### Login
- [x] Autenticar psicólogos no sistema

#### Gestão de Avaliados
- [x] Cadastrar um novo avaliado
- [x] Listar todos os avaliados
- [x] Exibir dados de um avaliado específico
- [x] Atualizar dados de um avaliado
- [x] Acessar os instrumentos de um avaliado

#### Visualização dos Instrumentos disponíveis
- [x] Listar todos os instrumentos
- [x] Visualizar dados de um instrumento específico

#### Aplicação de Instrumentos
- [x] Aplicar um instrumento a um avaliado
- [x] Enviar por e-mail o link do instrumento ao avaliado

#### Visualização dos Resultados
- [x] Visualizar os resultados de um instrumento finalizado

### Avaliados

#### Confirmação de Dados
- [x] Redirecionamento a partir do link no e-mail, com um token único para a sessão de avaliação
- [x] Confirmação dos dados do avaliado

#### Execução do Instrumento
- [x] Iniciar a execução do instrumento
- [x] Enviar respostas do instrumento

## Dependências

- **[Node.js](https://nodejs.org/)**: Versão 20.11. A aplicação foi desenvolvida e testada utilizando essa versão. Outras versões podem apresentar incompatibilidades.

## Passo a passo para rodar o projeto localmente

1. Clone o projeto:

```
 git clone git@github.com:thalis-freitas/psy_assess.git
```

2. Entre na pasta do projeto:

```
 cd psy_assess
```

3. Instale as dependências:

```
 npm install
```

5. Suba o servidor:

```
 npm run dev
```

6. Acesse http://localhost:5173/
