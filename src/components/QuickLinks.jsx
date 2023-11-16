import React, { useState, useEffect } from "react"
import "./QuickLinks.css"
import linkIcon from "../assets/go.png"

function QuickLinks() {
    const [jsonData, setJsonData] = useState([])

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
        } catch (e) {
            console.log(
                `You mignt not have a cookie error message: ${e.message}`
            )
        }
        console.log(JSON.stringify(jsonData))
    }, [])

    return (
        <div>
            <div id="button-container" className="QuickLinksContainer">
                {Object.entries(jsonData).map(([text, link]) => (
                    <button
                        key={text}
                        onClick={() => (window.location.href = link)}
                        className="QuickLinksButton"
                    >
                        {text}
                        <img src={linkIcon} />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickLinks
