import React from "react";
import styled from "styled-components";
import { po } from "./Util";

const StyledGrid = styled.div`
    display: grid;
    grid: ${({ grid, cols, children }) =>
        grid
            ? grid
            : `auto / ${Array(cols ?? children.length)
                .fill()
                .map(() => "1fr")
                .join(" ")}`};

    gap: ${({ gap }) => gap ?? "20px"};
`;

export default class JGrid extends React.Component {
    createElement({ props: { style = {}, colSpan, rowSpan, ...props }, ...child }) {
        const _style={
            ...style
        }
        if (colSpan) _style.gridColumn = `span ${colSpan}`;
        if (rowSpan) _style.gridRow = `span ${rowSpan}`;
        props.style = _style;
        child.props = props;
        return child;
    }

    render() {
        return <StyledGrid
            className={"jr-grid "+this.props.className ?this.props.className:''}
            cols={this.props.cols}
            gap={this.props.gap}
            grid={this.props.grid}
            style={this.props.style}
            s={this.props.s}
            m={this.props.m}
            l={this.props.l}  
            b={this.props.b}            
        >
            {
                (Array.isArray(this.props.children)
                    ? this.props.children
                    : this.props.children
                        ? [this.props.children]
                        : []
                ).map((child) => child?.type ? this.createElement(child) : child)
            }
        </StyledGrid>;
    }
}