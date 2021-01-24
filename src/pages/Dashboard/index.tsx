import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import apiGithub from '../../services/apiGithub';

import logoImg from '../../assets/github-background.svg';

import { Title, Form, Repositories, Error, Header, HeaderContent } from './styles';

interface Repository {
  repositories?: any;
  username: string;
  description: string;
  stargazers_count: number;
  language: string;
}

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

    setRepositories([...repositories, repository]);
    setNewRepo('');
    setInputError('');

    } catch (err) {
      setInputError('Erro na busca por essa linguagem');

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

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.language} to= {`/repositories/${repository.username}`}>
          <div key={repository.username}>
            <strong>{repository.username}</strong>
            <p>{repository.description}</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
