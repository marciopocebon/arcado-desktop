import { API_BASE_URI, request } from './request';
import AccountModel from '../../models/account.model';
import { fromRawLsk } from '../utils/lsk';
import { isObjectWithFields } from '../utils/type-checking';

const URI = `${API_BASE_URI}/accounts`

export const getAccount = async (address: string) => {
  const { data } = await request({
    url: `${URI}/${encodeURI(address)}`,
    method: 'GET'
  });
  if (isObjectWithFields(data)) {
    const account = new AccountModel(data);
    account.balance = fromRawLsk(Number(account.balance));
    return account;
  } else {
    return undefined;
  }
};

export const addFundsToAccount = async (address: string) => {
  return request({
    url: `${URI}/${encodeURI(address)}/funds`,
    method: 'POST'
  });
};
