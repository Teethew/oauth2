import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { base64urlEncode, generateRandomString } from './utils'
import { sha256 } from 'js-sha256'

export default function App() {
    let [codeVerifier, setCodeVerifier] = useState('')
    let [codeChallenge, setCodeChallenge] = useState('')
    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Proof Key for Code Exchange (PKCE) React Demo</h1>
            <div className="card">
                <p>Code verifier (random string):</p>
                <pre>{codeVerifier}</pre>
                <p>Code challenge (S256):</p>
                <pre>{codeChallenge}</pre>
                <button onClick={() => {
                    let hash = ''
                    const encoder = new TextEncoder()
                    const randomString = generateRandomString(48)
                    setCodeVerifier(randomString)
                    const arrayBuf = sha256.digest(encoder.encode(randomString))
                    for (let i = 0; i < arrayBuf.length; i++) {
                        hash += String.fromCharCode(arrayBuf[i]);
                    }
                    setCodeChallenge(base64urlEncode(hash))
                }}>
                    Generate code verifier
                </button>
            </div>
            <div className="card">
                <button onClick={() => {
                    const authServer = 'http://localhost:8080'

                    if (codeVerifier === '') {
                        let hash = ''
                        const encoder = new TextEncoder()
                        const randomString = generateRandomString(48)
                        codeVerifier = randomString
                        const arrayBuf = sha256.digest(encoder.encode(randomString))
                        for (let i = 0; i < arrayBuf.length; i++) {
                            hash += String.fromCharCode(arrayBuf[i]);
                        }
                        codeChallenge = base64urlEncode(hash)
                    }

                    const state = generateRandomString(16)

                    window.localStorage.setItem('state', state)
                    window.localStorage.setItem('code_verifier', codeVerifier)

                    const params = new URLSearchParams()
                    params.set('client_id', 'messaging-client')
                    params.set('redirect_uri', 'http://localhost:9000/continue')
                    params.set('response_type', 'code')
                    params.set('scope', 'openid')
                    params.set('state', state)
                    params.set('code_challenge', codeChallenge)
                    params.set('code_challenge_method', 'S256')

                    location.href = `${authServer}/oauth2/authorize?${params}`
                }}>
                    Redirect to authorization server
                </button>
            </div>
        </>
    )
}