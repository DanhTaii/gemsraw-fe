import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const items = [
        { title: 'Dictionary', path: '/dictionary' },
        { title: 'Flashcard', path: '/flashcard' },
        { title: 'Mindmap', path: '/mindmap' },
        { title: 'Exercise', path: '/exercise' },
    ];

    return (
        <div className="text-center mt-5">
            <h2 className="mb-4 text-primary fw-bold">Welcome!</h2>
            <div className="row justify-content-center">
                {items.map(({ title, path }) => (
                    <div className="col-6 col-md-3 mb-4" key={title}>
                        <Link to={path} className="text-decoration-none">
                            <div className="card shadow-sm p-4 text-dark">
                                <h5>{title}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Home;
