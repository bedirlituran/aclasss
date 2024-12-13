import { configureStore } from "@reduxjs/toolkit";
import Slicereducer from "./Slice";

 const Store  = configureStore(
    {
        reducer: {
            counter:Slicereducer,
        },
    }
     
)

export default Store;