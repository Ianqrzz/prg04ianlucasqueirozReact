// src/pages/AdminPanel/index.jsx

import UserTable from '../../components/UserTable/UserTable'
import UserForm from '../../components/UserForm/UserForm'

export default function AdminPanel() {
  return (<><h1>Painel Admin</h1><UserTable />
   <UserForm/> </>
  )
}