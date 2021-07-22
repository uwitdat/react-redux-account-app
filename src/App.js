import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './state/index'
import { useState } from 'react'
import moment from 'moment';


function App() {
  const day = new Date()

  const account = useSelector((state) => state.account)
  const dispatch = useDispatch()
  const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch)

  const [deposit, setDeposit] = useState(0)
  const [withdraw, setWithdraw] = useState(0)
  const [errMsg, setErrMsg] = useState(false)

  const [pastDeposit, setPastDeposit] = useState([
    { amt: 0, date: '' }
  ])

  const [pastWithdrawl, setPastWithdrawl] = useState([
    { amt: 0, date: '' }
  ])

  const depositAmt = () => {
    depositMoney(deposit)
    setDeposit(0)
    setErrMsg(false)
    return deposit === 0 ? null : setPastDeposit(depositArray => [...depositArray, { amt: deposit, date: moment(day).format('dddd, MMMM Do YYYY, h:mm a') }])
  }



  const withdrawAmt = () => {
    if (withdraw > account) {
      setErrMsg(true);
      setWithdraw(0)
    } else {
      withdrawMoney(withdraw)
      setWithdraw(0)
      return withdraw === 0 ? null : setPastWithdrawl(withdrawArray => [...withdrawArray, { amt: withdraw, date: moment(day).format('dddd, MMMM Do YYYY, h:mm a') }])
    }

  }

  return (
    <div className="App">
      <h1 className='balance'>Account Balance: ${account}</h1>
      {errMsg === true ? <h3 className='alert'>You cannot withdraw more than ${account}</h3> : ''}

      <input
        type='number'
        value={deposit}
        className='input'
        onChange={(e) => setDeposit(parseInt(e.target.value))}
      />

      <button
        className='btn'
        onClick={depositAmt}>Deposit</button>

      <br />

      <input
        type='number'
        value={withdraw}
        className='input'
        onChange={(e) => setWithdraw(parseInt(e.target.value))}
      />

      <button
        className='btn'
        onClick={withdrawAmt}>Withdraw</button>

      <section className='past-deposits'>
        <h1>Past Deposits:</h1>

        {pastDeposit.map((p, i) => (
          <div key={i}>
            {p.amt === 0 ? null : <div className='div' ><span className='date'>{p.date}</span> <p className='amt'>${p.amt}</p></div>}
          </div>
        ))}
      </section>

      <section className='past-withdrawls'>
        <h1>Past Withdrawls:</h1>
        {pastWithdrawl.map((p, i) => (
          <div key={i}>
            {p.amt === 0 ? null : <div className='div' ><span className='date'>{p.date}</span> <p className='amt'>${p.amt}</p></div>}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
