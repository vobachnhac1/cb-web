// Lấy giá trị store

export const getContentReward = (state) => {
  const { wheelreward: { body: data } } = state;
  const arrContentReward = data?.listContentReward;
  if (!arrContentReward) return [];
  return arrContentReward?.map((item) => ({
    no: item.no,
    imgBase64: item.imgBase64,
    remain_value: item.remain_value,
    segment_name: item.segment_name,
    segment_value: item.segment_value,
    wheel_color: item.wheel_color,
    wheel_detail_id: item.wheel_detail_id,
    wheel_name: item.wheel_name,
  }))
};

export const getProccessing = ({ wheelreward }) => {
  const { process: data = {} } = wheelreward;
  return data;
};

export const getEventInfo = ({ wheelreward }) => {
  const { event_info: data = {} } = wheelreward;
  return data;
};
export const getCustomerInfo = ({ wheelreward }) => {
  return wheelreward?.customerProfile;
};



/// lấy state
