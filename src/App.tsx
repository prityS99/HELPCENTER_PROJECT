// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { RouterProvider } from "react-router-dom"
import Routes from "./Routing/Routes"
import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./Theme/Theme";
import { Provider } from "react-redux"
import { store } from "./Hooks/Redux-Toolkit/store";



function App() {
  return (
    <>
      <Provider store={store}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={Routes} />
        </ThemeProvider>

      </Provider>

    </>
  )
}

export default App
