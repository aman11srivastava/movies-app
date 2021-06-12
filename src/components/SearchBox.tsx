import React, {ChangeEvent} from "react";
import {Col, FormControl} from "react-bootstrap";

interface SearchBoxProps {
    searchValue: string
    setSearchValue: (val: string) => void
}

export const SearchBox = ({searchValue, setSearchValue}: SearchBoxProps) => {
    return (
        <Col className={"col-sm-4"}>
            <FormControl
                value={searchValue}
                onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setSearchValue(event.target.value)}
                placeholder={"Type to search"}
            />
        </Col>
    )
}

export default SearchBox
