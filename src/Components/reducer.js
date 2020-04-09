import { useReducer } from 'react';
import shortid from 'shortid';

const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));

const initialState = {
	playlist: savedPlaylist || [],
	loading: false,
	autoPlay: false
};

const reducer = (state, action) => {
	let playlist = [];
	switch (action.type) {
		case 'TOGGLE_LOADING':
			let { loading } = state;
			return { ...state, loading: !loading };
		case 'ADD_TO_PLAYLIST':
			playlist = [ ...state.playlist ];
			let url = action.url;
			let videoFound = playlist.filter((x) => x.url === url).length;
			if (videoFound) {
				return { ...state };
			}
			const playlistItem = {
				id: shortid.generate(),
				url: url
			};
			playlist.push(playlistItem);
			savePlaylist(playlist);
			return { ...state, playlist: playlist };
		case 'PLAY_NEXT':
			playlist = [ ...state.playlist ];
			playlist.shift();
			savePlaylist(playlist);
			return { ...state, playlist: playlist, autoPlay: true };
		case 'REORDER_PLAYLIST':
			let reorderedList = action.playlist;
			savePlaylist(reorderedList.playlist);

			return { ...state, playlist: reorderedList.playlist };
		case 'REMOVE_VIDEO':
			let id = action.id;
			playlist = [ ...state.playlist ].filter((video) => video.id !== id);
			savePlaylist(playlist);
			return { ...state, playlist: playlist };
		default:
			return state;
	}
};

const savePlaylist = (playlist) => {
	localStorage.setItem('playlist', JSON.stringify(playlist));
};

export function useVideoReducer() {
	return useReducer(reducer, initialState);
}
