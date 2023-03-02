import React from 'react';
import * as IconSource from '@mdi/js';

export interface IIconProps {
    name: string;
    color: string;
    viewBox?: any;
    width?: number;
    height?: number;
}

export default function Icon(props: IIconProps) {
    const { name, color, viewBox = '0 0 24 24', width = 24, height = 24 } = props;

    const fixProps = () => {
        return ['action', 'disabled', 'error', 'inherit', 'primary', 'secondary'].includes(color) ? { color: color } : { fill: color };
    };

    return (
        <svg viewBox={viewBox} widths={width} height={height} {...fixProps()}>
            <path d={IconSource[`mdi${name}` as keyof typeof IconSource]} {...fixProps()} />
        </svg>
    );
}
