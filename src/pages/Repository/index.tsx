import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import apiGithub from '../../services/apiGithub';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  repositories?: any;
  username: string;
  description: string;
  stargazers_count: number;
  language: string;
}



const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);

  const { params } = useRouteMatch<RepositoryParams>();


  useEffect(() => {
    apiGithub.get(`/legacy/repos/search/${params.repository}?language=${params.repository}`).then(response => {
      setRepository(response.data.repositories);
    });



  },[params.repository])


  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explore" />
        <Link to="/">
          <FiChevronLeft size={16} />
        </Link>
      </Header>

      { repository && (
        <RepositoryInfo>
        <header>

          <div>
            <strong>{repository.username}</strong>
        <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
        <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
        <strong>{repository.language}</strong>
            <span>Stars</span>
          </li>


        </ul>
      </RepositoryInfo>
      )}
    </>

  )
}

export default Repository;
