import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'h4oa3doy',
    dataset: 'production'
  },
  deployment: {
    /**
     * Studio updates are installed deliberately with the project dependencies.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    // Use the Studio version verified with this project and its lockfile.
    autoUpdates: false,
  }
})
