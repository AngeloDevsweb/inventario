import React from 'react'
import { Link } from "react-router-dom";

const navegacion = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              BETO
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    ALMACEN 1
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/almacendos">
                    ALMACEN 2
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/almacentres">
                    ALMACEN 3
                  </Link>
                </li>

               
                
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default navegacion
