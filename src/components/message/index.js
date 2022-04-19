import { notification } from 'antd';

export const Success = (title, content) => {
  notification['success']({
    message: title,
    description: content
  });
};

export const Error = (title, content) => {
  notification['error']({
    message: title,
    description: content
  });
};

export const Info = (title, content) => {
  notification['info']({
    message: title,
    description: content
  });
};

export const Warning = (title, content) => {
  notification['warning']({
    message: title,
    description: content
  });
};

export const WarningArr = (title, content) => {
  notification['warning']({
    message: title,
    description: (
      <>
        {content.map(item => {
          return (
            <>
              {item + '.'}<br />
            </>
          );
        })}
      </>
    )
  });
};

export const InfoArr = (title, content) => {
  notification['info']({
    message: title,
    description: (
      <>
        {content.map(item => {
          return (
            <>
              {item + '.'}<br />
            </>
          );
        })}
      </>
    )
  });
};

export const ErrorArr = (title, content) => {
  notification['error']({
    message: title,
    description: (
      <>
        {content.map(item => {
          return (
            <>
              {item + '.'}<br />
            </>
          );
        })}
      </>
    )
  });
};

export const SuccessArr = (title, content) => {
  notification['success']({
    message: title,
    description: (
      <>
        {content.map(item => {
          return (
            <>
              {item + '.'}<br />
            </>
          );
        })}
      </>
    )
  });
};