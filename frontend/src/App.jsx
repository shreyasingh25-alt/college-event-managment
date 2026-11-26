
import "./App.css";
import { useEffect, useState } from "react";
import { getEvents, createEvent } from "./services/testAPI";

const initialFormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  category: "",
  image: "",
  organizer: "",
};

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (error) {
      console.log("Error fetching events:", error.message);
      setMessage("Unable to fetch events.");
    }
  };

  
  useEffect(() => {
    fetchEvents();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(formData.date)) {
      setMessage("Enter date in YYYY-MM-DD format.");
      return;
    }

    
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i;

    if (!timePattern.test(formData.time)) {
      setMessage("Enter time like 10:30 AM or 02:00 PM.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createEvent(formData);

      setMessage("Event created successfully!");

      setFormData({ ...initialFormData });

      await fetchEvents();
    } catch (error) {
      console.log("Error creating event:", error);

      setMessage(
        error.response?.data?.message || "Failed to create event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>College Event Management System</h1>

      <h2>Add New Event</h2>

      <form onSubmit={handleSubmit}>
        {/* Event Title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Event Description */}
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Event Date */}
        <label>Event Date (YYYY-MM-DD)</label>

        <input
          type="text"
          name="date"
          placeholder="Example: 2026-12-15"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Event Time */}
        <label>Event Time (HH:MM AM/PM)</label>

        <input
          type="text"
          name="time"
          placeholder="Example: 10:30 AM"
          value={formData.time}
          onChange={handleChange}
          required
        />

        {/* Event Venue */}
        <input
          type="text"
          name="venue"
          placeholder="Event Venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        {/* Event Category */}
        <input
          type="text"
          name="category"
          placeholder="Event Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        {/* Event Image */}
        <input
          type="url"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />

        {/* Event Organizer */}
        <input
          type="text"
          name="organizer"
          placeholder="Organizer Name"
          value={formData.organizer}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>

      <p>{message}</p>

      <hr />

      {/* All Events */}
      <h2>All Events</h2>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3>{event.title}</h3>

            <p>{event.description}</p>

            <p>Date: {String(event.date).slice(0, 10)}</p>

            <p>Time: {event.time}</p>

            <p>Venue: {event.venue}</p>

            <p>Category: {event.category}</p>

            <p>Organizer: {event.organizer}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
