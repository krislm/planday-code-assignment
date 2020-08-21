import React, {useState} from 'react';
import {fetchImages} from '../../actions';

type Props = {};

const SearchComponent: React.FC<Props> = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(event) => {
                setSearchTerm(event.target.value);
                fetchImages(event.target.value);
            }} />
        </div>
    );
}

export default SearchComponent;