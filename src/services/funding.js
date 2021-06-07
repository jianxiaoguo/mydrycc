import axios from "../utils/axios";

export function getAccountFundingList(trade_type=null, section=null, params='limit=45&offset=0') {
    var url = `/fundings/?`
    // var section=`2021-05-17%2006:01:46,2021-05-30%2006:01:48`
    // var section = null
    if (trade_type && trade_type != 0) {
        url += `trade_type=${trade_type}`
    }
    if (section) {
        url += `&section=${section}`
    }
    if(params){
        url = url + '&' + params
    }
    return axios.get(url)
    // return [
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 110, 'balance': 111020},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'expend', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220},
    //     {'trade_no': '275170226160898', 'trade_time': 1606179600, 'trade_type': 'income', 'bill_no': '275170226160898', 'trade_note':'就扣你钱咋地', 'trade_amount': 211, 'balance': 111220}
    // ]
}

export function dealAccountFundingList(obj) {
    return obj.data.results.map(item => {
        return {
            tradeNo: item.uuid,
            tradeTime: item.created,
            tradeType: item.trade_type == 2 ? "income": "expend",
            billNo: item.bill,
            tradeNote: item.remark,
            tradeAmount: item.trade_credit,
            balance: item.credit,
        }
    })
}
