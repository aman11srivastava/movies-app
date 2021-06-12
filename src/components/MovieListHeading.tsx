import React from "react";
import {Col} from "react-bootstrap";

interface MovieListHeadingProps {
    heading: string
}

export const MovieListHeading = ({heading}: MovieListHeadingProps) => {
    return(
        <Col>
            <h1>{heading}</h1>
        </Col>
    )
}

export default MovieListHeading
