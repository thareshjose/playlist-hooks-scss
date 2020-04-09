import React from 'react';
import ReactPlayer from 'react-player';
import './player.scss';

const Player = (props) => {
	return (
		<ReactPlayer
			className="player"
			url={props.url}
			controls={true}
			playing={props.playing}
			onEnded={props.onEnded}
		/>
	);
};

export default Player;
