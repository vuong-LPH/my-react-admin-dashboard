import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { ApolloClient, ApolloProvider, DefaultOptions, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from "react-dom/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  uri: 'http://128.199.110.106:8080/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "myadminsecretkey",
  },
  defaultOptions
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <ApolloProvider client ={client}>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
    </ApolloProvider>
  </HelmetProvider>,
  // document.getElementById('root')
);

serviceWorker.unregister();
