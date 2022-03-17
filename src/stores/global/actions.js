import * as TYPES from './type';

// hàm thị thi nội bộ
const incrementCounterDispatch = (payload) => ({
  type: TYPES.INCREMENT_COUNTER,
  payload
});
const decrementCounterDispatch = (payload) => ({
  type: TYPES.DECREMENT_COUNTER,
  payload
});

// hàm xử lý được gọi từ bên ngoài
export const incrementCounter =
  (incrementState) =>
    async (dispatch, getState, { $http }) => {
      const {
        global: { counter }
      } = getState();
      // test 2 api
      $http.setAccessToken(
        'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJhZG1pbiIsInN1YiI6IkFkbWluIiwiaWF0IjoxNjQ0OTgzNDUzLCJleHAiOjQ3OTg1ODM0NTN9.vD6p2KOruEmZglbWoLChu0_1v3QW2Pw9H7SYepXOpxW0Rgg8krye6NbFbL7-xqxytdR2s7fbvME0DmZiS5JQog'
      );
      const response = await $http.get('mobile-api/get-ocr?page=1');

      console.log('getState:', counter);
      const increase = incrementState + 1;
      return dispatch(incrementCounterDispatch(increase));
    };

export const decrementCounter = (decrementState) => (dispatch) => {
  const decrease = decrementState - 1;
  return dispatch(decrementCounterDispatch(decrease));
};
