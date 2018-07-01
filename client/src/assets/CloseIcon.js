import React from 'react';

export const CloseIcon = props => {
	const { width, height, styles, size, ...rest } = props;
	return (
		<svg width={size || width} height={size || height} className={styles} viewBox="0 0 1792 1792">
			<path
				fill={props.fill || '#595959'}
				{...rest}
				d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"
			/>
		</svg>
	);
};
