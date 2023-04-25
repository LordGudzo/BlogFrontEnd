import { configureStore } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";
import { authReduser } from "./slices/auth";

const store = configureStore({
    reducer: {
        posts: postsReduser,
        auth: authReduser
    }
});

export default store;