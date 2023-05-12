import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

export default function Continue() {
    let [codeVerifier, _setCodeVerifier] = useState(localStorage.getItem('code_verifier'))
    let [token, setToken] = useState({})
    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Proof Key for Code Exchange (PKCE) React Demo</h1>
            <div className="card">
                <p>Code verifier (used previously):</p>
                <pre>{codeVerifier}</pre>
            </div>
            <div className="card">
                <p>Access Token Response:</p>
                <pre>{JSON.stringify(token, null, 2)}</pre>
                <button onClick={() => {
                    const authServer = 'http://localhost:8080'

                    const state = localStorage.getItem('state')
                    const params = new URLSearchParams(window.location.search)

                    if (state == params.get('state')) {
                        console.log('State matches: ' + state)
                    }

                    if (codeVerifier && params.get('code')) {
                        params.set('grant_type', 'authorization_code')
                        params.set('client_id', 'messaging-client')
                        params.set('redirect_uri', 'http://localhost:9000/continue')
                        params.set('code_verifier', codeVerifier)

                        params.delete('state')
                        
                        fetch(authServer + '/oauth2/token', {
                            method: 'POST',
                            body: params,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                            .then(res => {
                                return res.json()
                            })
                            .then(data => {
                                setToken(data)
                            })

                    }
                }}>
                    Get Access Token
                </button>
            </div>
        </>
    )
}