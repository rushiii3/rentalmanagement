"use client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {NextUIProvider} from '@nextui-org/react'
import {Provider} from 'react-redux'
import store from './Redux/store'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
  <NextUIProvider>
        <App />
    </NextUIProvider>
    </Provider>
    </QueryClientProvider>
);


