export default {
  database: process.env.NODE_ENV ? 'test_dbooks' : 'dbooks',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.NODE_ENV ? 'test_dbooks.sqlite' : 'dbooks.sqlite',
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'S3CR3T',
  jwtSession: { session: false },
};
