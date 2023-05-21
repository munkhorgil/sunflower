import { getEnv } from "./utils.ts";
import querystring from "query-string";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

interface SpotifyAudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface AudioFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
}

interface SpotifyParams {
  accessToken: string;
  playlistId: string;
}

const getSpotifyAccessToken = async (): Promise<string> => {
  const credentials = Buffer.from(
    `${getEnv("SPOTIFY_CLIENT_ID")}:${getEnv("SPOTIFY_CLIENT_SECRET")}`
  ).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: querystring.stringify({
      grant_type: "client_credentials",
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    options
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Unable to get access token: ${response.status} ${JSON.stringify(data)}`
    );
  }

  return data.access_token;
};

class SpotifyAPI implements SpotifyParams {
  public accessToken: string;

  public playlistId: string;

  private headers: Record<string, string>;

  constructor({ accessToken, playlistId }: SpotifyParams) {
    if (!accessToken) {
      throw new Error("accessToken is not provided");
    }

    if (!playlistId) {
      throw new Error("playlistId is not provided");
    }

    this.accessToken = accessToken;
    this.playlistId = playlistId;

    this.headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  private async getPlaylistTrackIds(): Promise<string | Error> {
    const url = `${SPOTIFY_API_URL}/playlists/${this.playlistId}/tracks?fields=items(track(id))`;

    const response = await fetch(url, { headers: this.headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error retrieving playlist tracks: ${response.status} ${JSON.stringify(
          data
        )}`
      );
    }

    const trackIds: string[] = data.items.map((item: any) => item.track.id);

    return trackIds.join();
  }

  async getAudioFeatures(): Promise<AudioFeatures[]> {
    const trackIds = await this.getPlaylistTrackIds();
    const url = `${SPOTIFY_API_URL}/audio-features?ids=${trackIds}`;

    try {
      const response = await fetch(url, { headers: this.headers });

      if (!response.ok) {
        throw new Error("Error fetching audio features");
      }

      const data = await response.json();

      return this.customizeResponse(data.audio_features);
    } catch (error: any) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  private customizeResponse(data: SpotifyAudioFeatures[]): AudioFeatures[] {
    const modifiedResponse: AudioFeatures[] = [];

    for (const item of data) {
      modifiedResponse.push({
        danceability: item.danceability,
        energy: item.energy,
        key: item.key,
        loudness: item.loudness,
        mode: item.mode,
        speechiness: item.speechiness,
        acousticness: item.acousticness,
        instrumentalness: item.instrumentalness,
        liveness: item.liveness,
        valence: item.valence,
        tempo: item.tempo,
      });
    }

    return modifiedResponse;
  }
}

export { getSpotifyAccessToken, SpotifyAPI };
