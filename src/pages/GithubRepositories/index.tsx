import React, { useState, useEffect } from 'react';
import DataTable from "material-table"

import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const columns = [
  { title: 'Nome', field: 'full_name' },
  { title: 'Descrição', field: 'description'},
  { title: 'Estrelas', field: 'stargazers_count'},
  { title: 'Linguagem', field: 'language'},
  { title: 'Issues', field: 'issues'},
  { title:'Usuário', field: 'owner.login',  },
  { title:'Avatar', field: 'owner.avatar_url', }
];




export default function ComparatorSortingGrid() {
  const [repositories, setRepositories] = useState<Repository[] | any>([]);

  useEffect(() => {
    api.get('/search/repositories?q=0..*?language&sort=stars&order=asc&page=1&per_page=10').then(response => {
      setRepositories(response.data);
    });


  },[])

  return (
    <div style={{ height: 400, width: '100%', marginTop:200}}>

    <DataTable

    data={repositories}
    columns={columns}
    options={{
      filtering: true
    }}
     />

    </div>
  );
}
