import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Filters from './components/Filters/FiltersModule'
import Content from './components/Content'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='m-0 p-0 flex'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Navbar />
          <div className='p-4 m-4'>
          <Filters />
          </div>
          <Content />
          <Tasks />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App