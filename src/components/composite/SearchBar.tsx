// Import necessary modules
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Card component
const Card = ({ children : any }) => {
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="card-body">{children}</div>
    </div>
  );
};

// SearchComponent
export default function SearchComponent(props : any) {
  const { choices, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener('click', (event : any) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });

    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);

  return (
    <form className="max-w-sm px-4">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          ref={inputRef}
          onChange={onInputChange}
          placeholder="Search for movie..."
          className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
        />
        <ul id="results" className="list-group absolute z-10 w-full max-h-60 overflow-y-auto" ref={ulRef} style={{ flexDirection: 'column' }}>
          {choices.map((choice, index) => (
            <li key={index} className="main-menu__app-menu">
              <Card>
                <Link to={`/movie/${choice.movieId}`} className="text-indigo-600 font-semibold">
                  {choice.title}
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
