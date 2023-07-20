import { createSlice } from '@reduxjs/toolkit';

const toggleModal = createSlice({
	name: 'choiceGroup',
	initialState: { choiceGroup: false, editProfile: false, revisePersonalPlan: [false, {}, null], inviteNewFriendToGroup:false },
	reducers: {
		toggleChoiceGroup: (state, action) => {
			state.choiceGroup = action.payload;
		},
		toggleEditProfile: (state, action) => {
			state.editProfile = action.payload;
		},
		inviteNewFriendToGroup: (state, action) => {
			state.inviteNewFriendToGroup = action.payload;
		},
		revisePersonalPlan: (state, action) => {
			state.revisePersonalPlan[0] = action.payload[0];
			state.revisePersonalPlan[1] = action.payload[1];
			state.revisePersonalPlan[2] = action.payload[2];
		}
	}
});

export const { toggleChoiceGroup, toggleEditProfile, revisePersonalPlan, inviteNewFriendToGroup } = toggleModal.actions
export default toggleModal;
