import React, { useState, useEffect, FormEvent } from 'react';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import apiGithub from '../../services/apiGithub';
import DataTable from "material-table";

import logoImg from '../../assets/github-background.svg';

import { Title, Form, Error, Header, HeaderContent } from './styles';

interface Repository {
  repositories?: any;
  language: string;
  name: any;
  description: string;
  stargazers_count: number;
  username: string;
}

const columns = [
  { field: 'language', title: 'Linguagem' },
  { field: 'name', title: 'Repositório' },
  { field: 'description', title: 'Descrição' },
  { field: 'stargazers_count', title: 'Estrelas' },
  { field: 'username', title: 'Usuário' }
];

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

useEffect(() => {
  localStorage.setItem(
    '@GithubExplorer:repositories',
    JSON.stringify(repositories),
  )

}, [repositories])

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite a linguagem repositório');
      return;
    }

    try {
    const response = await apiGithub.get<Repository>(`/legacy/repos/search/${newRepo}?language=${newRepo}`);

    const repository = response.data.repositories;

    setRepositories(repository);
    setNewRepo('');
    setInputError('');

    } catch (err) {
      setInputError('Erro na busca por essa linguagem, tente novamente');

    }

  }

  return (
    <>
    <Header>
        <HeaderContent>

          <Link to="/github-repositories">
          <button type="button">
            <ArrowBack />
            <strong>Voltar</strong>
          </button>
          </Link>
        </HeaderContent>
      </Header>


      <img style={{ width:100, height:100 }} src={logoImg} alt="Github Explore" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome da linguagem"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error> }

      <div style={{ height: 400, width: '100%', marginTop: 100}}>

        <DataTable title="Github" style={{ padding: 10 }} data={repositories} columns={columns} />

      </div>

    </>
  );
};

export default Dashboard;
