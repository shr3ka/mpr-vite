import { SimpleHeader } from './components/simple-header.tsx'
import { Routes, Route, Outlet } from 'react-router'
import Home from './pages/home.tsx'
import About from './pages/about.tsx'
import Media from './pages/media.tsx'
import ContactUs from './pages/contact.tsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>
    </Routes>
  )
}

export default App


function Layout() {
  return (
    <div className='flex flex-col w-screen h-screen bg-background'>
      <SimpleHeader />
      <Outlet />
    </div>
  )
}