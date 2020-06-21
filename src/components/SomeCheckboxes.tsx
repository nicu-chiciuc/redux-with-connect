import React from "react";
import { connect } from "react-redux";
import { StoreType } from "../redux";
import { toggleCheckBox } from "../redux/ReduxCheckboxes";

type Props = {
  check1: boolean;
  check2: boolean;
  check3: boolean;
  checkSomething: (value: 1 | 2 | 3) => void;
};

function SomeCheckboxes(props: Props) {
  return (
    <div>
      <label>
        Check1:
        <input
          type="checkbox"
          checked={props.check1}
          onChange={() => props.checkSomething(1)}
        />
      </label>

      <label>
        Check2:
        <input
          type="checkbox"
          checked={props.check2}
          onChange={() => props.checkSomething(2)}
        />
      </label>

      <label>
        Check3:
        <input
          type="checkbox"
          checked={props.check3}
          onChange={() => props.checkSomething(3)}
        />
      </label>
    </div>
  );
}

export default connect(
  (store: StoreType) => ({
    check1: store.checkboxes.state === "first",
    check2: store.checkboxes.state === "second",
    check3: store.checkboxes.state === "third",
  }),
  {
    checkSomething: toggleCheckBox,
  }
)(SomeCheckboxes);
