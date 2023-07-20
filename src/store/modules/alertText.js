import { createSlice } from '@reduxjs/toolkit';

const alertText = createSlice({
	name: 'alertText',
	initialState: { isAlert : false, text : "" },
	reducers: {
		alertAndText: (state, action) => {
			state.isAlert = action.payload[0];
      state.text = action.payload[1];
		}
	}
});

export const { alertAndText } = alertText.actions
export default alertText;
