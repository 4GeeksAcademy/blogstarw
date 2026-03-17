export const Footer = () => (
  <footer style={{ backgroundColor: "rgba(0,0,0,0.85)", borderTop: "2px solid #FFE81F", color: "white" }}
    className="py-4 mt-5 text-center">
    <div className="container">
      <p style={{ color: "#FFE81F", fontSize: "1.1rem", marginBottom: "0.3rem" }}>
        ⭐ May the Force be with you ⭐
      </p>
      <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
        Data provided by <a href="https://www.swapi.tech" target="_blank" rel="noreferrer" style={{ color: "#FFE81F" }}>SWAPI.tech</a>
      </p>
      <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
        Made with ❤️ by <a href="http://www.4geeksacademy.com" target="_blank" rel="noreferrer" style={{ color: "#FFE81F" }}>4Geeks Academy</a>
      </p>
    </div>
  </footer>
);