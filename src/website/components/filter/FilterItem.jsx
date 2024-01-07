import { useEffect, useRef, useState } from "react";
import "./style/FilterItem.css";
import { IoIosArrowDown } from "react-icons/io";
function FilterItem({ itemKey, data, filter, setFilter }) {
  try {
    const [isOpen, setIsOpen] = useState(false);
    const [listFilter, setListFilter] = useState("");
    const ref = useRef();
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    return (
      <>
        {data.type == "input" ? (
          <>
            <input
              type="text"
              className="filter-input"
              value={filter[itemKey]}
              placeholder={data.placeholder}
              onChange={(e) => {
                setFilter({ ...filter, [itemKey]: e.target.value });
              }}
            />
          </>
        ) : data.type == "select" ? (
          <>
            <div className="filter-select" ref={ref}>
              <div className={"show-section" + (isOpen ? " open" : "")} onClick={(e) => setIsOpen(!isOpen)}>
                <span>{filter[itemKey] ? filter[itemKey] : data.placeholder}</span>
                <IoIosArrowDown className="filter-icon" />
              </div>
              <div className={"filter-list" + (isOpen ? " open" : "")}>
                <input type="text" value={listFilter} onChange={(e) => setListFilter(e.target.value)} />
                <ul>
                  {data.list.map((item, index) => {
                    if (listFilter == "" || item.name.startsWith(listFilter))
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setFilter({ ...filter, [itemKey]: item.value });
                            setIsOpen(false);
                          }}
                        >
                          {item.name}
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterItem;
