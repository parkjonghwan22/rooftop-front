// const config = {
//     PT: 'http',
//     HOST: '127.0.0.1',
//     PORT: 3000,
//     BACKEND_PORT: 3005,
//     IMG_PORT: 3005,
// }
// export default config

const config = {
  APP_URL: "http://localhost:3000",
  API_URL: "http://localhost:3005",
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
};
export default config;

// const config = {
//     API_URL: 'https://nest-deploy-c764d61cc1b8.herokuapp.com',
// }
// export default config
