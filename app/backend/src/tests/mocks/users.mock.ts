const login = { email: 'luisffreitas@email.com', password: 'geladeiravelha' }

const user = {
  id: 1,
  username: 'LFF',
  role: 'admin',
  email: 'luisffreitas@email.com',
  password: 'geladeiravelha',
}

const jwtPayload = {
  email: 'luisffreitas@email.com',
  password: 'geladeiravelha',
  iat: 1669749274,
  exp: 1669835674,
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

export { login, user, token, jwtPayload }