import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {filterImages} from '../../actions';

type Props = {};

const SearchComponent: React.FC<Props> = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(event) => {
                setSearchTerm(event.target.value);
                if (searchTerm.length > 3) {
                    dispatch(filterImages(event.target.value));
                }
            }} />
        </div>
    );
}

export default SearchComponent;