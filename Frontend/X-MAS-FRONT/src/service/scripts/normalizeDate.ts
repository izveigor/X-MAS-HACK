import moment from "moment/moment";

const normalizeDate = (inputDate: string) => {
	  const date = moment(inputDate);
  return date.isValid() ? date.format("YYYY/MM/DD HH:mm") : "Ошибка";
};

export default normalizeDate;
