import './App.css'
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/HomePage/Home'
import SignPage from './Pages/SignPage/SignPage'
import NavList from './Pages/Header/Header'
import Quiz from './Pages/QuizPage/Quiz'
import Reviews from './Pages/Reviews/Reviews'
import Footer from './components/footer/Footer'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import Messages from './components/messages/Messages'
import Conversations from './components/conversations/Conversations'
import Patients from './components/Patients'
import Setting from './components/setting/Setting'
import QuizSettings from './components/quizSetting/QuizSettings'
import Doc from './components/sideBar/DocProfile'
import Profile from './Pages/Profile/Profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PatientMessages from './components/messages/PatientMessages'
import Questions from './components/quizSetting/Questions'

function App() {
  const queryClient = new QueryClient()
  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <NavList />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </>
    )
  }
  const LayoutSec = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <NavList />
          <Doc />
        </QueryClientProvider>
      </>
    )
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/quiz",
          element: <Quiz />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/reviews",
          element: <Reviews />
        },

      ]
    },
    {
      path: "/",
      element: <LayoutSec />,
      children: [
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/profile/patients/:id",
          element: <Patients />
        },
        {
          path: "/profile/settings",
          element: <Setting />
        },
        {
          path: "/profile/question",
          element: <Questions />
        },
        {
          path: "/profile/messages/:id",
          element: <Messages />
        },
        {
          path: "/profile/messages",
          element: <PatientMessages />
        },
        {
          path: "/profile/conversations",
          element: <Conversations />
        },
      ]
    },
    {
      path: "/sign",
      element: <SignPage />
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
