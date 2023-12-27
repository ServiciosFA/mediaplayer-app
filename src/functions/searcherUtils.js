export const searcherList = (loading, favTracks, searcher) => {
  if (!loading)
    return favTracks.items.filter(
      (item) =>
        item.track.name.toLowerCase().includes(searcher.toLowerCase()) ||
        item.track.album.name.toLowerCase().includes(searcher.toLowerCase()) ||
        item.track.artists[0].name
          .toLowerCase()
          .includes(searcher.toLowerCase())
    );
  else return favTracks.items;
};
