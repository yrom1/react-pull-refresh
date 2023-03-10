sudo lsof -t -i :3000 | xargs kill -9
cd refresh
npm install
npm start
