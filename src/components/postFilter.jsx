import React from 'react';
import MyInput from "./UI/input/myInput";
import MySelect from "./UI/select/mySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange = {e => setFilter({...filter, query: e.target.value})}
                placeholder="Search"
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort"
                options={[
                    {value: 'title', name: 'Be Name'},
                    {value: 'body', name: 'Be Description'}
                ]}
            />
        </div>
    );
};

export default PostFilter;