export const audioFeaturePrompt = {
  danceability: {
    description: "A measure of how suitable a track is for dancing.",
    range: "0 to 1",
    example: "0.807",
  },
  energy: {
    description: "Represents a perceptual measure of intensity and activity.",
    range: "0 to 1",
    example: "0.51",
  },
  key: {
    description: "The key of the track (0-11 representing pitches).",
    range: "0 to 11",
    example: "0",
  },
  loudness: {
    description: "The overall loudness of the track in decibels (dB).",
    range: "Negative values to positive values",
    example: "-9.729",
  },
  mode: {
    description: "Indicates the modality (major or minor) of the track.",
    range: "0 or 1",
    example: "1",
  },
  speechiness: {
    description: "Detects the presence of spoken words in the track.",
    range: "0 to 1",
    example: "0.0433",
  },
  acousticness: {
    description: "Represents the acoustic quality of the track.",
    range: "0 to 1",
    example: "0.0413",
  },
  instrumentalness: {
    description: "Predicts whether a track contains no vocals.",
    range: "0 to 1",
    example: "0.115",
  },
  liveness: {
    description: "Detects the presence of a live audience in the track.",
    range: "0 to 1",
    example: "0.104",
  },
  valence: {
    description: "Describes the musical positiveness of the track.",
    range: "0 to 1",
    example: "0.961",
  },
  tempo: {
    description:
      "The overall estimated tempo of the track in beats per minute (BPM).",
    range: "Positive values",
    example: "130.118",
  },
};
