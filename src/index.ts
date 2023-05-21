import { SpotifyAPI, getSpotifyAccessToken } from "./spotify.ts";

import { run } from "./langchain.ts";

async function init() {
  const accessToken = await getSpotifyAccessToken();
  const spotify = new SpotifyAPI({
    accessToken,
    playlistId: "playlistId",
  });

  const data = await spotify.getAudioFeatures();
  const result = await run(JSON.stringify(data, null, 2));

  console.log("Finished ============");
  console.log(result);
}

init();
