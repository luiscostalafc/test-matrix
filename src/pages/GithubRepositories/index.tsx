import React, { useState, useEffect } from 'react';
import DataTable from "material-table"

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

const columns= [
  { field: 'language', title: 'Linguagem'},
  { field: 'full_name', title: 'Nome'},
  { field: 'description', title: 'Descrição'},
  { field: 'stargazers_count', title: 'Estrelas'},
  { field: 'owner.login', title:'Usuário' },
  { title:'Avatar', render: (row: any) => (
    <img style={{ borderRadius:'50%'}} width='50px' height="50" src={row.owner.avatar_url} alt="Imagem do Avatar"/>
  )}
];


export default function ComparatorSortingGrid() {
  const [repositories, setRepositories] = useState<Repository[] | any>([]);

  useEffect(() => {
    apiGithub.get('/search/repositories?q=*?language').then(response => {
      setRepositories(response.data.items);
    });
  },[])


  return (
    <div style={{ height: 400, width: '100%', marginTop:150}}>


    <DataTable title="Github" style={{ padding: 10}} data={repositories} columns={columns} />

    </div>
  );
}
