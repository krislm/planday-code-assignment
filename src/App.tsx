import React, {useEffect, useRef, useState} from 'react';
import ImagesList from './components/Images';
import './App.scss';
import SearchComponent from "./components/search";

function App() {
    const [isSticky, setSticky] = useState(false);
    const headerRef = useRef(null)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    function handleScroll() {
        if (headerRef.current) {
            // @ts-ignore
            setSticky(headerRef.current.getBoundingClientRect().top <= 0);
        }
    }

    return (
        <div className="App">
            <div id="header" className={`App-header${isSticky ? ' sticky' : ''}`} ref={headerRef}>
                Search here:
                <SearchComponent />
            </div>
            <div className="App-content">
                <ImagesList />
            </div>
        </div>
    );
}

export default App;
