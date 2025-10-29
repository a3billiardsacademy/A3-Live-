import Link from 'next/link'
export default function Home(){
  return (
    <div className="container">
      <header>
        <h1>A3 Billiards Academy</h1>
      </header>
      <p>Book a snooker table online. 8 tables available. ₹320/hour.</p>
      <div className="card">
        <h3>Quick links</h3>
        <p>
          <Link href="/book"><button className="btn">Book a Table</button></Link>
          {' '}
          <Link href="/admin"><button className="btn" style={{background:'#22c55e'}}>Admin</button></Link>
        </p>
      </div>
    </div>
  )
}
