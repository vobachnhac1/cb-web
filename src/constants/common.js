export const STATE_WHEEL = {
  NEW :'NEW',   // TẠO MỚI
  EDIT :'EDIT', // ĐÃ THÊM GIẢI THƯỞNG THÀNH CÔNG
  SAVE :'SAVE', // NỘP CHUYỂN BƯỚC THÊM QUY TẮC
  RULE :'RULE', // ĐÃ THÊM QUY TẮC CHUYỂN BƯỚC PHÊ DUYỆT
  APR :'APR',   // ĐÃ PHÊ DUYỆT VÀ CHỜ SỬ DỤNG
  START :'START', // VÒNG QUAY ĐANG DIỄN RA
  APRO :'APRO', // HÊT HIỆU LỰC QUY TẮC CHỜ THÊM QUY TẮC MỚI
  APRR :'APRR', // ĐÃ THỰC HIỆN THÊM QUY TẮC MỚI
  FINS :'FINS', // KẾT THÚC CHƯƠNG TRÌNH
  STOP :'STOP', // NGỪNG KHẨN CẤP
}

// danh sách trao thưởng
export const STATE_REWARD = [
  {
    id: 'NONE',
    value: 'Tất cả'
  }, {
    id: 'NEW',
    value: 'Mới'
  }, {
    id: 'IN-PROGRESS',
    value: 'Đang xử lý'
  }, {
    id: 'FINISHED',
    value: 'Đã trao giải'
  }
];

export const STATE_FOR_CONTROL = [
 {
    id: 'SEND_TO_ACCOUNTANT',
    value: 'Kế toán phê duyệt'
  }, {
    id: 'SEND_TO_ADMIN',
    value: 'Vận Hành'
  }, {
    id: 'FINISHED',
    value: 'Kết thúc'
  }, {
    id: 'ERROR_1',
    value: 'Giải ngân thiếu'
  }
];

// danh sách trao thưởng
export const TYPE_REWARD = [
  'Tất cả',
   'Trúng lượt',
   'Lời chúc',
   'Tiền mặt/quà tặng',
]
