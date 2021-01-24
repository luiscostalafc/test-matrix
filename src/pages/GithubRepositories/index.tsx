import React, { useState, useEffect } from 'react';
import DataTable from "material-table";
import { useAuth } from '../../hooks/Auth/auth';
import { Link } from 'react-router-dom';

import { FiPower, FiSearch } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile } from './styles'

import apiGithub from '../../services/apiGithub';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const columns = [
  { field: 'language', title: 'Linguagem' },
  { field: 'full_name', title: 'Nome' },
  { field: 'description', title: 'Descrição' },
  { field: 'stargazers_count', title: 'Estrelas' },
  { field: 'owner.login', title: 'Usuário' },
  {
    title: 'Avatar', render: (row: any) => (
      <img style={{ borderRadius: '50%' }} width='50px' height="50" src={row.owner.avatar_url} alt="Imagem do Avatar" />
    )
  }
];


export default function ComparatorSortingGrid() {
  const [repositories, setRepositories] = useState<Repository[] | any>([]);

  const { token, signOut, user } = useAuth()

  useEffect(() => {
    apiGithub.get('/search/repositories?q=0..*?language').then(response => {
      apiGithub.defaults.headers.authorization = `Bearer ${token}`;
      setRepositories(response.data.items);
    });
  }, [])


  return (
    <Container>

      <Header>
        <HeaderContent>

          <Profile>
            <img
              src={
                user.avatar_url ||
                'https://gravatar.com/avatar/1d0df06e255a4ab0702a05a5608eacd3?s=400&d=wavatar&r=x'
              }
              alt={user.name}
            />
            <div>
              <span>Bem-vindo, </span>
              <Link to="/profile"><strong>{user.name}</strong></Link>
            </div>
            <div style={{ marginLeft: '200px' }}>
              <Link to="/dashboard">
                <button type="button">
                  Refinar busca
                  <FiSearch color='#312e38' style={{ marginLeft: -25 }} />
                </button>
              </Link>
            </div>
            <div>
                <button type="button" onClick={signOut}>
                  Sair
            <FiPower style={{ marginLeft: -25 }} />

                </button>
              </div>
          </Profile>

        </HeaderContent>
      </Header>

      <div style={{ height: 400, width: '100%', marginTop: 150 }}>

        <DataTable title="Github" style={{ padding: 10 }} data={repositories} columns={columns} />

      </div>

    </Container>
  );
}
