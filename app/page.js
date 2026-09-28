"use client";

import { useState } from "react";

export default function Home() {
  const [showAddSeeds, setShowAddSeeds] = useState(false);

  const [form, setForm] = useState({
    breeder: "",
    strain: "",
    lineage: "",
    type: "Photoperiod",
    sex: "Unknown",
    generation: "",
    quantity: "",
    notes: "",
  });

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Seed intake draft:", form);

    alert(
      `Draft ready: ${form.breeder ? `${form.breeder} — ` : ""}${form.strain}`
    );

    setShowAddSeeds(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand-kicker">
            CHRONIC WORM GENETICS
          </div>

          <h1>Chronic Seed Vault V2</h1>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => setShowAddSeeds(true)}
        >
          + Add Seeds
        </button>
      </header>

      <section className="status-card">
        <div className="eyebrow">V2 FOUNDATION</div>

        <h2>Your seed vault</h2>

        <p>
          Genetics and physical inventory are kept separate so one genetic
          record can have multiple inventory lots, sources, quantities, and
          storage locations.
        </p>
      </section>

      <section className="dashboard-grid">
        <button
          className="dashboard-card"
          type="button"
        >
          <strong>Genetics</strong>
          <span>0 records</span>
        </button>

        <button
          className="dashboard-card"
          type="button"
        >
          <strong>Inventory Lots</strong>
          <span>0 lots</span>
        </button>

        <button
          className="dashboard-card"
          type="button"
        >
          <strong>Cases</strong>
          <span>0 assigned</span>
        </button>
      </section>

      <nav className="bottom-nav">
        <button
          className="active"
          type="button"
        >
          Home
        </button>

        <button type="button">
          Vault
        </button>

        <button type="button">
          Cases
        </button>

        <button type="button">
          Trade
        </button>

        <button type="button">
          Settings
        </button>
      </nav>

      {showAddSeeds && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddSeeds(false);
            }
          }}
        >
          <section className="intake-modal">
            <div className="modal-header">
              <div>
                <div className="eyebrow">
                  NEW INTAKE
                </div>

                <h2>Add Seeds</h2>
              </div>

              <button
                className="close-button"
                type="button"
                aria-label="Close"
                onClick={() => setShowAddSeeds(false)}
              >
                ×
              </button>
            </div>

            <form
              className="seed-form"
              onSubmit={handleSubmit}
            >
              <label>
                Breeder

                <input
                  name="breeder"
                  value={form.breeder}
                  onChange={updateField}
                  placeholder="Unknown is allowed"
                />
              </label>

              <label>
                Strain Name *

                <input
                  name="strain"
                  value={form.strain}
                  onChange={updateField}
                  placeholder="Required"
                  required
                />
              </label>

              <label>
                Lineage

                <input
                  name="lineage"
                  value={form.lineage}
                  onChange={updateField}
                  placeholder="Parent × Parent"
                />
              </label>

              <div className="form-row">
                <label>
                  Type

                  <select
                    name="type"
                    value={form.type}
                    onChange={updateField}
                  >
                    <option>
                      Photoperiod
                    </option>

                    <option>
                      Autoflower
                    </option>

                    <option>
                      Unknown
                    </option>
                  </select>
                </label>

                <label>
                  Sex

                  <select
                    name="sex"
                    value={form.sex}
                    onChange={updateField}
                  >
                    <option>
                      Unknown
                    </option>

                    <option>
                      Regular
                    </option>

                    <option>
                      Feminized
                    </option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Generation

                  <input
                    name="generation"
                    value={form.generation}
                    onChange={updateField}
                    placeholder="F1, F2, S1..."
                  />
                </label>

                <label>
                  Quantity

                  <input
                    name="quantity"
                    value={form.quantity}
                    onChange={updateField}
                    type="number"
                    min="0"
                    inputMode="numeric"
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label>
                Notes

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={updateField}
                  placeholder="Optional notes"
                  rows="4"
                />
              </label>

              <div className="form-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setShowAddSeeds(false)}
                >
                  Cancel
                </button>

                <button
                  className="primary-button"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
                      }
