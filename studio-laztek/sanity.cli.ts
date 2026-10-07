import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'h4oa3doy',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
    appId: 'p82crl0kt7l0lsjt57z4jl9y',
  },
})