// Lấy giá trị store

export const getContentReward = (state) => {
  const { wheelreward: { body: data } } = state;
  const arrContentReward = data.listContentReward;
  if (!arrContentReward) return [];
  return arrContentReward.map((item) => ({
    no: item.no,
    remain_value: item.remain_value,
    segment_name: item.segment_name,
    segment_value: item.segment_value,
    wheel_detail_id: item.wheel_detail_id,
    wheel_name: item.wheel_name,
  }))
};

export const getProccessing = ({ wheelreward }) => {
  const { process: data = {} } = wheelreward;
  return data;
};


/// lấy state
