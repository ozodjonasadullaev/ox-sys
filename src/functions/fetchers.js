import axios from "axios";

export const getProducts = async ({
  setfiltered,
  setToggle,
  token,
  page,
  setdata,
  settotal,
}) => {
  setfiltered(null);
  setToggle(false);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const params = {
    size: 10,
    page: page,
    stock: {
      exist: true,
      location: [42],
    },
  };
  try {
    const res = await axios.post(
      `https://face.ox-sys.com/variations`,
      params,
      config
    );
    setdata(
      res.data.items.map((ar) => {
        return {
          key: ar.id,
          size: ar.properties[0] ? ar.properties[0].value : "",
          color: ar.properties[1] ? ar.properties[1].value : "",
          ...ar,
        };
      })
    );
    settotal(res.data.total_count);
  } catch (err) {
    console.log(err);
  }
};
