import React from 'react';

export const DeleteIcon = props => {
	const { width, height, styles, size, ...rest } = props;
	return (
		<svg
			enableBackground="new 0 0 32 32"
			id="Layer_1"
			viewBox="0 0 32 32"
			xmlSpace="preserve"
			width={size || width}
			height={size || height}
			className={styles}
		>
			<path
				fill={props.fill || '#515151'}
				{...rest}
				d="M20.377,16.519l6.567-6.566c0.962-0.963,0.962-2.539,0-3.502l-0.876-0.875c-0.963-0.964-2.539-0.964-3.501,0  L16,12.142L9.433,5.575c-0.962-0.963-2.538-0.963-3.501,0L5.056,6.45c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.538,0,3.501l0.876,0.876c0.963,0.963,2.539,0.963,3.501,0L16,20.896l6.567,6.566  c0.962,0.963,2.538,0.963,3.501,0l0.876-0.876c0.962-0.963,0.962-2.538,0-3.501L20.377,16.519z"
			/>
		</svg>
	);
};
