import { unreachable } from "../utils";

export type CheckboxState = "none" | "first" | "second" | "third";

export type CheckboxesStore = {
  state: CheckboxState;
};

export type CheckoxesMessages =
  | {
      type: "CHECKBOX/TOGGLE_FIRST";
    }
  | {
      type: "CHECKBOX/TOGGLE_SECOND";
    }
  | {
      type: "CHECKBOX/TOGGLE_THIRD";
    }
  | {
      type: "CHECKBOX/UNCHECK_ALL";
    };

export function checkboxReducer(
  store: CheckboxesStore = { state: "none" },
  message: CheckoxesMessages
): CheckboxesStore {
  switch (message.type) {
    case "CHECKBOX/TOGGLE_FIRST": {
      return {
        state: "first",
      };
    }

    case "CHECKBOX/TOGGLE_SECOND": {
      return {
        state: "second",
      };
    }

    case "CHECKBOX/TOGGLE_THIRD": {
      return {
        state: "third",
      };
    }

    case "CHECKBOX/UNCHECK_ALL": {
      return {
        state: "none",
      };
    }

    default: {
      unreachable(message);
      return store;
    }
  }
}

// Actions creators
export function toggleCheckBox(number: 1 | 2 | 3): CheckoxesMessages {
  switch (number) {
    case 1:
      return {
        type: "CHECKBOX/TOGGLE_FIRST",
      };
    case 2:
      return {
        type: "CHECKBOX/TOGGLE_SECOND",
      };
    case 3:
      return {
        type: "CHECKBOX/TOGGLE_THIRD",
      };
    default: {
      unreachable(number);
      return {
        type: "CHECKBOX/UNCHECK_ALL",
      };
    }
  }
}
