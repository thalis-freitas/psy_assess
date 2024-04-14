# PsyAccess

## Sumário
  * [Descrição do projeto](#descrição-do-projeto)
  * [Funcionalidades](#funcionalidades)
  * [Passo a passo para rodar o projeto localmente](#passo-a-passo-para-rodar-o-projeto-localmente)

## Descrição do projeto

<p align="justify"> PsyAssess é um sistema que tem como objetivo permitir que psicólogos administrem avaliações psicológicas online, substituindo os tradicionais questionários em papel. Com interfaces separadas para profissionais e pacientes, o sistema simplifica o processo de cadastramento de avaliados, aplicação de instrumentos e análise de resultados. Ele oferece uma solução segura e eficiente para coletar e armazenar dados de avaliações, proporcionando aos psicólogos acesso imediato aos resultados dos testes, mantendo a confidencialidade e a integridade dos dados do avaliado. </p>

## Funcionalidades

### Psicólogos

#### Login
- [x] Autenticar psicólogos no sistema

#### Gestão de Avaliados
- [x] Cadastrar um novo avaliado
- [x] Listar todos os avaliados
- [x] Exibir dados de um avaliado específico
- [x] Atualizar dados de um avaliado
- [ ] Acessar os instrumentos de um avaliado

#### Visualização dos Instrumentos disponíveis
- [x] Listar todos os instrumentos
- [x] Visualizar dados de um instrumento específico

#### Aplicação de Instrumentos
- [ ] Aplicar um instrumento a um avaliado
- [ ] Enviar por e-mail o link do instrumento ao avaliado

#### Visualização dos Resultados
- [ ] Visualizar os resultados de um instrumento finalizado

### Avaliados

#### Confirmação de Dados
- [ ] Redirecionamento a partir do link no e-mail, com um token único para a sessão de avaliação
- [ ] Confirmação dos dados do avaliado

#### Execução do Instrumento
- [ ] Iniciar a execução do instrumento
- [ ] Enviar respostas do instrumento

<div align="center">
  :construction: Em desenvolvimento...
</div>

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
