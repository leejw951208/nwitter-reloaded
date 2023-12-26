import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout, AnonymousLayout } from "./components/layout/layout"
import Home from "./pages/home/home"
import Profile from "./pages/profile/profile"
import Login from "./pages/auth/login"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading"
import { auth } from "./services/firebase/firebase"
import Protected from "./components/layout/protected"
import { FindPassword } from "./pages/auth/find-password"
import Join from "./pages/auth/join"
import Anonymous from "./components/layout/anonymous"

const router = createBrowserRouter([
  {
    path: "",
    element: <Protected><Layout /></Protected>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "",
    element: <Anonymous><AnonymousLayout /></Anonymous>,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/join",
        element: <Join />
      },
      {
        path: "/find-password",
        element: <FindPassword />
      }
    ]
  },
]);

const GlobaStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, [])
  return (
    <Wrapper>
      <GlobaStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
