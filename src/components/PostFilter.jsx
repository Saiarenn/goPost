import React from "react";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import {Col, Row} from "react-bootstrap";

const PostFilter = ({filter, setFilter}) => {
    return (
        <Row>
            <Col md={6}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Searching..."
                        value={filter.query}
                        onChange={e => setFilter({...filter, query: e.target.value})}
                    />
                </InputGroup>
            </Col>
            <Col md={6}>
                <select className="form-select mb-3 " value={filter.sort}
                        onChange={e => setFilter({...filter, sort: e.target.value})}>
                    <option value="" disabled={true}>Sort By</option>
                    <option value="description">Description</option>
                    <option value="title">Title</option>
                </select>
            </Col>
        </Row>
    );
};

export default PostFilter;
