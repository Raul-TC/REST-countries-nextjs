import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [DarkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
      document.body.classList.add("bg-bodyDark");
      document.body.classList.remove("bodyLight");

    //  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#343A40')
    } else {
      setDarkTheme(false)
      document.body.classList.remove("bg-bodyDark");
      document.body.classList.add("bodyLight");

    //  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f3f3f3')
    }
  }, [])

  const handleTheme = () => {
    if (DarkTheme) {
      setDarkTheme(false)
      document.body.classList.remove("bg-bodyDark");
      document.body.classList.add("bodyLight");

      localStorage.setItem('theme', false)
    //  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f3f3f3')
    } else {
      setDarkTheme(true)
      document.body.classList.add("bg-bodyDark");
      document.body.classList.remove("bodyLight");

      localStorage.setItem('theme', true)
    //  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#343A40')
    }
  }
  const data = { DarkTheme, handleTheme }
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
