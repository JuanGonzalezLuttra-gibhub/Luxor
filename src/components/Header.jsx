import React from "react";
import { Link } from "react-router-dom";
import logo from "../Recursos/LuxorLogo.png";

const Header = () => {
    return (
        <header
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 100,
                padding: "2rem 0",
                background: "transparent",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={logo}
                        alt="Luxor Car Rental Logo"
                        style={{
                            height: "65px",
                            width: "auto",
                            objectFit: "contain",
                        }}
                    />
                </Link>

                <nav
                    style={{
                        display: "flex",
                        gap: "2rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    <a href="#catalogo" style={{ color: "var(--color-white)" }}>
                        Catálogo
                    </a>

                    <a href="#contacto" style={{ color: "var(--color-white)" }}>
                        Contacto
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;