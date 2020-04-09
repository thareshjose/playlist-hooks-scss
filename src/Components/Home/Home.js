import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useVideoReducer } from '../reducer';
import Player from '../Player/Player';
import Loader from '../Loader/Loader';
import Toast, { notifySuccess, notifyError } from '../Toast/Toast';
import Playlist from '../Playlist/Playlist';
import './home.scss';

const Home = (props) => {
	const [ state, dispatch ] = useVideoReducer();
	const videoUrl = useRef();

	const handleUrl = () => {
		const url = videoUrl.current.value;
		if (isValidUrl(url)) {
			dispatch({ type: 'TOGGLE_LOADING' });
			dispatch({ type: 'ADD_TO_PLAYLIST', url: url });
			clearLoadingAndInput('Success');
		} else {
			clearLoadingAndInput('Error');
		}
	};

	const clearLoadingAndInput = (status) => {
		let loadTime = state.playlist.length <= 1 ? 2000 : 1500;
		videoUrl.current.value = '';
		if (status === 'Success') {
			notifySuccess();
		} else {
			notifyError();
		}
		setTimeout(() => {
			if (status === 'Success') {
				dispatch({ type: 'TOGGLE_LOADING' });
			}
		}, loadTime);
	};

	const isValidUrl = (url) => {
		return ReactPlayer.canPlay(url);
	};

	const playNextVideo = () => {
		dispatch({ type: 'PLAY_NEXT' });
	};

	const reorderPlaylist = (playlist) => {
		dispatch({ type: 'REORDER_PLAYLIST', playlist: playlist });
	};

	const removeVideo = (id) => {
		dispatch({ type: 'REMOVE_VIDEO', id: id });
	};
	const { playlist, loading, autoPlay } = state;
	return (
		<div className="main-container">
			<Toast />
			<div className={`header-container ${playlist.length === 0 ? 'empty-page' : ''}`}>
				<input
					type="text"
					ref={videoUrl}
					className="video-input"
					placeholder="Enter your youtube/facebook video url"
					onSubmit={handleUrl}
				/>
				<button className="add-button" onClick={handleUrl}>
					Add to playlist
				</button>
			</div>
			<div className="loader-container">{loading && <Loader />}</div>
			<div className="player-container">
				{playlist.length >= 1 && <Player url={playlist[0]['url']} playing={autoPlay} onEnded={playNextVideo} />}
				{playlist.length >= 1 && (
					<Playlist playlist={state.playlist} reorderPlaylist={reorderPlaylist} removeVideo={removeVideo} />
				)}
			</div>
		</div>
	);
};

export default Home;
