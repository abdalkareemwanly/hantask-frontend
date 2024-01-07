import { useEffect, useRef, useState } from "react";
import "./style/Select.css";
import { IoIosArrowDown } from "react-icons/io";
function Select({ itemKey, data, setValue, getValues, errors, trigger }) {
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
        {
          <>
            <div className="select-container md:w-1/2 sm:w-3/4 w-full">
              <div className="select-label">{data.placeholder}</div>
              <div className="filter-select" ref={ref}>
                <div className={"show-section" + (isOpen ? " open" : "")} onClick={(e) => setIsOpen(!isOpen)}>
                  <span>{getValues()[itemKey] ? getValues()[itemKey] : data.list[0].name}</span>
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
                              setValue(itemKey, item.value);
                              trigger(itemKey);
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
              {errors[itemKey] ? <span>{errors[itemKey].message}</span> : null}
            </div>
          </>
        }
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Select;
