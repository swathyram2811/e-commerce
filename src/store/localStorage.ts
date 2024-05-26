import { IProduct } from "../utils/types";

export const addToCart = (item: IProduct) => {
  const data = getCartInStore();
  let len: number;
  if (data?.length) {
    const idx = data?.findIndex((prod) => prod?.id === item?.id);

    if (idx === -1) {
      item.totalCount = 1;
      data?.push(item);
    } else {
      data[idx].totalCount += 1;
    }
    len = data?.length;
    updateCartInStore(data);
  } else {
    // set the initial count to the item
    item.totalCount = 1;
    len = 1;
    updateCartInStore([item]);
  }
  return len;
};

export const getCartInStore = () => {
  const data = localStorage.getItem(
    process.env.REACT_APP_STORAGE_KEY || "cartItem"
  );
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data) as IProduct[];
  } catch (e) {
    console.error("Parsing error:", e);
    return [];
  }
};

export const updateCartInStore = (item: IProduct[]) => {
  localStorage.setItem(
    process.env.REACT_APP_STORAGE_KEY || "cartItem",
    JSON.stringify(item)
  );
  return getCartInStore()?.length;
};
