import React from 'react';
export interface IProcessBarProps {
    loading: boolean;
}

function ProcessBar(props: IProcessBarProps) {
    const { loading } = props;
    return loading ? (
        <div className="processbar-container">
            <div className="processbar a"></div>
            <div className="processbar b"></div>
            <div className="processbar c"></div>
            <div className="processbar d"></div>
            <div className="processbar e"></div>
            <div className="processbar f"></div>
            <div className="processbar g"></div>
            <div className="processbar h"></div>
            <div className="processbar i"></div>
            <div className="processbar j"></div>
            <div className="processbar k"></div>
            <div className="processbar l"></div>
            <div className="processbar m"></div>
            <div className="processbar n"></div>
            <div className="processbar o"></div>
        </div>
    ) : null;
}

export default ProcessBar;
