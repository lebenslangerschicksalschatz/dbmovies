import React from 'react';

const Pagination = (props) => {
    const pageLinks = [];

    for(let i = 1; i <= props.pages; i++) {
        let activePage = props.current === i ? 'activePage' : '';

        pageLinks.push(
            <li
                className={`pages__number ${activePage}`}
                key={i}
                onClick={() => props.nextPage(i)}
            >
                <button>{i}</button>
            </li>)
    }

    return (
        <ul className="pages">
            {props.currentPage > 1 &&
            <li className={`pages__number pages__arrow`} onClick={() => props.nextPage(props.currentPage - 1)}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-left" role="img" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"/>
                    </svg>
                </button>
            </li>}
            {pageLinks}
            {props.currentPage < props.pages &&
            <li className={`pages__number pages__arrow`} onClick={() => props.nextPage(props.currentPage + 1)}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-right" role="img" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"/>
                    </svg>
                </button>
            </li>}
        </ul>
    )
}

export default Pagination