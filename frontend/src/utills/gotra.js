const getAllGotras = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/gotra/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching gotras: ", error);
  }
};

export const AllGotras = await getAllGotras();

export const gotraNames = [...AllGotras.map((gotra) => gotra.name)];

export const gotraOptions = gotraNames.map((gotra) => ({
  value: gotra,
  label: gotra
}));
