import React, { useState } from 'react';
import { Header } from '../components/Header'; // Update the path as per your folder structure

const CareerForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resume, setResume] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submitted'); // Placeholder action for form submission
  };

  return (
    <>
      <style>
        {`
          :root {
            --clr-neon: #39ff14;
            --clr-bg: #333;
          }
          .neon-button {
            font-size: 1.25rem;
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            color: var(--clr-neon);
            border: var(--clr-neon) 0.125em solid;
            padding: 0.5em 1em;
            border-radius: 0.25em;
            text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
            box-shadow: inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon);
            position: relative;
            transition: color 0.3s, background-color 0.3s;
          }
          .neon-button::before {
            pointer-events: none;
            content: "";
            position: absolute;
            background: var(--clr-neon);
            top: 120%;
            left: 0;
            width: 100%;
            height: 100%;
            transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
            filter: blur(1em);
            opacity: 0.7;
          }
          .neon-button::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 0 0 2em 0.5em var(--clr-neon);
            opacity: 0;
            background-color: var(--clr-neon);
            z-index: -1;
            transition: opacity 100ms linear;
          }
          .neon-button:hover,
          .neon-button:focus {
            color: var(--clr-bg);
            text-shadow: none;
          }
          .neon-button:hover::before,
          .neon-button:focus::before {
            opacity: 1;
          }
          .neon-button:hover::after,
          .neon-button:focus::after {
            opacity: 1;
          }

        //   .file-input-wrapper {
        //     position: relative;
        //     width: 100%;
        //   }

        //   .file-input {
        //     position: absolute;
        //     opacity: 0;
        //     width: 100%;
        //     height: 100%;
        //     cursor: pointer;
        //   }

        //   .file-label {
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     background: #333;
        //     color: #39ff14;
        //     border-radius: 0.25em;
        //     padding: 0.5em 1em;
        //     cursor: pointer;
        //     text-align: center;
        //     font-weight: bold;
        //     transition: 0.3s;
        //     box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
        //   }

        //   .file-label:hover {
        //     box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
        //   }
        `}
      </style>

      <Header title="Career Application" burger={true} basket={true} line={true} />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Submit Your Application</h2>

        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Resume</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              className="neon-button"
              onChange={(e) => {
                if (e.target.files) {
                  setResume(e.target.files[0]);
                }
              }}
              accept=".pdf,.docx"
              required
            />
            <label className="file-label">Choose Resume</label>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Interview Video</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              className="neon-button"
              onChange={(e) => {
                if (e.target.files) {
                  setVideo(e.target.files[0]);
                }
              }}
              accept="video/*"
              required
            />
            <label className="file-label">Upload Video</label>
          </div>
        </div>

        <button type="submit" className="neon-button">Submit Application</button>
      </form>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#020202',
  },
  heading: {
    textAlign: 'center' as 'center',
    marginBottom: '20px',
    color: 'rgb(0, 255, 0)',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: 'rgb(0, 255, 0)',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none',
    boxSizing: 'border-box' as 'border-box',
  },
};

export default CareerForm;
