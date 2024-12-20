import { useEffect, useState} from 'react'
import '../styles/footer.css'

const Footer = () => {
    const [quote, setQuote] = useState('')

    useEffect(() => {
      const fetchQuote = async () => {
        try {
          const response = await fetch('https://api.kanye.rest/')
          const data = await response.json()
          setQuote(data.quote)
        } catch (error) {
          console.error('Failed to fetch quote', error)
        }
    }
    fetchQuote()
    }, [])
    return (
      <footer>
        <p>"{quote}" </p> 
        <p>© 2024 Vinyl Vault. All rights reserved.</p> 
      </footer>
    );
  };
  
  export default Footer;
  