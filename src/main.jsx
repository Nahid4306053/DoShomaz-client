import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import Routers from './Routers/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient =  new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(

     <React.StrictMode>
          <QueryClientProvider client={queryClient}>
               <RouterProvider router={Routers}></RouterProvider>
           </QueryClientProvider>
     </React.StrictMode>
  
)
