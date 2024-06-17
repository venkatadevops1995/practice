/* eslint-disable @typescript-eslint/no-floating-promises */

import useCheckCargoLiveFromServer from "../cargo-utils/cargo-live-server"


const LandingPage = async () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCheckCargoLiveFromServer()
}
export default LandingPage
