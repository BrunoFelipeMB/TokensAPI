interface ICreateUserDB {
  id?: string;
  apiKey?: string;
  username: string;
  email: string;
  password: string;
  routes: string[];
  userToken?: string;
  created_at?: string;
  updated_at?: string;
}

export { ICreateUserDB };
