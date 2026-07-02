import React from 'react';
import api from '../../services/api';
import { useState, useEffect } from 'react';


export default function UserTable(){

  const [usuarios, setUsuarios] = useState ([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState([null]);
    return(

        <table id="tabelspec"><thead>
  <tr>
    <th>ID</th>
    <th>NOME</th>
    <th>EMAIL</th>
    <th colSpan="2">Ações</th>
  </tr></thead>
<tbody>
  <tr>
    <td>1</td>
    <td>ian lucas</td>
    <td>ianlucasqueiroz5@gmail.com</td>
    <td><button className="botao">editar</button></td>
    <td><button className="botao">excluir</button></td>
  </tr>
  <tr>
    <td>2</td>
    <td>luiz carlos</td>
    <td>luizcarlos2@gmail.com</td>
    <td><button className="botao">editar</button></td>
    <td><button className="botao">excluir</button></td>
  </tr>
  <tr>
    <td>3</td>
    <td>pedro eduardo</td>
    <td>pedroeduardo32@gmail.com</td>
    <td><button className="botao">editar</button></td>
    <td><button className="botao">excluir</button></td>
  </tr>
  <tr>
    <td>4</td>
    <td>ester alcantra</td>
    <td>steralcantra@gmail.com</td>
    <td><button className="botao">editar</button></td>
    <td><button className="botao">excluir</button></td>
  </tr>
  <tr>
    <td>5</td>
    <td>sophia flor</td>
    <td>sophiaflor20@gmail.com</td>
    <td><button className="botao">editar</button></td>
    <td><button className="botao">excluir</button></td>
  </tr>
</tbody>
</table>



    )

    
}
