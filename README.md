<h1 align="center">
Numeric Solve
</h1>

---

## Descrição do projeto.

Esse projeto consiste num sistema web para lista de tarefas, onde os usuários podem registrar, editar, concluir e apagar suas tarefas.

## Instruções de como executar a aplicação

Siga o passo a passo descrito abaixo no seu terminal. **A aplicação só funcionará corretamente se você executar a interface e o json-server.**

### Interface

```bash
  git clone https://github.com/jvictordev1/angular-todo.git
  cd angular-todo
  npm i
  npm start
```

### Json server

Na mesma pasta da aplicação, execute:

```bash
  json-server --watch db.json
```

Acesse a página _http://localhost:4200_ para utilizar a aplicação.

## Tecnologias utilizadas

- Typescript
- HTML
- CSS
- Angular

## Possíveis melhorias futuras.

- [ ] Adicionar sistema de login para usuários
- [ ] Adicionar lembretes para conclusão de tarefas
- [ ] Adicionar possibilidade de integração de imagens às tarefas
- [ ] Adicionar prioridades às tarefas
