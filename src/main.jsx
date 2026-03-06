import React from 'react'
import ReactDOM from 'react-dom/client'
import SphereWrapper from './Sphere'

const mountNode = document.getElementById('logoSphere');

if (mountNode) {
    ReactDOM.createRoot(mountNode).render(
        <React.StrictMode>
            <SphereWrapper />
        </React.StrictMode>
    );
}