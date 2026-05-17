import React from 'react';
import { Link } from 'react-router-dom';
import stlyes from './UserTable.module.css' 





export default function UserTable(){
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
