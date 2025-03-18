import React from "react";
import { createContext } from "react";

export const productContextObj = createContext();

function ProductContext() {

    let [productItems, setProductItems] = useState([])

  return (
    <productContextObj.Provider value={{productItems, setProductItems}}>
        {children}
    </productContextObj.Provider>
  )
}

export default ProductContext