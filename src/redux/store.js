import { configureStore } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";

const store = configureStore({
    reducer: {
        posts: postsReduser
    }
});

export default store;