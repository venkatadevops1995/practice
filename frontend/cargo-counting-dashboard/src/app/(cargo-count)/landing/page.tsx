/* eslint-disable @typescript-eslint/no-floating-promises */

import useCheckCargoLiveFromServer from "../cargo-utils/cargo-live-server"


const LandingPage = () => {

  return useCheckCargoLiveFromServer()
}
export default LandingPage
