import "./SearchBox.css"
import searchLogo from "../assets/search.png"
import { useEffect } from "react"

function SearchBox() {
    useEffect(() => {
        const searchBox = document.getElementById("searchBox")
        searchBox.addEventListener("keydown", searchwithEnter, true)
    }, [])

    const searchwithEnter = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    const search = () => {
        const searchBox = document.getElementById("searchBox")
        const querry = searchBox.value.trim()

        if (querry.length == 0) {
            console.log("No Search Querry")
        } else {
            const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
                querry
            )}`
            searchBox.value = ""
            window.location.href = searchURL
        }
    }

    return (
        <div className="searchParent">
            <input
                type="text"
                className="searchBox"
                id="searchBox"
                placeholder="Search Here"
            />
            <button className="search" id="search" onClick={() => search()}>
                <img src={searchLogo} />
            </button>
        </div>
    )
}

export default SearchBox
