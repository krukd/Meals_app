import { useState } from "react"
import { useGlobalContext } from "../context";

const Search = () => {
    const [text, setText] = useState('')
    const {setSearch, fetchRandomMeal} = useGlobalContext()


    const handleInput = (e)=> {
        setText(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text){
            setSearch(text)
        }
    }

    const handleRandomMeal = () => {
        setSearch('')
        setText('')
        fetchRandomMeal()
    }

    return <header className="search-container">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="type your meal" className="form-input" onChange={handleInput} value={text}/>
            <button type="submit" className="btn">search</button>
            <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>surprise me!</button>
        </form>
    </header>
}

export default Search