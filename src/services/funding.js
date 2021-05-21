import axios from "../utils/axios";

export function getAccountFundingList() {
    return axios.get(`/fundings/?trade_type=1`)
    return [
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 110, 'balance': 111020},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
        {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220}
    ]
}
