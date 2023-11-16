import React, { useEffect, useState } from "react"
import SearchBox from "./components/SearchBox"
import QuickLinks from "./components/QuickLinks"
import Settings from "./components/Settings"

function App() {
    const [backgroundImage, setBackgroundImage] = useState("")

    const checkCookie = (name) => {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim()

            if (cookie.startsWith(name + "=")) {
                return true
            }
        }

        return false
    }

    const readCookie = (name) => {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim()

            if (cookie.startsWith(name + "=")) {
                return decodeURIComponent(
                    cookie.substring(name.length + 1)
                ).trim()
            }
        }
        return null
    }

    const dictionary = {
        ChatGpt: "https://chat.openai.com/",
        Netflix: "https://www.netflix.com/browse",
        hotstar: "https://www.hotstar.com/in/home",
    }

    useEffect(() => {
        if (checkCookie("Background") && checkCookie("quickLinks")) {
            setBackgroundImage(readCookie("Background"))
            console.log("Cookies Found")
        } else {
            console.log("Cookies not found! now Inserting cookies")

            // * Insert background cookie
            document.cookie = `Background=${encodeURIComponent(
                "https://w.wallhaven.cc/full/kx/wallhaven-kx82d6.png"
            )}; path=/; secure`

            // * Insert favourites cookie
            document.cookie = `quickLinks=${encodeURIComponent(
                JSON.stringify(dictionary)
            )}; path=/; secure`
        }
        console.log(`URL = ${readCookie("Background")}`)
    }, [])

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                opacity: 0.8,
                height: "100vh",
                width: "100vw",
                alignContent: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <SearchBox />
            <QuickLinks />
            <Settings />
        </div>
    )
}

export default App
