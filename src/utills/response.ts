export const sendResponse = ({
  res,
  statusCode = 200,
  success = true,
  message = "",
  data = null,
}: {
  res: any;
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: any;
}) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};