import { useEffect, useState } from "react";

export function Counter() {
  const [z, setZ] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [errorX, setErrorX] = useState(false);
  const [errorY, setErrorY] = useState(false);
  const [operator, setOperator] = useState(true);

  function updateNr1(e: string) {
    if (!isNaN(+e)) {
      setX(+e);
      setErrorX(false);
    } else {
      setErrorX(true);
    }
  }
  function updateNr2(e: string) {
    if (!isNaN(+e)) {
      setY(+e);
      setErrorY(false);
    } else {
      setErrorY(true);
    }
  }
  function changeWidth(e: HTMLInputElement) {
    e.style.width = e.value.length + "ch";
    if (e.value.length > 0) e.style.fontSize = changeFontsize(e.value.length);
  }
  function changeFontsize(e: number) {
    let i = 48 * e ** -0.33;
    return i.toString() + "px";
  }
  function changeOperator() {
    if (operator) setOperator(false);
    else setOperator(true);
  }

  useEffect(() => {
    if (operator) setZ(x + y);
    else setZ(x - y);
  });

  return (
    <>
      <div className="container">
        <input
          type="text"
          maxLength={12}
          className={errorX ? "error" : "number"}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            updateNr1((e.target as HTMLInputElement).value);
            changeWidth(e.target as HTMLInputElement);
          }}
          autoFocus
        />
        <div className="container fd-column" onClick={changeOperator}>
          <span className={operator ? "active" : "inactive"}>+</span>
          <span className={operator ? "inactive" : "active"}>-</span>
        </div>
        <input
          type="text"
          maxLength={12}
          className={errorY ? "error" : "number"}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            updateNr2((e.target as HTMLInputElement).value);
            changeWidth(e.target as HTMLInputElement);
          }}
        />
      </div>
      <div className="container">
        <span>=</span>
      </div>
      <div className="container">
        <p>{z}</p>
      </div>
    </>
  );
}
