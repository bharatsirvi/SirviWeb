// const getAllGotras = async () => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/gotra/`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching gotras: ", error);
//   }
// };

// export const AllGotras = await getAllGotras();

// export const gotraNames = [...AllGotras.map((gotra) => gotra.name)];

// export const gotraOptions = gotraNames.map((gotra) => ({
//   value: gotra,
//   label: gotra
// }));

export const gotraOptions = [
  {
    label: "Parmar (Panwar)",
    value: "Parmar (Panwar)"
  },
  {
    label: "Hambad",
    value: "Hambad"
  },
  {
    label: "Rathore",
    value: "Rathore"
  },
  {
    label: "Muleva",
    value: "Muleva"
  },
  {
    label: "Barfa",
    value: "Barfa"
  },
  {
    label: "Septa",
    value: "Septa"
  },
  {
    label: "Solanki",
    value: "Solanki"
  },
  {
    label: "Parihar",
    value: "Parihar"
  },
  {
    label: "Kag",
    value: "Kag"
  },
  {
    label: "Bhyal",
    value: "Bhyal"
  },
  {
    label: "Choyal",
    value: "Choyal"
  },
  {
    label: "Aglecha",
    value: "Aglecha"
  },
  {
    label: "Chavadiya",
    value: "Chavadiya"
  },
  {
    label: "Mogrecha",
    value: "Mogrecha"
  },
  {
    label: "Khandala",
    value: "Khandala"
  },
  {
    label: "Chauhan",
    value: "Chauhan"
  },
  {
    label: "Devda",
    value: "Devda"
  },
  {
    label: "Sindhara",
    value: "Sindhara"
  },
  {
    label: "Gahlot",
    value: "Gahlot"
  }
];