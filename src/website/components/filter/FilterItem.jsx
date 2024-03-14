import { useEffect, useRef, useState } from "react";
import "./style/FilterItem.css";
import { IoIosArrowDown } from "react-icons/io";
function FilterItem({ itemKey, data, filter, setFilter }) {
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
      {data &&
        (data?.type == "input" ? (
          <>
            <input
              type="text"
              className="filter-input"
              value={filter[itemKey]}
              placeholder={data?.placeholder}
              onChange={(e) => {
                setFilter({ ...filter, [itemKey]: e.target.value });
              }}
            />
          </>
        ) : data?.type == "select" ? (
          <>
            <div className="filter-select" ref={ref}>
              <div
                className={"show-section" + (isOpen ? " open" : "")}
                onClick={(e) => setIsOpen(!isOpen)}
              >
                <span>
                  {filter[itemKey]
                    ? data?.placeholder === "choose price"
                      ? `between ${filter[itemKey]?.minPrice} and ${filter[itemKey]?.maxPrice}`
                      : filter[itemKey]?.name
                    : data?.placeholder}
                </span>
                <IoIosArrowDown className="filter-icon" />
              </div>
              <div className={"filter-list" + (isOpen ? " open" : "")}>
                <input
                  type="text"
                  className="w-[90%]"
                  value={listFilter}
                  onChange={(e) => setListFilter(e.target.value)}
                />
                <ul>
                  {data?.list &&
                    data?.list?.map((item, index) => {
                      if (
                        listFilter == "" ||
                        item.name.startsWith(listFilter)
                      ) {
                        if (data?.placeholder === "choose price") {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                setFilter({ ...filter, [itemKey]: item });
                                setIsOpen(false);
                              }}
                            >
                              {`between ${item.minPrice} and ${item.maxPrice}`}
                            </li>
                          );
                        }
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              setFilter({ ...filter, [itemKey]: item });
                              setIsOpen(false);
                            }}
                          >
                            {item.name}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          </>
        ) : null)}
    </>
  );
}

export default FilterItem;
