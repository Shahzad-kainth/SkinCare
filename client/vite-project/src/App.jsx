import {Routes,Route} from 'react-router'
import SignupPage from './pages/signupPage'
import LoginPage from './pages/loginPage'
import Homepage from './pages/homePage';
import HomePageLayout from './layouts/HomePageLayout'
import BlogPage from './pages/blogPage';
function App() {
  

  return (

    <Routes>
        <Route element={<HomePageLayout/>}>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/blog/:id' element={<BlogPage/>}></Route>
         </Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/signin' element={<LoginPage></LoginPage>}></Route>
    </Routes>
    
  )
}

export default App
