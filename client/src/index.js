import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + '/graphql',
  cache: new InMemoryCache(),
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

