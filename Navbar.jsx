import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul className="flex justify-center gap-6 p-4 text-2xl bg-gray-200">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-bold underline"
                                : "text-gray-800"
                        }
                        end
                    >
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-bold underline"
                                : "text-gray-800"
                        }
                    >
                        ABOUT
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-600 font-bold underline"
                                : "text-gray-800"
                        }
                    >
                        CONTACT
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar