import { useState } from 'react'
import { useRouter } from 'next/router'

const TABLES = Array.from({length:8}, (_,i)=>i+1)
const RATE = 320

export default function Book(){
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [table, setTable] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [hours, setHours] = useState(1)
  const [discount, setDiscount] = useState(0)

  const total = +(RATE * hours * (1 - discount/100)).toFixed(2)

  function handleProceed(){
    if(!name || !phone || !date) { alert('Please fill name, phone and date'); return }
    const booking = {
      id: 'bk_' + Date.now(),
      name, phone, table, date, time, hours, discount, total, createdAt: new Date().toISOString(), status:'pending', whatsappSent:false
    }
    // save to localStorage bookings array
    const existing = JSON.parse(localStorage.getItem('a3_bookings') || '[]')
    existing.push(booking)
    localStorage.setItem('a3_bookings', JSON.stringify(existing))
    // pass booking id to payment page
    router.push('/payment?id=' + booking.id)
  }

  return (
    <div className="container">
      <h2>Book a Table</h2>
      <div className="card">
        <label>Your name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <label>Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Mobile number" />
        <label>Select table</label>
        <select value={table} onChange={e=>setTable(Number(e.target.value))}>
          {TABLES.map(t=> <option key={t} value={t}>Table {t}</option>)}
        </select>
        <label>Date</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <label>Start time</label>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
        <label>Duration (hours)</label>
        <input type="number" min="1" value={hours} onChange={e=>setHours(Number(e.target.value))} />
        <label>Discount</label>
        <select value={discount} onChange={e=>setDiscount(Number(e.target.value))}>
          <option value="0">No discount</option>
          <option value="5">5% discount</option>
          <option value="8">8% discount</option>
        </select>
        <p style={{marginTop:10}}>Price per hour: ₹{RATE}. Total: <strong>₹{total}</strong></p>
        <button className="btn" onClick={handleProceed}>Proceed to Payment</button>
      </div>
    </div>
  )
}
