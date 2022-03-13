import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import "../styles/popover.scss";

const Popover = ({
  ButtonRenderer,
  ButtonContentProps,
  PopoverContentRenderer,
  PopoverContentProps,
  placement = 'bottom-start',
}: any) => {
  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement,
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 10]
          }
        }
      ]
    }
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleDocumentClick(event: any) {
    // @ts-ignore
    if (referenceRef?.current.contains(event.target) || popperRef?.current.contains(event.target)) {
      return;
    }
    setVisibility(false);
  }
  function handleDropdownClick() {
    setVisibility(!visible);
  }

  return (
    <>
      <ButtonRenderer
        ref={referenceRef}
        onClick={handleDropdownClick}
        {...ButtonContentProps}
      />
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <div className={`popoverContainer ${visible ? 'visible' : ''}`} style={styles.offset}>
          <PopoverContentRenderer
            {...PopoverContentProps}
          />
        </div>
      </div>
    </>
  );
}

export default Popover;
