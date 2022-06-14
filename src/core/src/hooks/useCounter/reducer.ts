export type State = {
  count: number;
  isCounting: boolean;
  canStart: boolean;
};
export const initialState: State = {
  count: 0,
  isCounting: false,
  canStart: false,
};

export const getInitialState = (start: number) => {
  return {
    ...initialState,
    count: start,
  };
};

type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case "START":
      return {
        ...state,
        isCounting: true,
        canStart: true,
        count: actions.payload,
      };
    case "STOP":
      return {
        ...state,
        isCounting: false,
        canStart: false,
      };
    case "RESET":
      return {
        ...state,
        isCounting: false,
        canStart: false,
        count: actions.payload,
      };
    case "DECREMENT":
      return {
        ...state,
        isCounting: true,
        count: actions.payload,
      };
    default:
      return state;
  }
};

export const onStart = (count: number): Action => ({
  type: "START",
  payload: count,
});

export const onStop = (): Action => ({
  type: "STOP",
});

export const onDecrement = (count: number): Action => ({
  type: "DECREMENT",
  payload: count,
});

export const onReset = (count: number): Action => ({
  type: "RESET",
  payload: count,
});
