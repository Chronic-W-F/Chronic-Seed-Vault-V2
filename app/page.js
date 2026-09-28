const navItems = ["Home", "Vault", "Cases", "Trade", "Settings"];

export default function HomePage() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CHRONIC WORM GENETICS</p>
          <h1>Chronic Seed Vault V2</h1>
        </div>
        <button className="add-button" type="button">+ Add Seeds</button>
      </header>

      <section className="panel">
        <p className="status">V2 PROOF OF CONCEPT</p>
        <h2>The new vault is online.</h2>
        <p>
          This is the permanent V2 application foundation. Once this page is
          visible on Vercel, we know the GitHub-to-Vercel build pipeline is working.
        </p>
      </section>

      <section className="grid">
        <article className="card"><strong>Genetics</strong><span>0 records</span></article>
        <article className="card"><strong>Inventory Lots</strong><span>0 lots</span></article>
        <article className="card"><strong>Cases</strong><span>0 assigned</span></article>
      </section>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <span key={item} className={item === "Home" ? "active" : ""}>{item}</span>
        ))}
      </nav>
    </main>
  );
}
