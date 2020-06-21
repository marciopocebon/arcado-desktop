import AccountModel, { IAccount } from '../../models/account.model';
import { Dispatch } from '../store';
import { message } from 'antd';
import { usersApi } from '../../shared/services/users';
import { isObjectWithFields } from '../../shared/utils/type-checking';

const initialState = {
  account: new AccountModel(undefined),
  isAuthenticated: false
}

export type SessionState = {
  account: IAccount,
  isAuthenticated: boolean
}

export const session = {
  state: initialState,
  reducers: {
    setAccountState: (state: SessionState, payload: IAccount) => {
      return {
        ...state,
        account: payload,
        isAuthenticated: (isObjectWithFields(payload) && payload.address)
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async authenticate ({ email, passphrase }: any) {
      try {
        const result = await usersApi.authenticate(email, passphrase);
        dispatch.session.setAccount(result)
      } catch (e) {
        message.error('authentication failed | Dummy profile set')
      }
    },
    setAccount (account: AccountModel) {
      dispatch.session.setAccountState(account);
    },
    logout () {
      dispatch.session.setAccount(new AccountModel(undefined))
    }
  }),
};
