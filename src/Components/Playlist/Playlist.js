import React from 'react';
import './playlist.scss';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = sortableElement((props) => <li className="playlist-item-url">{props.value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
	return <ul className="playlist-container">{children}</ul>;
});

const Playlist = (props) => {
	const onSortEnd = ({ oldIndex, newIndex }) => {
		let playlist = {
			playlist: arrayMove(props.playlist, oldIndex, newIndex)
		};
		props.reorderPlaylist(playlist);
	};
	return (
		<SortableContainer onSortEnd={onSortEnd}>
			{props.playlist.map((item, index) => (
				<div className="playlist-item">
					<SortableItem
						key={item.id}
						index={index}
						value={item.url}
						onClick={(e) => {
							alert(index);
						}}
					/>
					<label className="remove-video-btn" onClick={(e) => props.removeVideo(item.id)}>
						X
					</label>
				</div>
			))}
		</SortableContainer>
	);
};

export default Playlist;
