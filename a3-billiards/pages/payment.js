import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Payment(){
  const router = useRouter()
  const { id } = router.query
  const [booking, setBooking] = useState(null)

  useEffect(()=>{
    if(!id) return
    const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]')
    const b = arr.find(x=>x.id===id)
    if(b) setBooking(b)
  },[id])

  if(!booking) return <div className="container"><p>Loading booking...</p></div>

  const whatsappNumber = '917867860716' // +91 78678 60716
  const text = encodeURIComponent(`Hi A3 Billiards Academy team. I have booked a table. Booking ID: ${booking.id} Name: ${booking.name} Date: ${booking.date} Time: ${booking.time} Table: ${booking.table} Amount: ₹${booking.total}`)
  const waLink = `https://wa.me/${whatsappNumber}?text=${text}`

  function markWhatsappSent(){
    const arr = JSON.parse(localStorage.getItem('a3_bookings')||'[]')
    const idx = arr.findIndex(x=>x.id===booking.id)
    if(idx>=0){ arr[idx].whatsappSent = true; localStorage.setItem('a3_bookings', JSON.stringify(arr)); setBooking({...booking, whatsappSent:true}); alert('Marked as whatsapp sent. You will receive confirmation from admin.'); }
  }

  return (
    <div className="container">
      <h2>Payment</h2>
      <div className="card">
        <p>Scan the QR code below using your UPI app and pay <strong>₹{booking.total}</strong></p>
        <img src="/qr.jpg" alt="UPI QR" style={{maxWidth:320, width:'100%'}} />
        <p style={{marginTop:8}}>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <button className="btn">Send Screenshot on WhatsApp</button>
          </a>
          {' '}
          <button onClick={markWhatsappSent} style={{marginLeft:8}} className="btn">I have sent screenshot (Mark sent)</button>
        </p>
        <p style={{marginTop:12}}>
          After you send the screenshot on WhatsApp to A3 Billiards Academy, an admin will confirm your booking.
        </p>
      </div>
    </div>
  )
}
