import "./Pagination.css";
/*eslint-disable*/
function Pagination({ state, setState }) {
  function handelNextClick() {
    setState(state + 1);
  }
  function handelPreviousClick() {
    if (state <= 1) return;
    setState(state - 1);
  }
  return (
    <div>
      <div className="pagination-container">
        <ul>
          <li>
            <button onClick={handelPreviousClick}>Prev</button>
          </li>
          <li>{`${state}`}</li>
          <li>
            <button onClick={handelNextClick}>Next</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
