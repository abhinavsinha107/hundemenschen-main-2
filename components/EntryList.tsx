// components/EntryList.js
import React from 'react';
import PropTypes from 'prop-types';

export default function EntryList({ entries }) {
  if (!entries || entries.length === 0) {
    return <p>No entries available. Click on "+ Add Entry" to add a new one!</p>;
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <h3>{entry.name || 'Unknown Medicine'}</h3>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Type:</strong> {entry.type}</p>
          {entry.manufacturer && <p><strong>Manufacturer:</strong> {entry.manufacturer}</p>}
          {entry.form && <p><strong>Form:</strong> {entry.form}</p>}
          {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
        </div>
      ))}
    </div>
  );
}

// Define PropTypes to ensure the component gets the right data
EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      manufacturer: PropTypes.string,
      form: PropTypes.string,
      notes: PropTypes.string,
    })
  ).isRequired,
};
