import React, { useState, useEffect, useRef } from "react";
import useKeypress from "./useKeyPress";
import useOnClickOutside from "./useOnClickOutside";

function UserNotes(props) {
    const [isInputActive, setIsInputActive] = useState(false);
    const [inputValue, setInputValue] = useState(props.text);
  
    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    const inputRef = useRef(null);
  
    const enter = useKeypress("Enter");

    // check to see if the user clicked outside of this component
    useOnClickOutside(wrapperRef, () => {
      if (isInputActive) {
        setInputValue(inputValue);
        setIsInputActive(false);
      }
    });

    useEffect(() => {
      if (isInputActive) {
        inputRef.current.focus();
      }
    }, [isInputActive]);
  
    useEffect(() => {
      if (isInputActive) {
        if (enter) {
            setInputValue(inputValue);
            setIsInputActive(false);
        } 
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enter]);

    function handleChange(event) {
        setInputValue(event.target.value);
    }
  
    return (
      <div className="user-note" ref={wrapperRef}>
        <span
          ref={textRef}
          onClick={() => setIsInputActive(true)}
          className={`user-note__copy user-note__copy_${
            !isInputActive ? "active" : "hidden"
          }`}
        >
          {inputValue}
        </span>
        <textarea
          ref={inputRef}
          onChange={handleChange}
          className={`user-note__input user-note__input_${
            isInputActive ? "active" : "hidden"
          }`}
          placeholder="Click to enter your thoughts!"
        ></textarea>
      </div>
    );
}

export default UserNotes;