import { useEffect, useState } from 'react'

export default function Admin(){
  const [bookings, setBookings] = useState([])

  useEffect(()=> {
    const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]')
    setBookings(arr.reverse())
  },[])

  function refresh(){ const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]'); setBookings(arr.reverse()) }

  function confirmBooking(id){
    const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]')
    const idx = arr.findIndex(x=>x.id===id)
    if(idx>=0){ arr[idx].status='confirmed'; localStorage.setItem('a3_bookings', JSON.stringify(arr)); refresh(); }
  }

  function cancelBooking(id){
    const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]')
    const idx = arr.findIndex(x=>x.id===id)
    if(idx>=0){ arr.splice(idx,1); localStorage.setItem('a3_bookings', JSON.stringify(arr)); refresh(); }
  }

  return (
    <div className="container">
      <h2>Admin — Bookings</h2>
      <div className="card">
        {bookings.length===0 && <p>No bookings yet.</p>}
        {bookings.length>0 && (
          <table>
            <thead><tr><th>When</th><th>Name</th><th>Phone</th><th>Table</th><th>Date</th><th>Time</th><th>Hours</th><th>Amt</th><th>WhatsApp</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {bookings.map(b=>(
                <tr key={b.id}>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>{b.name}</td>
                  <td>{b.phone}</td>
                  <td>{b.table}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.hours}</td>
                  <td>₹{b.total}</td>
                  <td>{b.whatsappSent ? 'Yes' : 'No'}</td>
                  <td>{b.status}</td>
                  <td>
                    <button className="btn" onClick={()=>confirmBooking(b.id)}>Confirm</button>
                    {' '}
                    <button style={{background:'#ef4444'}} onClick={()=>cancelBooking(b.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
