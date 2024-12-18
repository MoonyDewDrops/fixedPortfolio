"use client";

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeaderData {
    title: string;
    headerNames: {
        Home: string;
        Overmij: string;
        Mijnwerk: string;
        Contact: string;
    };
    headerStar: {
        url: string;
    };
}

export default function Header() {
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/headers?populate=headerNames&populate=headerStar');
                setHeaderData(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching header data:', error);
                setError('Error loading header data');
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!headerData || !headerData.headerNames) {
        return <div>Header data is missend of onkrijgbaar</div>;
    }

    const { title, headerNames, headerStar } = headerData;

    return (
        <header style={headerStyle}>
            <h1 style={{ color: "white" }}>
                <a href='/'>
                    <span style={squareSpanStyle}>
                        {title}
                    </span>
                </a>

            </h1>
            <div style={starContainerStyle}>
                {headerStar && (
                    <Image
                        src={`http://localhost:1337${headerStar.url}`} 
                        alt="Star"
                        width={50}
                        height={50}
                        style={starImageStyle}
                    />
                )}
            </div>
            <nav>
                <ul style={navListStyle}>
                    <li>
                        <Link href="/" style={linkStyle}>
                            <span style={squareSpanStyle}>{headerNames?.Home}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/aboutMe" style={linkStyle}>
                            <span style={squareSpanStyle}>{headerNames?.Overmij}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" style={linkStyle}>
                            <span style={squareSpanStyle}>{headerNames?.Mijnwerk}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" style={linkStyle}>
                            <span style={squareSpanStyle}>{headerNames?.Contact}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const headerStyle: React.CSSProperties = {
    padding: "1rem",
    backgroundColor: "#2B2D42",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
};

const starContainerStyle: React.CSSProperties = {
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
    flex: "1",
};

const starImageStyle: React.CSSProperties = {
    width: "50px",
    height: "50px",
};

const navListStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
};

const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
};

const squareSpanStyle: React.CSSProperties = {
    backgroundColor: "#8D99AE",
    padding: "0.7rem",
    borderRadius: "5px",
};
