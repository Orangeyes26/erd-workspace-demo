import { createElement as h, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { addCollection } from '@iconify/react'
import antDesign from '@iconify-json/ant-design/icons.json'

// IBM Plex web fonts (bundled offline via @fontsource — no CDN)
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'

import './styles/tokens.css'
import './styles/global.css'

import App from './App.jsx'
import { WorkspaceProvider } from './state/WorkspaceContext.jsx'

// Register the ant-design icon set locally so icons resolve without the Iconify API.
addCollection(antDesign)

createRoot(document.getElementById('root')).render(
  h(StrictMode, null, h(WorkspaceProvider, null, h(App)))
)
