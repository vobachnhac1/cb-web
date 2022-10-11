// Lấy giá trị store
export const getStateMonitorRealtime = (state) => {
  const { dashboard: { listDWM = [] } } = state;
  return listDWM.map(item => ({
    ...item,
    total_record: parseInt(item.total_record)
  }));
};

export const getStateMonitorDWM = (state) => {
  const { dashboard: { listInit = [] } } = state;
  return listInit.map(item => ({
    ...item,
    percent_init: parseFloat(item.percent_init),
    percent_after_generate: parseFloat(item.percent_after_generate),
    suggest_total_reward_rules: parseFloat(item.suggest_total_reward_rules)
  }));
};

export const getStateMonitorRewardRecievedStateTotal = (state) => {
  const { dashboard: { listRewardRecieved = [] } } = state;
  // console.log('listRewardRecieved: ', listRewardRecieved);
  if (listRewardRecieved && listRewardRecieved.length == 0) {
    return {
      total: 0
    }
  }
  return listRewardRecieved.map(item => ({
    ...item,
    total: parseFloat(item.total)
  })).find(item => item.id == "TOTAL");
};

export const getStateMonitorRewardRecieved = (state) => {
  const { dashboard: { listRewardRecieved = [] } } = state;
  let record = listRewardRecieved.find(item => item.id == "TOTAL");
  return listRewardRecieved.filter(item => item.id != "TOTAL").map(item => ({
    ...item,
    total: parseFloat(item.total),
    percent: parseFloat(((item.total / record.total) * 100).toFixed(2))
  }));
};