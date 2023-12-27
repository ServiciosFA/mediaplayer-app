import apiClient from "../spotify";

export const fetchRecommendationsData = async (
  tracks,
  setLoading,
  setError,
  setRecommendations
) => {
  try {
    if (!tracks || tracks.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    //Get random number
    const getRandomInt = (max) => Math.floor(Math.random() * max);

    //Building array of three random numbers
    const randomIndex = Array.from({ length: 3 }, () =>
      getRandomInt(tracks.length)
    );

    //Validate seeds
    const seedArtists = tracks[randomIndex[0]]?.track
      ? tracks[randomIndex[0]]?.track?.artists[0]?.id
      : tracks[randomIndex[0]]?.artists[0]?.id;

    //Finding recommendations with our seeds from the API
    const artistResponse = await apiClient.get(`artists/${seedArtists}/albums`);

    if (artistResponse.status !== 200) throw new Error("Bad request");

    const recommendationsData = {
      listAlbums: artistResponse.data.items,
      id: seedArtists,
      forListen:
        tracks[randomIndex[0]]?.track?.artists[0].name ||
        tracks[randomIndex[0]]?.artists[0]?.name,
    };
    setLoading(false);
    setRecommendations(recommendationsData);
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};
