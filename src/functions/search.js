export const search = ({ val, setfiltered, data }) => {
  if (val === "") {
    setfiltered(null);
  }
  setfiltered(
    data
      .filter((prof) => {
        return prof.name.toLowerCase().includes(val.toLowerCase());
      })
      .sort((a, b) => {
        if (
          a.name.toLowerCase().indexOf(val.toLowerCase()) >
          b.name.toLowerCase().indexOf(val.toLowerCase())
        ) {
          return 1;
        } else if (
          a.name.toLowerCase().indexOf(val.toLowerCase()) <
          b.name.toLowerCase().indexOf(val.toLowerCase())
        ) {
          return -1;
        } else {
          if (a > b) return 1;
          else return -1;
        }
      })
  );
};
