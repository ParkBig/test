import { configureStore } from "@reduxjs/toolkit";
import alertText from "./modules/alertText";
import toggleModal from "./modules/toggleModal";

const store = configureStore({
  reducer: {
    toggleModal: toggleModal.reducer,
    alertText: alertText.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
