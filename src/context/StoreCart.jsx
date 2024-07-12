import { createContext, useContext, useState } from "react";
import { useMakePurchase } from "../hooks/purchaseHooks";
import { forceCloseModal } from "../utilities/utilities";

const CartContext = createContext();

function StoreCart({ children }) {
  const [currentId, setCurrentId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { isCreating: purchasing, createData: purchase } = useMakePurchase();

  function handleAdd(productId) {
    if (currentId === productId)
      return setQuantity((q) => {
        if (q === 10) return 10;
        return q + 1;
      });

    setCurrentId(productId);
    setQuantity(1);
  }

  function handleRemove(productId) {
    if (currentId === productId)
      return setQuantity((q) => {
        if (q === 0) return 0;
        if (q === 1) setCurrentId("");
        return q - 1;
      });

    setCurrentId("");
    setQuantity(0);
    // return
  }

  function makePurchase(sellingPrice, modalId) {
    if (!quantity) return;

    const data = { product: currentId, price: sellingPrice, quantity };
    purchase(data, {
      onSuccess: () => {
        forceCloseModal(modalId);
        setCurrentId("");
        setQuantity(0);
      },
    });
  }

  const value = { currentId, quantity, purchasing, handleAdd, handleRemove, makePurchase };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useStoreCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useStoreCart is called outside StoreCart context");
  return context;
}

export default StoreCart;
