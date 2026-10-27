
import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    age: '',
    portfolio: '',
    workshop: '',
  });

  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must contain at least 2 characters.';
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    // Validate phone
    const digits = form.phone.replace(/\D/g, '');

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digits.length < 9 || digits.length > 15) {
      newErrors.phone = 'Phone number must contain 9–15 digits.';
    }

    // Validate date
    if (!form.date) {
      newErrors.date = 'Please select a workshop date.';
    } else if (Number.isNaN(Date.parse(form.date))) {
      newErrors.date = 'Please enter a valid date.';
    }

    // Validate age
    const age = Number(form.age);

    if (form.age === '') {
      newErrors.age = 'Age is required.';
    } else if (!Number.isInteger(age) || age < 16 || age > 100) {
      newErrors.age = 'Age must be a whole number between 16 and 100.';
    }

    // Validate workshop
    if (!form.workshop) {
      newErrors.workshop = 'Please select a workshop.';
    }

    // Validate optional portfolio URL
    if (form.portfolio.trim()) {
      try {
        const url = new URL(form.portfolio.trim());

        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.portfolio =
            'Portfolio URL must start with http:// or https://.';
        }
      } catch {
        newErrors.portfolio = 'Enter a valid portfolio URL.';
      }
    }

    setErrors(newErrors);
    setSuccess('');

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newRegistration = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      id: Date.now(),
    };

    setRegistrations((previous) => [
      ...previous,
      newRegistration,
    ]);

    setSuccess('Registration added successfully!');

    setForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      age: '',
      portfolio: '',
      workshop: '',
    });

    setErrors({});
  }

  function handleRemove(id) {
    setRegistrations((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return (
    <main>
      <h1>Workshop Registration</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          minLength={2}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="error-message" role="alert">
            {errors.name}
          </p>
        )}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="error-message" role="alert">
            {errors.email}
          </p>
        )}

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          pattern="[0-9+() -]{9,20}"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="error-message" role="alert">
            {errors.phone}
          </p>
        )}

        <label htmlFor="date">Workshop Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
        {errors.date && (
          <p id="date-error" className="error-message" role="alert">
            {errors.date}
          </p>
        )}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          min="16"
          max="100"
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && (
          <p id="age-error" className="error-message" role="alert">
            {errors.age}
          </p>
        )}

        <label htmlFor="workshop">Select Workshop</label>
        <select
          id="workshop"
          name="workshop"
          value={form.workshop}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.workshop)}
          aria-describedby={
            errors.workshop ? 'workshop-error' : undefined
          }
        >
          <option value="">Choose a workshop</option>
          <option value="Web Development">Web Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Networking">Networking</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
        {errors.workshop && (
          <p id="workshop-error" className="error-message" role="alert">
            {errors.workshop}
          </p>
        )}

        <label htmlFor="portfolio">Portfolio URL (Optional)</label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="https://example.com"
          aria-invalid={Boolean(errors.portfolio)}
          aria-describedby={
            errors.portfolio ? 'portfolio-error' : undefined
          }
        />
        {errors.portfolio && (
          <p id="portfolio-error" className="error-message" role="alert">
            {errors.portfolio}
          </p>
        )}

        <button type="submit">Register</button>
      </form>

      {success && (
        <p className="success-message" role="status">
          {success}
        </p>
      )}

      <h2>Registered Participants</h2>

      {registrations.length === 0 ? (
        <p>No participants registered yet.</p>
      ) : (
        <div className="registration-list">
          {registrations.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.name}</h3>

              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
              <p>
                <strong>Workshop date:</strong> {item.date}
              </p>
              <p>
                <strong>Age:</strong> {item.age}
              </p>
              <p>
                <strong>Workshop:</strong> {item.workshop}
              </p>

              {item.portfolio && (
                <p>
                  <strong>Portfolio:</strong>{' '}
                  <a
                    href={item.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit portfolio
                  </a>
                </p>
              )}

              <button
                type="button"
                onClick={() => handleRemove(item.id)}
              >
                Remove participant
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
