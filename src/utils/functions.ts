import { Href, router } from "expo-router";
import { icons } from "@/src/constants/icons";
import { TransactionType } from "../models/shared";

export const goTo = (href: Href | string, params: any) => {
  router.push({ pathname: href, params });
};

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
export const dateFormatter = (date: string) => {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  return `${day} de ${months[month]}, ${year}`;
};

const pickTransactionTypeIcon = (type: TransactionType) => {
  if (type === TransactionType.DEPOSIT) {
    return icons.deposit;
  } else if (type === TransactionType.WITHDRAW) {
    return icons.withdraw;
  }

  return icons.transfer;
};

export const utils = {
  pickTransactionTypeIcon,
};
