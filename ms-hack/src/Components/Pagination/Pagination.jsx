import React from 'react';

function Pagination(props) {
  const { pagesCount, currentPage, onPageChange } = props;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        style={{
          backgroundColor: currentPage === i ? '#ccc' : '#fff',
          padding: '10px',
          margin: '5px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {i}
      </button>
    );
  }

  return <div>{pages}</div>;
}

export default Pagination;