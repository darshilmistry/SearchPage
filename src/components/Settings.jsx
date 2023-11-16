import { useState, useEffect } from "react"
import settings from "../assets/settings.png"
import "./Settings.css"

function Settings() {
    const [pannelPosition, setPannelPosition] = useState(false)
    const [jsonData, setJsonData] = useState()
    const [bgURL, setbgURL] = useState("")

    useEffect(() => {
        try {
            setJsonData(
                JSON.parse(
                    decodeURIComponent(
                        document.cookie.replace(
                            /(?:(?:^|.*;\s*)quickLinks\s*\=\s*([^;]*).*$)|^.*$/,
                            "$1"
                        )
                    )
                )
            )
        } catch (error) {
            console.log(
                `There was an error. You can refresh the page to solve it. \n(error: ${error})`
            )
        }

        try {
            const backgroundCookie = document.cookie
                .split(";")
                .find((cookie) => cookie.trim().startsWith("Background="))

            if (backgroundCookie) {
                setbgURL(
                    decodeURIComponent(backgroundCookie.split("=")[1].trim())
                )
            }
        } catch (error) {
            console.log(
                `There was an error. You can refresh the page to solve it. \n(error: ${error})`
            )
        }
    }, [])

    const setNewBackground = () => {
        const inputfield = document.getElementById("urlInput")

        if (inputfield.value.trim() !== "") {
            document.cookie = `Background=${encodeURIComponent(
                inputfield.value
            )}; path=/; secure`
        }
        window.location.reload()
    }

    const resetfavourites = () => {
        const inputfield = document.getElementById("jsonInpur")

        if (inputfield.value.trim() !== "") {
            document.cookie = `quickLinks=${encodeURIComponent(
                inputfield.value
            )}; path=/; secure`
        }
        window.location.reload()
    }

    return (
        <div>
            <button
                className="toggleButton"
                onClick={async () => {
                    setPannelPosition(!pannelPosition)
                    document
                        .getElementById("innerToggleButton")
                        .classList.toggle("rotate")
                }}
            >
                <img id="innerToggleButton" src={settings} />
            </button>

            {pannelPosition && (
                <div className="settingsMenu">
                    <input
                        type="text"
                        id="urlInput"
                        className="bgInput"
                        defaultValue={bgURL}
                    />
                    <button className="bgButton" onClick={setNewBackground}>
                        Change BG
                    </button>
                    <br />
                    <textarea
                        className="jsonField"
                        id="jsonInpur"
                        defaultValue={JSON.stringify(jsonData, null, 2)}
                    />
                    <button className="jsonButton" onClick={resetfavourites}>
                        Update Ouicklinks
                    </button>
                </div>
            )}
        </div>
    )
}

export default Settings
