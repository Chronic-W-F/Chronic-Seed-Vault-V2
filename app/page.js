"use client";

import { useState } from "react";

const emptyForm = {
  breeder: "",
  strain: "",
  lineage: "",
  type: "Photoperiod",
  sex: "Unknown",
  generation: "",
  quantity: "",
  notes: "",
};

export default function Home() {
  const [intakeStep, setIntakeStep] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [testComplete, setTestComplete] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openIntake() {
    setTestComplete(false);
    setIntakeStep("form");
  }

  function closeIntake() {
    setIntakeStep(null);
  }

  function goToReview(event) {
    event.preventDefault();
    setIntakeStep("review");
  }

  function confirmTestImport() {
    setTestComplete(true);
    setIntakeStep(null);
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
          onClick={openIntake}
        >
          + Add Seeds
        </button>
      </header>

      {testComplete && (
        <section className="status-card">
          <div className="eyebrow">
            INTAKE FLOW TEST COMPLETE
          </div>

          <h2>Review confirmed</h2>

          <p>
            The intake and review workflow is working correctly.
            This test record was not permanently saved.
          </p>
        </section>
      )}

      {!testComplete && (
        <section className="status-card">
          <div className="eyebrow">
            V2 FOUNDATION
          </div>

          <h2>Your seed vault</h2>

          <p>
            Genetics and physical inventory are kept separate so one
            genetic record can have multiple inventory lots, sources,
            quantities, and storage locations.
          </p>
        </section>
      )}

      <section className="dashboard-grid">
        <button className="dashboard-card" type="button">
          <strong>Genetics</strong>
          <span>0 records</span>
        </button>

        <button className="dashboard-card" type="button">
          <strong>Inventory Lots</strong>
          <span>0 lots</span>
        </button>

        <button className="dashboard-card" type="button">
          <strong>Cases</strong>
          <span>0 assigned</span>
        </button>
      </section>

      <nav className="bottom-nav">
        <button className="active" type="button">
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

      {intakeStep === "form" && (
        <div className="modal-backdrop">
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
                onClick={closeIntake}
              >
                ×
              </button>
            </div>

            <form
              className="seed-form"
              onSubmit={goToReview}
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
                    <option>Photoperiod</option>
                    <option>Autoflower</option>
                    <option>Unknown</option>
                  </select>
                </label>

                <label>
                  Sex

                  <select
                    name="sex"
                    value={form.sex}
                    onChange={updateField}
                  >
                    <option>Unknown</option>
                    <option>Regular</option>
                    <option>Feminized</option>
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
                  onClick={closeIntake}
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

      {intakeStep === "review" && (
        <div className="modal-backdrop">
          <section className="intake-modal">
            <div className="modal-header">
              <div>
                <div className="eyebrow">
                  REVIEW INTAKE
                </div>

                <h2>Confirm Seed Entry</h2>
              </div>

              <button
                className="close-button"
                type="button"
                aria-label="Close"
                onClick={closeIntake}
              >
                ×
              </button>
            </div>

            <div className="seed-form">
              <ReviewField
                label="Breeder"
                value={form.breeder || "Unknown"}
              />

              <ReviewField
                label="Strain Name"
                value={form.strain}
              />

              <ReviewField
                label="Lineage"
                value={form.lineage || "Unknown"}
              />

              <div className="form-row">
                <ReviewField
                  label="Type"
                  value={form.type}
                />

                <ReviewField
                  label="Sex"
                  value={form.sex}
                />
              </div>

              <div className="form-row">
                <ReviewField
                  label="Generation"
                  value={form.generation || "Unknown"}
                />

                <ReviewField
                  label="Quantity"
                  value={
                    form.quantity === ""
                      ? "Not entered"
                      : form.quantity
                  }
                />
              </div>

              <ReviewField
                label="Notes"
                value={form.notes || "None"}
              />

              <div className="form-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setIntakeStep("form")}
                >
                  Back / Edit
                </button>

                <button
                  className="primary-button"
                  type="button"
                  onClick={confirmTestImport}
                >
                  Confirm Import
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function ReviewField({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #3f4549",
        borderRadius: "9px",
        background: "#101214",
        padding: "13px 14px",
      }}
    >
      <div
        style={{
          color: "#92999e",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "1px",
          marginBottom: "6px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#f4f5f6",
          lineHeight: "1.4",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
                      }
